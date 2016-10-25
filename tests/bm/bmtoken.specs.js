var assert = require('chai').assert;
var REQUEST = require('request');

var dlms_server = (process.env.DLMS_SERVER || 'https://dlms.stage1.ng.bluemix.net');
var auth_url = (process.env.AUTH_URL || 'https://login.stage1.ng.bluemix.net/UAALoginServerWAR/oauth/token');

var assert_response = 0;

var request = REQUEST.defaults({
    strictSSL: false
});

describe('TEST PREREQUISITES', function() {
    it("Get bluemix token", function(done) {
        this.timeout(20000);
        var options = {
            method: 'POST',
            url: auth_url,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                authorization: 'Basic Y2Y6'
            },
            form: {
                username: process.env.CF_USER,
                password: process.env.CF_PASS,
                grant_type: 'password',
                response_type: 'token'
            }
        };
        gettoken(options, function() {
            assert.equal(assert_response, 200);
            done();
        });
    });
});

function gettoken(options, callback) {
    request(options, function(err, resp, body) {
        if (err) {
            if ((typeof(process.env.FVT_DEBUG) !== 'undefined') && (process.env.FVT_DEBUG === "true"))
                console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } else {
            var tok = JSON.parse(body);
            if ((typeof(process.env.FVT_DEBUG) !== 'undefined') && (process.env.FVT_DEBUG === "true"))
                console.log("User: %s |Token type:%s | Expires in:%s", process.env.CF_USER, tok.token_type, tok.expires_in);
            bmtoken = tok.access_token;
            assert_response = resp.statusCode;
        }
        callback();
    });
}