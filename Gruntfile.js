module.exports = function(grunt) {
    
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        mochaTest: {
            'bm-token': {
                options: {
                    reporter: 'spec',
                    clearRequireCache: true,
                    colors: true,
                    quite: true
                },
                src: ['tests/bm/*.specs.js']
            },
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
                src: ['tests/fvtfile/*.specs.js']
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    
    grunt.registerTask('dev-fvttest', ['mochaTest:bm-token','mochaTest:fvt-spec']);
    grunt.registerTask('dev-fvttestfile', ['mochaTest:fvt-spec-file']);

};
