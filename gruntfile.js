module.exports = function(grunt) {

    grunt.settings = {
        name: 'videKeyframe',
        distDir: 'dist/',
        devDir: 'dev/',
        fileExt: '.html'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
        },
        browserSync: {
            options: {
                watchTask: true,
                server: './' + grunt.settings.devDir
            },
            dev: {
                bsFiles: {
                    src : [
                        grunt.settings.devDir + 'css/{,**/}*.css',
                        grunt.settings.devDir + '*.html',
                    ]
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    grunt.settings.devDir + 'js/custom/main.js'
                ],
                dest: 'videoKeyframe.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                src: 'videoKeyframe.js',
                dest: 'videoKeyframe.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', [
        'browserSync:dev',
        'watch'
    ]);

    grunt.registerTask('build', [
        'concat:dist',
        'uglify:dist'
    ]);

};
