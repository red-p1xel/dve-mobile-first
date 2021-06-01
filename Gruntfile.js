module.exports = function(grunt) {
    grunt.initConfig({
        //    pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! Grunt Uglify <%= grunt.template.today("yyyy-mm-dd") %> */ '
            },
            build: {
                src: 'pub/js/bundle.js',
                dest: 'pub/js/bundle.min.js'
            }
        },
        browserify: {
            build: {
                src: 'pub/js/main.js',
                dest: 'pub/js/bundle.js'
            }
        },

        less: {
            dev: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2,
                    strictImports: true,
                    sourceMap: true,
                    sourceMapFilename: 'pub/css/responsive-styles.css.map', // where file is generated and located
                    sourceMapURL: 'responsive-styles.css.map', // the complete url and filename put in the compiled css file
                    sourceMapBasepath: 'pub', // Sets sourcemap base path, defaults to current working directory.
                    sourceMapRootpath: '/', // adds this path onto the sourcemap filename and less file paths
                },
                files: {
                    "pub/css/responsive-styles.css": "assets/dist/less/responsive-styles.less"
                }
            },
            prod: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2,
                    strictImports: true
                },
                files: {
                     "pub/css/responsive-styles.css": "assets/dist/less/responsive-styles.less"
                }
            }
        },

        postcss: {
            dev: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')({
                            overrideBrowserslist: ['last 2 versions',  'ie 11']
                        })
                    ]
                },
                src: 'pub/css/responsive-styles.css',
                dest: 'pub/css/responsive-styles.min.css'
            },

            prod: {
                options: {
                    map: false,
                    processors: [
                        require('autoprefixer')({
                            overrideBrowserslist: ['last 2 versions',  'ie 11']
                        }),
                        require('cssnano')()
                    ]
                },
                src: 'assets/dist/css/responsive-styles.css',
                dest: 'pub/css/responsive-styles.min.css'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/dist/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'pub/images/'
                }]
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'pub/js/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        watch: {
            jshint: {
                files: ['<%= jshint.files %>'],
            },
            less: {
                files: ['assets/dist/less/**/*.less'],
                tasks: ['less:dev', 'postcss:dev']
            },
            css: {
                files: ['pub/css/*.min.css'],
                options: {
                    livereload: true,
                }
            },
            imagemin: {
                files: 'assets/dist/images/**/*.{png,jpg,gif}',
                tasks: ['imagemin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('@lodder/grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['jshint', 'browserify', 'uglify', 'less:prod', 'postcss:prod', 'imagemin']);
    grunt.registerTask('dev', ['browserify', 'uglify', 'less:dev', 'postcss:dev', 'imagemin', 'watch']);
};
