//assert = require('assert');
var assert = require('chai').assert;
var grunt = require('grunt');
var fs = require('fs');
var path = require('path');
var REQUEST = require('request');

var dra_server = (process.env.DRA_SERVER || 'https://dra.stage1.ng.bluemix.net');
var dlms_server = (process.env.DLMS_SERVER || 'https://dlms.stage1.ng.bluemix.net');
var uaa_url = (process.env.UAA_URL || 'https://uaa.stage1.ng.bluemix.net/userinfo');
var auth_url = (process.env.AUTH_URL || 'https://login.stage1.ng.bluemix.net/UAALoginServerWAR/oauth/token');
var o_name = (process.env.CF_ORG || 'vjegase@us.ibm.com');
var uuid = require('node-uuid');

var assert_response;

var request = REQUEST.defaults({
    strictSSL: false
});

describe('TEST PREREQUISITES', function() {
    
    it("Get bluemix token", function(done) {
        this.timeout(20000);
        //checktoken(function(body) {
                var options = { method: 'POST',
                  url: auth_url,
                  headers: 
                   { 'content-type': 'application/x-www-form-urlencoded',
                     authorization: 'Basic Y2Y6' },
                  form: 
                   { username: process.env.CF_USER,
                     password: process.env.CF_PASS,
                     grant_type: 'password',
                     response_type: 'token' } 
                    };
                gettoken(options, function() {
                    assert.equal(assert_response, 200);
                    done();
                });
        //});
    }); 

});

function readfile(file) {
    var contents = fs.readFileSync(getFilename(file), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON;
}

function getFilename(filename) {
    var file = path.join(__dirname, filename);
    return file;
}

function gettoken(options, callback) {
    request(options, function (err, resp, body) {
      if (err) {
            console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } 
        else {
            var tok = JSON.parse(body);
            console.log("User: %s |Token type:%s | Expires in:%s",process.env.CF_USER,tok.token_type,tok.expires_in);
            bmtoken = tok.access_token;
            assert_response = resp.statusCode;
        }
    callback();
    });
}

/*
function checktoken(callback) {
    var options = {};
    options.url = uaa_url;
    options.headers =  {
        Authorization: ' bearer ' + bmtoken
    };
    request(options, function (err, resp, body) {
      if (err) {
            console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } 
        else {
            var tok = JSON.parse(body);
            console.log(body);
            token = tok.access_token;
            assert_response = resp.statusCode;
        }
    callback(body);
    });
}
*/
