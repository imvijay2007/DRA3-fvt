//BLUEMIX_CF_API = 'https://api.ng.bluemix.net';
(function() {

    'use strict';

    var requireHelper = require('./requireHelper');
    var criteria = requireHelper.require('tests/coverage/instrumented/routes/criteria.js');
    var bluemixfunctions = requireHelper.require('tests/coverage/instrumented/routes/tools/bluemixfunctions.js');
    var utils = requireHelper.require('tests/coverage/instrumented/routes/utils.js');
    var assert = require('chai').assert;

    var testutils = require('./testutils');
    var pipelineData = testutils.getTestFile("pipelineData.json");

    var build_id = 'oneibmcloud_DeployAnalytics_200';

    describe('Bluemix compareDeployments', function() {
        it('success scenario', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision', //advisory or decision
                rules: [{
                    name: 'rule1',
                    mode: 'decision',
                    conditions: [{
                        eval: '_compareDeployments(PROD, TEST)',
                        op: '=',
                        value: true
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, pipelineData, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('Incorrect number of args', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision', //advisory or decision
                rules: [{
                    name: 'rule1',
                    mode: 'decision',
                    conditions: [{
                        eval: '_compareDeployments(PROD)',
                        op: '=',
                        value: true
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, pipelineData, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('latest deployinfo not found', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision', //advisory or decision
                rules: [{
                    name: 'rule1',
                    mode: 'decision',
                    conditions: [{
                        eval: '_compareDeployments(ALPHA, TEST)',
                        op: '=',
                        value: true
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, pipelineData, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('previous deployinfo not found', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision', //advisory or decision
                rules: [{
                    name: 'rule1',
                    mode: 'decision',
                    conditions: [{
                        eval: '_compareDeployments(PROD, ALPHA)',
                        op: '=',
                        value: true
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, pipelineData, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('Compare with various failures', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision', //advisory or decision
                rules: [{
                    name: 'rule1',
                    mode: 'decision',
                    conditions: [{
                        eval: '_compareDeployments(PROD, TEST)',
                        op: '=',
                        value: true
                    }]
                }]
            };

            pipelineData[0].contents.applications[0].memory = "512m";
            pipelineData[0].contents.applications[0].instances = "3";
            pipelineData[0].contents.applications[0].disk_quota = "1024m";
            pipelineData[0].contents.applications[0].env.ANC = "ABC";
            pipelineData[0].contents.applications[0].env.ANC1 = "ABC1";

            criteria.applyRules('Bearer hex', testCriteria, build_id, pipelineData, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                assert(response.rules[0].failures[0].failed === 'Memory comparision failed', 'Incorrect failure message');
                assert(response.rules[0].failures[1].failed === 'Diskquota comparision failed', 'Incorrect failure message');
                assert(response.rules[0].failures[2].failed === 'Instances comparision failed', 'Incorrect failure message');
                assert(response.rules[0].failures[3].failed === 'Number of Environment variables comparision failed', 'Incorrect failure message');
                assert(response.rules[0].failures[4].failed === 'Environment comparision failed', 'Incorrect failure message');
                done();
            });
        });

        it('Compare with various failures -ignored', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision', //advisory or decision
                rules: [{
                    name: 'rule1',
                    mode: 'decision',
                    conditions: [{
                        eval: '_compareDeployments(PROD, TEST, memory, instances, diskquota, env, boundServices)',
                        op: '=',
                        value: true
                    }]
                }]
            };

            pipelineData[0].contents.applications[0].memory = "512m";
            pipelineData[0].contents.applications[0].instances = "3";
            pipelineData[0].contents.applications[0].disk_quota = "1024m";
            pipelineData[0].contents.applications[0].env.ANC = "ABC";
            pipelineData[0].contents.applications[0].env.ANC1 = "ABC1";

            criteria.applyRules('Bearer hex', testCriteria, build_id, pipelineData, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });
    });

    describe('Bluemix areApplicationBoundServicesAvailable', function() {
        it('success scenario', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision', //advisory or decision
                rules: [{
                    name: 'rule1',
                    mode: 'decision',
                    conditions: [{
                        eval: '_areApplicationBoundServicesAvailable',
                        op: '=',
                        value: true
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, pipelineData, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });
    });

    describe('Bluemix areCriticalServicesAvaliable', function() {
        this.timeout(2000);
        it('Service not available', function(done) {
            var testCriteria = {
                name: 'EnvListCheck',
                mode: 'decision',
                rules: [{
                    name: 'Check for list of services in region',
                    conditions: [{
                        eval: '_areCriticalServicesAvailable(activedeploy [free])',
                        op: '=',
                        value: true
                    }]
                }]
            };
            var tempbody1 = '{"activedeploy [free]": { "serviceName": "activedeploy [free]","available": false,"status": "Provision failed: S0-statusTest1446672726807<br>502 Bad Gateway<br>"}}';
            var tempbody2 = '{"Nodemock.JS runtime": { "serviceName": "Node.JS runtime","available": true,"status": "Provision failed: S0-statusTest1446672726807<br>502 Bad Gateway<br>"}}';
            var body = {};
            body.serviceStatus = JSON.parse(tempbody1);
            body.applicationStatus = JSON.parse(tempbody2);
            process.env.cloud_controller_url = "http://api.somecontroller";

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, body);
            };

            var r3 = utils.__set__("exports.makeRestCall", mockreq);
            var r2 = bluemixfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("bluemixfunctions", bluemixfunctions);


            criteria.applyRules('Bearer hex', testCriteria, build_id, [], function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                assert(response.rules[0].failures[0].failed === '_areCriticalServicesAvailable(activedeploy [free]) evaluated as: [false], expected: [true], operation: [=]', 'Incorrect failure message');
                done();
            });
            r1();
            r2();
            r3();
        });

        it('Service is available', function(done) {
            var testCriteria = {
                name: 'EnvListCheck',
                mode: 'decision',
                rules: [{
                    name: 'Check for list of services in region',
                    conditions: [{
                        eval: '_areCriticalServicesAvailable(Nodemock.JS runtime)',
                        op: '=',
                        value: true
                    }]
                }]
            };
            var tempbody1 = '{"activedeploy [free]": { "serviceName": "activedeploy [free]","available": false,"status": "Provision failed: S0-statusTest1446672726807<br>502 Bad Gateway<br>"}}';
            var tempbody2 = '{"Nodemock.JS runtime": { "serviceName": "Node.JS runtime","available": true,"status": "Provision failed: S0-statusTest1446672726807<br>502 Bad Gateway<br>"}}';
            var body = {};
            body.serviceStatus = JSON.parse(tempbody1);
            body.applicationStatus = JSON.parse(tempbody2);
            process.env.cloud_controller_url = "http://api.somecontroller";

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, body);
            };

            var r3 = utils.__set__("exports.makeRestCall", mockreq);
            var r2 = bluemixfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("bluemixfunctions", bluemixfunctions);


            criteria.applyRules('Bearer hex', testCriteria, build_id, [], function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
            r1();
            r2();
            r3();
        });

        it('Service is unavailable', function(done) {
            var testCriteria = {
                name: 'EnvListCheck',
                mode: 'decision',
                rules: [{
                    name: 'Check for list of services in region',
                    conditions: [{
                        eval: '_areCriticalServicesAvailable(Nodemock runtime)',
                        op: '=',
                        value: true
                    }]
                }]
            };
            var tempbody1 = '{"activedeploy [free]": { "serviceName": "activedeploy [free]","available": false,"status": "Provision failed: S0-statusTest1446672726807<br>502 Bad Gateway<br>"}}';
            var tempbody2 = '{"Nodemock.JS runtime": { "serviceName": "Node.JS runtime","available": true,"status": "Provision failed: S0-statusTest1446672726807<br>502 Bad Gateway<br>"}}';
            var body = {};
            body.serviceStatus = JSON.parse(tempbody1);
            body.applicationStatus = JSON.parse(tempbody2);
            process.env.cloud_controller_url = "http://api.somecontroller";

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, body);
            };

            var r3 = utils.__set__("exports.makeRestCall", mockreq);
            var r2 = bluemixfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("bluemixfunctions", bluemixfunctions);


            criteria.applyRules('Bearer hex', testCriteria, build_id, [], function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                assert(response.rules[0].functionResponse.list[0] === 'Unknown service nodemock runtime', 'Incorrect function response');
                done();
            });
            r1();
            r2();
            r3();
        });

        it('Estado not available', function(done) {
            var testCriteria = {
                name: 'EnvListCheck',
                mode: 'decision',
                rules: [{
                    name: 'Check for list of services in region',
                    conditions: [{
                        eval: '_areCriticalServicesAvailable(activedeploy [free])',
                        op: '=',
                        value: true
                    }]
                }]
            };
            var tempbody = '{"activedeploy [free]": { "serviceName": "activedeploy [free]","available": false,"status": "Provision failed: S0-statusTest1446672726807<br>502 Bad Gateway<br>"}}';
            process.env.cloud_controller_url = "http://api.somecontroller";

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback("err", {
                    statusCode: 200
                }, tempbody);
            };

            var r3 = utils.__set__("exports.makeRestCall", mockreq);
            var r2 = bluemixfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("bluemixfunctions", bluemixfunctions);


            criteria.applyRules('Bearer hex', testCriteria, build_id, [], function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                assert(response.rules[0].failures[0].failed === 'Failed to get details from Estado err', 'Incorrect failure message');

                done();
            });
            r1();
            r2();
            r3();
        });

        it('Estado returns 500', function(done) {
            var testCriteria = {
                name: 'EnvListCheck',
                mode: 'decision',
                rules: [{
                    name: 'Check for list of services in region',
                    conditions: [{
                        eval: '_areCriticalServicesAvailable(activedeploy [free])',
                        op: '=',
                        value: true
                    }]
                }]
            };
            var tempbody = '{"activedeploy [free]": { "serviceName": "activedeploy [free]","available": false,"status": "Provision failed: S0-statusTest1446672726807<br>502 Bad Gateway<br>"}}';
            process.env.cloud_controller_url = "http://api.somecontroller";

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 500
                }, tempbody);
            };

            var r3 = utils.__set__("exports.makeRestCall", mockreq);
            var r2 = bluemixfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("bluemixfunctions", bluemixfunctions);


            criteria.applyRules('Bearer hex', testCriteria, build_id, [], function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                assert(response.rules[0].failures[0].failed === 'Received error response from Estado: 500', 'Incorrect failure message');

                done();
            });
            r1();
            r2();
            r3();
        });
    });
}());
