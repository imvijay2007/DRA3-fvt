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
//        it('RESULTS - post a build record', function(done) {
//            this.timeout(60000);
//            login(function(bmtoken) {
//                var build_data = {
//                    build_id: random_guid,
//                    repository: {
//                        repository_url: 'https://github.ibm.com/oneibmcloud/dlms.git',
//                        branch: 'dlmsfvt',
//                        commit_id: 'dff7884b9168168d91cb9e5aec78e93db0fa80d9'
//                    },
//                    status: 'pass'
//                };
//                var options = {
//                    method: 'POST',
//                    url: server + '/v1/organizations/' + org_name + '/environments/' + data.environment_name + '/runtimes/' + data.runtime_name + '/builds',
//                    headers: {
//                        Authorization: 'bearer ' + bmtoken
//                    },
//                    json: true,
//                    body: build_data
//                };
//                arestcall(options, function(err, resp, body) {
//                    if (process.env.FVT_DEBUG === 'true') {
//                        console.log("POST /builds response:", body);
//                    }
//                    assert.equal(resp.statusCode, 200);
//                    assert.equal(JSON.stringify(body), '{"status":"Accepted"}');
//                    done();
//                });
//            });
//        });
        it('RESULTS - post a message', function(done) {
            this.timeout(60000);
            login(function(bmtoken) {
                data.org_name = org_name;
                var options = {
                    method: 'POST',
                    url: server + '/v1/results',
                    headers: {
                        Authorization: 'bearer ' + bmtoken
                    },
                    json: true,
                    body: data
                };
                arestcall(options, function(err, resp, body) {
                    if (process.env.FVT_DEBUG === 'true') {
                        console.log("POST /results response:", body);
                    }
                    assert.equal(resp.statusCode, 200);
                    assert.equal(JSON.stringify(body), '{"status":"Accepted"}');
                    done();
                });
            });
        });
//        it('RESULTS - post a message with basicauth token', function(done) {
//            this.timeout(60000);
//            login(function(bmtoken) {
//                data.org_name = org_name;
//                var options = {
//                    method: 'POST',
//                    url: server + '/v1/results',
//                    headers: {
//                        Authorization: 'Basic abcd'
//                    },
//                    json: true,
//                    body: data
//                };
//                arestcall(options, function(err, resp, body) {
//                    if (process.env.FVT_DEBUG === 'true') {
//                        console.log("POST /results response:", body);
//                    }
//                    assert.equal(resp.statusCode, 403);
//                    done();
//                });
//            });
//        });
//        it('RESULTS - post a deployment record', function(done) {
//            this.timeout(60000);
//            login(function(bmtoken) {
//                var deploy_data = {
//                    app_url: 'https://catalog-api.stage1.ng.bluemix.net',
//                    job_url: 'http://www.defined.com/3234234',
//                    status: 'pass'
//                };
//                var options = {
//                    method: 'POST',
//                    url: server + '/v1/orgs/' + org_name + '/envs/' + data.environment_name + '/runtimes/' + data.runtime_name + '/builds/' + random_guid + '/deployments',
//                    headers: {
//                        Authorization: 'bearer ' + bmtoken
//                    },
//                    json: true,
//                    body: deploy_data
//                };
//                arestcall(options, function(err, resp, body) {
//                    if (process.env.FVT_DEBUG === 'true') {
//                        console.log("POST /deployments response:", body);
//                    }
//                    assert.equal(resp.statusCode, 200);
//                    assert.equal(JSON.stringify(body), '{"status":"Accepted"}');
//                    done();
//                });
//            });
//        });
        it('RESULTS - get posted message', function(done) {
            this.timeout(60000);
            login(function(bmtoken) {
                var options = {
                    method: 'GET',
                    url: server + '/v1/results?org_name=' + org_name + '&project_name=' + data.project_name,
                    headers: {
                        Authorization: 'bearer ' + bmtoken
                    },
                    json: true
                };
                arestcall(options, function(err, resp, body) {
                    if (process.env.FVT_DEBUG === 'true') {
                        console.log("Retrieved org:", body[0].org_name);
                        console.log("Retrieved project:", body[0].project_name);
                        console.log("Retrieved ID:", body[0]._id);
                    }
                    assert.equal(resp.statusCode, 200);
                    assert.equal(body[0].project_name, data.project_name);
                    done();
                });
            });
        });
