/*jshint esversion: 6 */

module.exports = function(grunt) {
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach(task => {
        grunt.loadNpmTasks(task);
    });

    grunt.initConfig({
        cafemocha: {
            all: {src: 'qa/tests-crosspage.js', options: { ui: 'tdd', timeout: '5000', force: true }, }
        },
        jshint: {
            app: ['meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
            qa: ['gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
            options: { jshintrc: true, }, 
        },
        exec: {
            linkchecker: {
                cmd: '"C:\\Program Files (x86)\\LinkChecker\\linkchecker.exe" http://localhost:3000'
            }
        },
    });

    grunt.registerTask('default', [
        'jshint',
        'cafemocha',
        'exec',
    ]);
};

    