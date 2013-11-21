/*! Gruntfile.js: grunt config file
 */
'use strict';
module.exports = function (grunt) {

    // site will be called to push a complete distribution to the
    // specified site
    function site(fqdn) {
        return {
            options: {
                bucket: fqdn,
                access: 'public-read'
            },
            upload: [{
                src: 'dist/*',
                dest: '/'
            }, {
                src: 'dist/data/*',
                dest: '/data/'
            }, {
                src: 'dist/images/*',
                dest: '/images/'
            }, {
                src: 'dist/js/*',
                dest: '/js/'
            }, {
                src: 'dist/pages/*',
                dest: '/pages/'
            }]
        };
    }

    grunt.initConfig({
        // metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! google search api demo - v1.0 - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* copyright (c) <%= grunt.template.today("yyyy") %> Veronique Pelletier;' +
        ' all rights reserved */\n',
        // task configuration; order is not important here
        notify: {
            build: {
                options: {
                    message: 'Build successful.'
                }
            }
        },
        // clean up build files
        clean: {
            all: [
                'dist/**/*',
                'build/releases/win/**/*'
            ]
        },

        // copy tasks; all assets need to be copied to dist, as well as the
        // concat file in dev mode
        copy: {
            all: {
                expand: true,
                cwd: 'src/',
                src: [
                    '**'
                ],
                dest: 'dist/'
            }
        },
        less: {
        // Compile all targeted LESS files individually
            development: {
                options: {
                    concat: true,
                    require: ["less/common.less", "less/spriteSheet.less"]
                },
                src:  'src/**/*.less',
                dest: 'dist/css/styles.css'
            }
        },

        // uglify will minify the scripts, both those in src and lib

        uglify: {
            options: {
                compress: {
                    sequences: false
                }
            },
            prd: {
                files: [{
                    src: 'dist/**/*.js',
                    expand: true
                }]
            }
        },

        xmlmin: {
            prd: {
                files: [{
                    src: 'dist/**/*.xml',
                    expand: true
                }]
            }
        },

        // watch will auto-grunt anything that has a rule set up here
        watch: {
            files: ['Gruntfile.js', 'src/**'],
            tasks: ['clean:all', 'copy:all', 'src', 'less', 'ngtemplates', 'concat', 'nodewebkit'] 
        },
        ngtemplates:  {
            app: {
                options: {
                    base: 'dist/**/*',
                    encoding: 'utf-8'
                },
                src: [
                    'dist/**/*.html',
                    '!dist/index.html'
                ],
                dest: 'dist/templates.js'
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            lib: {
                src: [
                    'src/lib/jquery.js', 'src/bootstrap/**/*.js', 'src/lib/angular.min.js'
                ],
                dest: 'dist/app-lib.js'
            },
            src: {
                src: [
                    'dist/templates.js',
                    'src/directives/**/*.js',
                    'src/panes/**/*.js',
                    'src/services/**/*.js',
                    'src/widgets/**/*.js',
                    'src/assets/localization/**/*.js',
                    'src/app/**/*.js'
                ],
                dest: 'dist/app.js'
            },
            css: {
                src: [
                    'dist/css/**/*.css', 'src/bootstrap/**/*.css'
                ],
                dest: 'dist/styles.css'
            }
        },

        nodewebkit: {
            options: {
                build_dir: './build', // Where the build version of my node-webkit app is saved
                mac: false, // We want to build it for mac
                win: true, // We want to build it for win
                linux32: false, // We don't need linux32
                linux64: false // We don't need linux64
            },
            src: ['dist/index.html',
                  'dist/app-lib.js',
                  'dist/templates.js',
                  'dist/app.js',
                  'dist/styles.css',
                  'dist/package.json',
                  'dist/templates.js',
                  'dist/**/*.html'
                  ]
          }

    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('assemble-less');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-notify');


    //
    // Tasks we should not execute directly. They are bundled into other tasks.
    // @private
    //
    grunt.registerTask('src', ['copy:all', 'uglify:prd', 'xmlmin:prd', 'notify:build']);
    grunt.registerTask('src', ['copy:all', 'less']);

    //
    // Tasks
    // @public
    //
    gunt.registerTask('prd', ['clean:dev', 'src']);



};
