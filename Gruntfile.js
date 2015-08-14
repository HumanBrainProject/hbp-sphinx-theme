'use strict';

module.exports = function (grunt) {
    var mainBowerFiles = require('main-bower-files');
    var _ = require('lodash');
    var path = require('canonical-path');

    var pathConfig = {
        htmlsrc: 'assets',
        dest: 'static'
    };

    var relativePath = function(p) {
        return path.relative(pathConfig.htmlsrc, p);
    };

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        config: pathConfig,
        pkg: grunt.file.readJSON('bower.json'),

        clean: [
            '<%= config.dest %>',
            'dist/'
        ],

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
                    archive: 'dist/collaboratory-sphinx-theme.zip',
                    mode: 'zip'
                },
                src: ['theme.conf', 'layout.html', 'static/**']
            }
        },

        release: {
            options: {
                additionalFiles: ['bower.json'],
                changelog: true,
                npm: false,
                beforeRelease: ['clean', 'default'],
            }
        }
    });

    grunt.registerTask('default', ['wiredep', 'sass', 'autoprefixer', 'concat', 'uglify', 'copy', 'compress']);
    grunt.registerTask('dist', ['clean', 'default']);
};
