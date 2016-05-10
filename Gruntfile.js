module.exports = function(grunt) {

    var allFilesForJsHint = [
        '*.js',
        '*/**/*.js',


        '!static/bower_components/**',
        '!static/js/date.js',
        '!tests/client/coverage/**/*.js',
        '!node_modules/**/*.js',
        '!bower_components/**/*.js',
        '!plugins/**/*.js',
        '!tests/coverage/**/*.js',
        '!apidoc/**/*.js'
    ];

    var allFilesForJsBeautifier = [
        '*.html',
        '*.json',
        '*/**/*.html',
        '*/**/*.json',


        '!node_modules/**/*.html',
        '!node_modules/**/*.json',
        '!bower_components/**/*.html',
        '!bower_components/**/*.json',
        '!plugins/**/*.html',
        '!plugins/**/*.json',
    ];

    allFilesForJsBeautifier = allFilesForJsHint.concat(allFilesForJsBeautifier);





    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mochaTest: {
            'fvt-spec': {
                options: {
                    reporter: 'spec',
                    clearRequireCache: true,
                    colors: true,
                    quite: true
                },
                src: ['tests/fvt/*.specs.js']
            },
            'fvt-spec-file': {
                options: {
                    reporter: 'json',
                    clearRequireCache: true,
                    colors: true,
                    quite: true,
                    captureFile: 'fvttest.json'
                },
                src: ['tests/fvt/*.specs.js']
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    
    grunt.registerTask('dev-fvttest', ['mochaTest:fvt-spec']);
    grunt.registerTask('dev-fvttestfile', ['mochaTest:fvt-spec-file']);

};
