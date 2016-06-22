//assert = require('assert');
var assert = require('chai').assert;
var grunt = require('grunt');

var accessToken;

function login(callback) {
    if (accessToken) {
        cb(accessToken);
    } else {
        require('child_process').exec("cf oauth-token", function(err, stdout, stderr) {
            var token = stdout.toString();
            var re = /.*bearer (.*)/i;
            var at = token.match(re);
            accessToken = at[1];
            callback(accessToken);
        });
    }
}

describe('TEST PREREQUISITES', function() {
    it("Get pipeline token", function(done) {
        this.timeout(20000);
        login(function(accessToken) {
            bmtoken = accessToken;
            done();
        });
    });
});