//        it('RESULTS - update userinfo of retrieved message', function(done) {
//            this.timeout(60000);
//            login(function(bmtoken) {
//                var updatedata = {
//                    org_name: org_name,
//                    runtime_name: data.runtime_name,
//                    user_name: u_name
//                };
//                var option1 = {
//                    method: 'PUT',
//                    url: server + '/v1/updateUserInfo',
//                    headers: {
//                        Authorization: 'bearer ' + bmtoken
//                    },
//                    json: true,
//                    body: updatedata
//                };
//                arestcall(option1, function(err, resp, body) {
//                    if (process.env.FVT_DEBUG === 'true') {
//                        console.log("PUT /updateUserInfo response:", body);
//                    }
//                    assert.equal(resp.statusCode, 200);
//                    assert.equal(JSON.stringify(body), '{"status":"User information updated successfully."}');
//                    done();
//                });
//            });
//        });
//        it('RESULTS - get latestBuildResults of posted message', function(done) {
//            this.timeout(60000);
//            login(function(bmtoken) {
//                var option2 = {
//                    method: 'GET',
//                    url: server + '/v1/getLatestBuildResults?org_name=' + org_name,
//                    headers: {
//                        Authorization: 'bearer ' + bmtoken
//                    },
//                    json: true
//                };
//                arestcall(option2, function(err, resp, body) {
//                    for (var i = 0; i < body.results.length; i++) {
//                        if (body.results[i].runtime_name === data.runtime_name) {
//                            if (process.env.FVT_DEBUG === 'true') {
//                                console.log("GET /getLatestBuildResults response:", body.results[i]);
//                            }
//                            assert.equal(body.results[i].build_id, data.build_id);
//                            assert.equal(body.results[i].user_name, u_name);
//                            assert.equal(body.results[i].environments.length, 1);
//                            assert.equal(body.results[i].environments[0].environment_name, data.environment_name);
//                            assert.equal(body.results[i].environments[0].environment_results.length, 1);
//                            assert.equal(body.results[i].environments[0].environment_results[0].lifecycle_stage, 'unittest');
//                            assert.equal(body.results[i].environments[0].environment_results[0].tool, 'mocha');
//                            assert.equal(body.results[i].environments[0].environment_results[0].artifact_name, 'FVTArtifact');
//                            assert.equal(body.results[i].environments[0].environment_results[0].summaryResults.passed, 56);
//                            done();
//                        }
//                    }
//                });
//            });
//        });
//        it('RESULTS - get latestTestResults of posted message', function(done) {
//            this.timeout(60000);
//            login(function(bmtoken) {
//                var option2 = {
//                    method: 'GET',
//                    url: server + '/v1/getLatestTestResults?org_name=' + org_name,
//                    headers: {
//                        Authorization: 'bearer ' + bmtoken
//                    },
//                    json: true
//                };
//                arestcall(option2, function(err, resp, body) {
//                    assert.isAbove(body.branches.length, 0);
//                    var branch_and_environment_exist = false;
//                    for (var i = 0; i < body.branches.length; i++) {
//                        if (body.branches[i].branch === 'dlmsfvt' && body.branches[i].build_environment_name === data.environment_name) {
//                            branch_and_environment_exist = true;
//                        }
//                    }
//                    assert.equal(branch_and_environment_exist, true);
//                    assert.isAbove(body.test_results.length, 0);
//                    for (var i = 0; i < body.test_results.length; i++) {
//                        if (body.test_results[i].runtime_name === data.runtime_name) {
//                            assert.equal(body.test_results[i].environments.length, 1);
//                            assert.equal(body.test_results[i].environments[0].environment_name, data.environment_name);
//                            assert.equal(body.test_results[i].environments[0].environment_results[0].lifecycle_stage, 'unittest');
//                            assert.equal(body.test_results[i].environments[0].environment_results[0].tool, 'mocha');
//                            assert.equal(body.test_results[i].environments[0].environment_results[0].artifact_name, 'FVTArtifact');
//                            assert.equal(body.test_results[i].environments[0].environment_results[0].summaryResults.passed, 56);
//                        }
//                    }
//                    assert.isAbove(body.latest_builds.length, 0);
//                    var latest_build_exist = false;
//                    for (var i = 0; i < body.latest_builds.length; i++) {
//                        if (body.latest_builds[i].branch === 'dlmsfvt' && body.latest_builds[i].environment_name === data.environment_name) {
//                            latest_build_exist = true;
//                        }
//                    }
//                    assert.equal(latest_build_exist, true);
//                    var latest_deploy_exist = false;
//                    for (var i = 0; i < body.latest_deployments.length; i++) {
//                        if (body.latest_deployments[i].app_url === 'https://catalog-api.stage1.ng.bluemix.net' && body.latest_deployments[i].environment_name === data.environment_name) {
//                            latest_deploy_exist = true;
//                        }
//                    }
//                    assert.equal(latest_deploy_exist, true);
//                    done();
//                });
//            });
//        });
//        it('CONTROL CENTER - get projects', function(done) {
//            this.timeout(60000);
//            login(function(bmtoken) {
//                var options = {
//                    method: 'GET',
//                    url: server + '/v1/projects?org_name=' + org_name,
//                    headers: {
//                        Authorization: 'bearer ' + bmtoken
//                    },
//                    json: true
//                };
//                arestcall(options, function(err, resp, body) {
//                    if (process.env.FVT_DEBUG === 'true') {
//                        console.log("GET /projects response:", body);
//                    }
//                    assert.equal(resp.statusCode, 200);
//                    assert.notEqual(body.indexOf(data.project_name), -1);
//                    done();
//                });
//            });
//        });
//        it('CONTROL CENTER - get modules', function(done) {
//            this.timeout(60000);
//            login(function(bmtoken) {
//                var options = {
//                    method: 'GET',
//                    url: server + '/v1/modules?org_name=' + org_name,
//                    headers: {
//                        Authorization: 'bearer ' + bmtoken
//                    },
//                    json: true
//                };
//                arestcall(options, function(err, resp, body) {
//                    if (process.env.FVT_DEBUG === 'true') {
//                        console.log("GET /modules response:", body);
//                    }
//                    assert.equal(resp.statusCode, 200);
//                    assert.notEqual(body.indexOf(data.module_name), -1);
//                    done();
//                });
//            });
//        });
//        it('CONTROL CENTER - get environments', function(done) {
//            this.timeout(60000);
//            login(function(bmtoken) {
//                var options = {
//                    method: 'GET',
//                    url: server + '/v1/environments?org_name=' + org_name,
//                    headers: {
//                        Authorization: 'bearer ' + bmtoken
//                    },
//                    json: true
//                };
//                arestcall(options, function(err, resp, body) {
//                    if (process.env.FVT_DEBUG === 'true') {
//                        console.log("GET /environments response:", body);
//                    }
//                    assert.equal(resp.statusCode, 200);
//                    assert.notEqual(body.indexOf(data.environment_name), -1);
//                    done();
//                });
//            });
//        });
//        it('CONTROL CENTER - get runtimes', function(done) {
//            this.timeout(60000);
//            login(function(bmtoken) {
//                var options = {
//                    method: 'GET',
//                    url: server + '/v1/runtimes?org_name=' + org_name + '&environmennt_name=' + data.environment_name,
//                    headers: {
//                        Authorization: 'bearer ' + bmtoken
//                    },
//                    json: true
//                };
//                arestcall(options, function(err, resp, body) {
//                    if (process.env.FVT_DEBUG === 'true') {
//                        console.log("GET /runtimes response:", body);
//                    }
//                    assert.equal(resp.statusCode, 200);
//                    assert.notEqual(body.indexOf(data.runtime_name), -1);
//                    done();
//                });
//            });
//        });
    });
}());