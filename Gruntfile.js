/*global module*/
module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        libraryFormat: {
            js_lib_path: 'public/assets/js/',
            css_lib_path: 'public/assets/css/',
            js_libs: [
                '<%= libraryFormat.js_lib_path %>angular.1.5.5.min.js',
                '<%= libraryFormat.js_lib_path %>angular-animate.min.js',
                '<%= libraryFormat.js_lib_path %>angular-aria.1.5.5.min.js',
                '<%= libraryFormat.js_lib_path %>angular-material.1.1.4.min.js'
            ],
            css_libs: [
                '<%= libraryFormat.css_lib_path %>angular-material.1.1.4.css',
                '<%= libraryFormat.css_lib_path %>nv.d3.1.8.1.min.css',
            ]
        },
        concat: {
            options: {
                separator: ';\n',
            },
            js: {
                src: ['public/app/**/*.js'],
                dest: 'public/dist/js/<%= pkg.name %>.js',
            },
            library: {
                src: ['<%= libraryFormat.js_libs %>'],
                dest: 'public/dist/js/library.js',
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            app: {
                src: 'public/dist/js/<%= pkg.name %>.js',
                dest: 'public/dist/js/<%= pkg.name %>.min.js',
            },
            library: {
                src: 'public/dist/js/library.js',
                dest: 'public/dist/js/library.min.js',
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/dist/css/<%= pkg.name %>.css': 'public/assets/sass/**/<%= pkg.name %>.scss'
                }
            }
        },
        cssmin: {
            options: {
                sourcemap: 'none'
            },
            dist: {
                files: {
                    'public/dist/css/<%= pkg.name %>.min.css': 'public/dist/css/<%= pkg.name %>.css'
                }
            },
            lib: {
                src: ['<%= libraryFormat.css_libs %>'],
                dest: 'public/dist/css/csslib.min.css'
            }
        },
        watch: {
            concat: {
                expand: true,
                files: ['public/app/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    event: ['all'],
                }
            },
            sass: {
                expand: true,
                files: ['public/assets/sass/**/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {
                    event: ['all'],
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['comp', 'watch']);
    grunt.registerTask('comp', ['sass', 'cssmin', 'concat', 'uglify']);
};
