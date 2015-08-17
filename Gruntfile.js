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
        ghApi: 'https://api.github.com/repos/HumanBrainProject/hbp-collaboratory-sphinx-theme/',
        assetName: 'hbp-collaboratory-sphinx-theme',
        asset: '<%= assetName %>.zip',
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
                afterRelease: ['dist', 'publishAsset'],
            }
        },

        publishAsset: {
            options: {
                token: grunt.file.readJSON('credentials.json').token,
            }
        }
    });

    grunt.task.registerTask('publishAsset', 'Publish asset to the latest release', function() {
        var fs = require('fs');
        var request = require('request');
        var options = this.options({});
        var done = this.async();
        request({ url: grunt.config('ghApi') + 'releases/latest',
                  headers: {'User-Agent': 'request'}},
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var upload_url = JSON.parse(body).upload_url;
                        var assetPath = grunt.config('assetLocation') + grunt.config('asset');
                        var stats = fs.statSync(assetPath);

                        var requestOptions = {
                            method:  'POST',
                            headers: { 'User-Agent': 'request',
                                       'Authorization': 'token ' + options.token,
                                       'Content-Length': stats.size,
                                       'Content-Type': 'application/zip' },
                            url: upload_url.replace('{?name}', ''),
                            qs: {
                                name: grunt.config('asset')
                            }
                        };

                        fs.createReadStream(assetPath).pipe(request(requestOptions, function (error, response, body) {
                            if (!error && response.statusCode == 201) {
                                grunt.log.ok('Release asset uploaded');
                                done();
                            } else {
                                grunt.log.error('HTTP_CODE=' + response.statusCode + ' GITHUB_RESPONSE:' + body);
                                grunt.fail.warn('Unable to upload release asset!');
                                done();
                            }
                        }));
                    } else {
                        grunt.log.error('HTTP_CODE=' + response.statusCode + ' GITHUB_RESPONSE:' + body);
                        grunt.fail.warn('Unable to get the latest release!');
                        done();
                    }
                });
    });

    grunt.registerTask('default', ['wiredep', 'sass', 'autoprefixer', 'concat', 'uglify', 'copy', 'compress']);
    grunt.registerTask('dist', ['clean', 'default']);
};
