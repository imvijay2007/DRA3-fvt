module.exports = function(grunt) {
    
    var now = new Date();
    var capture_file_name = 'DLMSFvt_' + 
        now.getMonth() + '_' + 
        now.getDate() + '_' + 
        now.getFullYear() + '_' + 
        now.getHours() + '_' + 
        now.getMinutes() + '_' + 
        now.getSeconds() + '_' +
        now.getMilliseconds() + '.json';
    
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
    
    grunt.registerTask('dev-fvttestfile', ['mochaTest:fvt-spec-file']);

};
