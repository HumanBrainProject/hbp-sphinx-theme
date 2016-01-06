'use strict';

module.exports = function (grunt) {
    var mainBowerFiles = require('main-bower-files');
    var _ = require('lodash');
    var path = require('canonical-path');

    var pathConfig = {
        htmlsrc: 'assets',
        dest: 'hbp_sphinx_theme/static'
    };

    var relativePath = function(p) {
        return path.relative(pathConfig.htmlsrc, p);
    };

    console.log('main files', _.map(mainBowerFiles({filter: /.*\.(eot|woff|svg|ttf|otf|png)/}), relativePath));

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        asset: 'hbp_sphinx_theme.zip',
        assetLocation: 'dist/',
        config: pathConfig,
        pkg: grunt.file.readJSON('bower.json'),

        clean: [ '<%= config.dest %>', '<%= assetLocation %>' ],

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

        cssmin: {
            dist: {
                files: {
                  '<%= config.dest %>/hbpdoc.min.css': ['<%= config.dest %>/hbpdoc.css']
                }
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
            script: {
                src: '<%= config.htmlsrc %>/*.js',
                dest: '<%= config.dest %>/hbpdoc.js'
            }
        },

        uglify: {
            script: {
                src: '<%= config.dest %>/hbpdoc.js',
                dest: '<%= config.dest %>/hbpdoc.min.js'
            }
        },

        compress: {
            main: {
                options: {
                    archive: 'dist/<%= asset %>',
                    mode: 'zip',
                },
                expand: true,
                cwd: 'hbp_sphinx_theme/',
                src: ['theme.conf', 'layout.html', 'static/**'],
            }
        },

        release: {
            options: {
                additionalFiles: ['bower.json'],
                changelog: true,
                npm: false,
                updateVars: ['pkg'],
                beforeRelease: ['updateThemeConfVersion'],
            }
        }
    });

    grunt.task.registerTask('updateThemeConfVersion', 'Update the release version in the theme.conf file', function() {
        var replace = require('replace');
        var shell = require('shelljs');
        replace({
            regex: /\d+\.\d+\.\d+/,
            replacement: grunt.config('pkg.version'),
            paths: ['hbp_sphinx_theme/theme.conf', 'hbp_sphinx_theme/__init__.py'],
            recursive: false,
            silent: false
        });
        if (shell.exec('git add hbp_sphinx_theme/theme.conf').code !== 0) {
            grunt.fail.warn('Failed to add "theme.conf" to commit!');
        }
        if (shell.exec('git add hbp_sphinx_theme/__init__.py').code !== 0) {
            grunt.fail.warn('Failed to add "theme.conf" to commit!');
        }
    });

    grunt.registerTask('default', ['wiredep', 'sass', 'autoprefixer', 'cssmin', 'concat', 'uglify', 'copy', 'compress']);
};
