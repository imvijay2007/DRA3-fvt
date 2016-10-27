/***********************************************
 Licensed Materials - Property of IBM
Restricted Materials of IBM.  Reproduction, modification and redistribution are prohibited.

DevOps Lifecycle Message Store - Results Service

© Copyright IBM Corporation 2016.
U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
************************************************/
(function() {
    'use strict';
    var fs = require('fs');
    var path = require('path');
    var REQUEST = require('request');
    var assert = require('chai').assert;
    var uuid = require('node-uuid');

    var post_results_fvt = fs.readFileSync(getFilename('post_results_fvt.json'), 'utf8');
    var data = JSON.parse(post_results_fvt);
    var server = (process.env.DLMS_SERVER || 'https://dlms-test.stage1.ng.bluemix.net');
    var auth_url = (process.env.AUTH_URL || 'https://login.stage1.ng.bluemix.net/UAALoginServerWAR/oauth/token');
    var org_name = (process.env.CF_ORG || 'vjegase@us.ibm.com');

    var draBasicAuth = 'Basic ' + new Buffer("draservicebroker:MjY5...").toString('base64');

    var random_guid = uuid.v4();
    data.project_name = 'DLMSFvtProject_' + random_guid;
    data.runtime_name = 'DLMSFvtRuntime_' + random_guid;
    data.build_id = random_guid;
    data.environment_name = 'DLMSFvtEnvironment_' + random_guid;
    var u_name = random_guid + '@us.ibm.com';
    var bmtoken;

    var request = REQUEST.defaults({
        strictSSL: false
    });

    function getFilename(filename) {
        var file = path.join(__dirname, "data", filename);
        return file;
    }

    function login(cb) {
        if (bmtoken) {
            cb(bmtoken);
        } else {
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
            request(options, function(err, resp, body) {
                if (err) {
                    cb(null);
                } else {
                    var tok = JSON.parse(body);
                    bmtoken = tok.access_token;
                    cb(bmtoken);
                }
            });

        }
    }

    function arestcall(options, callback) {
        request(options, function(err, resp, body) {
            if (err) {
                callback(err, resp, null);
            } else {
                callback(null, resp, body);
            }
        });
    }

    describe('Test DLMS APIs', function() {
        it('RESULTS - get latestTestResults of posted message', function(done) {
            this.timeout(60000);
            login(function(bmtoken) {
                var option2 = {
                    method: 'GET',
                    url: server + '/v1/getLatestTestResults?org_name=' + org_name,
                    headers: {
                        Authorization: 'bearer ' + bmtoken
                    },
                    json: true
                };
                arestcall(option2, function(err, resp, body) {
                    assert.isAbove(body.branches.length, 0);
                    var branches_count = 0;
                    for (var i = 0; i < body.branches.length; i++) {
                        if (body.branches[i].branch === 'master' || body.branches[i].branch === 'release') {
                            branches_count += 1;
                        }
                    }
                    assert.equal(branches_count,2);
                    assert.isAbove(body.test_results.length,0);
                    assert.isAbove(body.latest_builds.length,0);
                    assert.isAbove(body.latest_deployments.length,0);
                    done();
                });
            });
        });
    });
    
}());