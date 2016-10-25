module.exports = function(grunt) {
    
    var now = new Date();
    capture_file_name = 'fvttest_' + 
        now.getMonth() + '_' + 
        now.getDate() + '_' + 
        now.getFullYear() + '_' + 
        now.getHours() + '_' + 
        now.getMinutes() + '_' + 
        now.getSeconds() + '.json';
    
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
                src: ['tests/bm/bmtoken.specs.js']
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
                    captureFile: capture_file_name
                },
                src: ['tests/fvt/*.specs.js']
            },
            'post-result': {
                src: ['tests/postscript/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    
    grunt.registerTask('dev-fvttest', ['mochaTest:bm-token','mochaTest:fvt-spec']);
    grunt.registerTask('dev-fvttestfile', ['mochaTest:bm-token','mochaTest:fvt-spec-file']);

};
