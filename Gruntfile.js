// Build hbpdoc client templates

'use strict';

module.exports = function (grunt) {
    var mainBowerFiles = require('main-bower-files');
    var _ = require('lodash');
    var path = require('canonical-path');

    var pathConfig = {
        htmlsrc: 'assets',
        dest: 'collaboratory_sphinx_theme/static'
    };

    var relativePath = function(p) {
        return path.relative(pathConfig.htmlsrc, p);
    };

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        config: pathConfig,

        bump: {
          options: {
            files: ['bower.json'],
            commitFiles: ['bower.json', 'collaboratory_sphinx_theme/version.py'],
            pushTo: 'origin HEAD:master'
          }
        },

        version: {
            options: {
                pkg: 'bower.json',
                prefix: '__version__ = \''
            },
            versionPy: {
              src: ['collaboratory_sphinx_theme/version.py']
            }
        },

        // Clean generated files
        clean: {
            python: [
                '<%= config.dest %>'
            ],
            doc: [
                'generated'
            ]
        },

        // automatically inject scripts and stylesheets dependencies into this
        // project source file.
        wiredep: {
            layout: {
                src: ['<%= config.htmlsrc %>/hbpdoc.scss']
            },
            options: {
                overrides: {
                    'material-design-iconic-font': {
                        main: ['scss/material-design-iconic-font.scss']
                    }
                }
            }
        },

        // compile scss to hbpdoc.css
        sass: {
            hbpdoc: {
                options: {
                    includePaths: ['<%= config.htmlsrc %>/bower_components']
                },
                files: {
                    '<%= config.dest %>/hbpdoc.css': ['<%= config.htmlsrc %>/hbpdoc.scss']
                }
            }
        },

        autoprefixer: {
            options: ['last 1 version'],
            dist: {
                files: [{
                    src: '<%= config.dest %>/hbpdoc.css',
                    dest: '<%= config.dest %>/hbpdoc.css'
                }]
            }
        },

        // copy assets to hbpdoc module
        copy: {
            deps: {
                files: [{
                    expand: true,
                    cwd: '<%= config.htmlsrc %>',
                    src: _.map(mainBowerFiles({filter: /.*\.(eot|woff|svg|ttf|otf|png)/}), relativePath),
                    dest: '<%= config.dest %>'
                }]
            }
        },

        concat: {
            // vendor: {
            //     src: _.map(mainBowerFiles({filter: '**/*.js'}), relativePath),
            //     dest: '<%= config.dest %>/vendor.js'
            // },
            script: {
                src: '<%= config.htmlsrc %>/*.js',
                dest: '<%= config.dest %>/hbpdoc.js'
            }
        },

        // bundle all script dependencies to a big minimified vendor.min.js file.
        uglify: {
            vendor: {
                src: '<%= config.dest %>/vendor.js',
                dest: '<%= config.dest %>/vendor.min.js'
            },
            script: {
                src: '<%= config.dest %>/hbpdoc.js',
                dest: '<%= config.dest %>/hbpdoc.min.js'
            }
        },

        // watch changes and rebuild what's needed
        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            js: {
                files: ['<%= config.htmlsrc %>/*.js'],
                tasks: ['concat:script', 'uglify:script']
            },
            scss: {
                files: ['<%= config.htmlsrc %>/*.scss'],
                tasks: ['sass', 'autoprefixer']
            }
        },

        connect: {
            options: {
                port: 8480,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 34480
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        'generated/html'
                    ]
                }
            }
        },

        exec: {
        }
    });

    grunt.registerTask('ci', 'Run all the build steps on the CI server', function (target) {
        var tasks = ['clean', 'buildModule'];
        var isRelease = target === 'patch' || target === 'minor' || target === 'major';

        if (isRelease) {
            grunt.log.writeln('This build will be released');
            tasks.unshift('version', 'bump-only:' + target);
            tasks.push('bump-commit', 'compress', 'uploadDoc');
        }
        grunt.task.run(tasks);
    });

    grunt.registerTask('buildModule', ['clean:python', 'wiredep', 'sass', 'autoprefixer', 'concat', 'uglify', 'copy']);
    grunt.registerTask('serve', ['buildModule', 'clean:doc', 'connect:livereload', 'watch']);
    grunt.registerTask('default', ['ci']);
};
