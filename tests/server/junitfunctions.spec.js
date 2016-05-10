(function() {

    'use strict';

    var requireHelper = require('./requireHelper');
    var criteria = requireHelper.require('tests/coverage/instrumented/routes/criteria.js');
    var utils = requireHelper.require('tests/coverage/instrumented/routes/utils.js');
    var junitfunctions = requireHelper.require('tests/coverage/instrumented/routes/tools/junitfunctions.js');
    var assert = require('chai').assert;

    var testutils = require('./testutils');
    var mochadocs = testutils.getTestFile("mochaResult.json");
    var dradecisionproceeddocs = testutils.getTestFile("draDecisionProceed.json");
    var currentEventsForJUnit_MultipleVersions = testutils.getTestFileDecoded("currentJunitResults.json");
    var pastEventsForJUnit_MultipleVersions = testutils.getTestFile("pastJunitResults.json");

    var build_id = 'oneibmcloud_DeployAnalytics_200';

    describe('JUnit Predefined Functions', function() {

        it('JUnit Test Regression - regression has occurred', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasJUnitTestRegressed',
                        op: '=',
                        value: false,
                        forArtifact: "jUnitZeroFails225Tests-RegressionHasOccurred"
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, pastEventsForJUnit_MultipleVersions);
            };
            global.draConfig.dlms_server = "http://dradummy.com";

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback(null, dradecisionproceeddocs);
                    }
                }
            };

            var r4 = utils.__set__("exports.makeRestCall", mockreq);
            var r3 = utils.__set__("db", mockdb);
            var r2 = junitfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("junitfunctions", junitfunctions);

            criteria.applyRules('Bearer hex', testCriteria, build_id, currentEventsForJUnit_MultipleVersions, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.rules[0].functionResponse.regressionOccured === true, 'Unexpected regressionOccured value:' + response.rules[0].functionResponse.regressionOccured);
                assert(response.rules[0].functionResponse.list[0] === "otc-github-broker GitHub Broker - Test POST /github/validate for update with a repo_url that does not exists or is invalid #212 did the validate call pass with a repo_url hosted on github.com? ", 'Unexpected test case:' + response.rules[0].functionResponse.list[0]);
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                done();
            });

            r1();
            r2();
            r3();
            r4();
        });

        it('JUnit Test Regression - no regression no test failures', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasJUnitTestRegressed',
                        op: '=',
                        value: false,
                        forArtifact: "jUnitZeroFails225Tests"
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, currentEventsForJUnit_MultipleVersions, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.rules[0].functionResponse.returnValue === false, 'Unexpected returnValue:' + response.rules[0].functionResponse.returnValue);
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                done();
            });
        });

        it('JUnit Test Success Failure - expected: 90 actual: 83', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        "eval": "_jUnitTestSuccessPercentage",
                        "op": ">=",
                        "value": 90,
                        "forArtifact": "jUnitWithFailures"
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, currentEventsForJUnit_MultipleVersions, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('JUnit Test Success Pass - expected: 90 actual: 100', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        "eval": "_jUnitTestSuccessPercentage",
                        "op": ">=",
                        "value": 90,
                        "forArtifact": "jUnitZeroFails225Tests"
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, currentEventsForJUnit_MultipleVersions, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('JUnit Test Success - Verify parser reads xml file that does not have a testsuites level', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        "eval": "_jUnitTestSuccessPercentage",
                        "op": ">=",
                        "value": 90,
                        "forArtifact": "jUnit1TestSuite"
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, currentEventsForJUnit_MultipleVersions, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('JUnit Test Success - no docs', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        "eval": "_jUnitTestSuccessPercentage",
                        "op": ">=",
                        "value": 90
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, mochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('JUnit Critical Tests - Test case not found.', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        "eval": "_hasJUnitCriticalTestsPassed('otc-api PUT Multiple Service Instances - PUT /api/v1/service_instances/:suid/ #37 Was the second service instance creation successful? ')",
                        "op": "=",
                        "value": true,
                        "forArtifact": "jUnitWithFailures"
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, currentEventsForJUnit_MultipleVersions, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('JUnit Critical Tests - Test case failed.', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        "eval": "_hasJUnitCriticalTestsPassed('otc-api PUT Multiple Service Instances - PUT /api/v1/service_instances/:suid/ #39 Was the second service instance bound successfully to the toolchain? ')",
                        "op": "=",
                        "value": true,
                        "forArtifact": "jUnitWithFailures"
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, currentEventsForJUnit_MultipleVersions, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('JUnit Critical Tests - Test case does not exist.', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        "eval": "_hasJUnitCriticalTestsPassed('FAKE TEST CASE!')",
                        "op": "=",
                        "value": true,
                        "forArtifact": "jUnitWithFailures"
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, currentEventsForJUnit_MultipleVersions, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.rules[0].failures[0].failed === "_hasJUnitCriticalTestsPassed('FAKE TEST CASE!') evaluated as: [false], expected: [true], operation: [=]", 'Unexpected failure message:' + response.rules[0].failures[0].failed);
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });
    });
}());
