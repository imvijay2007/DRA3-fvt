global.syslogConfig = {};
global.syslogConfig.enabled = false;
(function() {

    'use strict';

    var requireHelper = require('./requireHelper');
    var criteria = requireHelper.require('tests/coverage/instrumented/routes/criteria.js');
    var mochafunctions = requireHelper.require('tests/coverage/instrumented/routes/tools/mochafunctions.js');
    var istanbulfunctions = requireHelper.require('tests/coverage/instrumented/routes/tools/istanbulfunctions.js');
    var utils = requireHelper.require('tests/coverage/instrumented/routes/utils.js');
    var assert = require('chai').assert;

    var testutils = require('./testutils');
    var mochadocs = testutils.getTestFile("mochaResult.json");
    var mochadocsencoded = testutils.getTestFileEncoded("mochaResult.json");
    var mochafailuredocs = testutils.getTestFile("mochaResultFailure.json");
    var emptydocs = testutils.getTestFile("emptyResult.json");
    var istanbuldocs = testutils.getTestFile("istanbulResult.json");
    var istanbulregressdocs = testutils.getTestFile("istanbulResultRegress.json");
    var istanbuldocsencoded = testutils.getTestFileEncoded("istanbulResult.json");
    var dradecisionproceeddocs = testutils.getTestFile("draDecisionProceed.json");

    var build_id = 'oneibmcloud_DeployAnalytics_200';

    describe('test rules engine', function() {

        it('with advisory criteria', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: 'custom_metadata.stage_name',
                        op: 'pattern',
                        value: ".*&.*"
                    }]
                }, {
                    name: 'rule2',
                    conditions: [{
                        eval: 'contents.stats.tests',
                        op: '=',
                        value: "4"
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.rules[1].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[1].name + " outcome:" + response.rules[1].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('with decision criteria', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: 'custom_metadata.stage_name',
                        op: 'pattern',
                        value: ".*&.*",
                        forModule: "DemoDRA",
                        forEnv: "DEV",
                        forStage: "unittest",
                        forTool: "mocha"
                    }]
                }, {
                    name: 'rule2',
                    conditions: [{
                        eval: 'contents.stats.tests',
                        op: '=',
                        value: "4"
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.rules[1].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[1].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('with no documents match', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        name: "Evaluate stage name",
                        eval: 'custom_metadata.stage_name',
                        op: 'pattern',
                        value: ".*&.*",
                        forModule: "DemoDRA",
                        forEnv: "DEV",
                        forStage: "UNITTEST",
                        forTool: "istanbul"
                    }]
                }, {
                    name: 'rule2',
                    conditions: [{
                        eval: 'contents.stats.tests',
                        op: '=',
                        value: "4",
                        forArtifact: "abc.json"
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.rules[1].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[1].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('mochaTestSuccessPercentage - no unittest event', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_mochaTestSuccessPercentage',
                        op: '>',
                        value: 80
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, emptydocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('mochaTestSuccessPercentage - other than unittest event', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_mochaTestSuccessPercentage',
                        op: '>',
                        value: 80
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, istanbuldocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('mochaTestSuccessPercentage - success', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_mochaTestSuccessPercentage',
                        op: '>',
                        value: 80
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasMochaCriticalTestsPassed with no unit test event', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasMochaCriticalTestsPassed("deleteCriteria")',
                        op: '=',
                        value: true
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, istanbuldocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('Predefinedfunctions - hasMochaCriticalTestsPassed with no test failure', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasMochaCriticalTestsPassed("with valid zip code")',
                        op: '=',
                        value: true
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasMochaCriticalTestsPassed with critical test failure', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasMochaCriticalTestsPassed("with without zip code")',
                        op: '=',
                        value: true
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochafailuredocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasMochaCriticalTestsPassed without critical test failures', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasMochaCriticalTestsPassed("with without zip code")',
                        op: '=',
                        value: true
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasMochaCriticalTestsPassed typo in providing test name', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasMochaCriticalTestsPassed("with without tip code")',
                        op: '=',
                        value: true
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('istanbulCoverage - traverse json document', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: 'contents.total.lines.covered',
                        op: '=',
                        value: "19",
                        forTool: "istanbul"
                    }, {
                        eval: 'contents.(routes/apiv1.js).lines.pct',
                        op: '>=',
                        value: "90.47",
                        forTool: "istanbul"
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, istanbuldocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('istanbulcoverage - test all conditions', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: 'contents.total.lines.covered',
                        op: '=',
                        value: "19",
                        forTool: "istanbul"
                    }, {
                        eval: 'contents.total.lines.pct',
                        op: '>=',
                        value: "90"
                    }, {
                        eval: 'contents.total.lines.total',
                        op: '<=',
                        value: "30"
                    }, {
                        eval: 'contents.total.lines.covered',
                        op: '!=',
                        value: "2"
                    }, {
                        eval: 'contents.total.lines.covered',
                        op: '<',
                        value: "62"
                    }, {
                        eval: 'contents.total.lines.covered',
                        op: '>',
                        value: "10"
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, istanbuldocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasMochaTestRegressed - with regression errors', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasMochaTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                mochadocsencoded[0].build_id = "oneibmcloud_DeployAnalytics_195";
                return callback(null, {
                    statusCode: 200
                }, mochadocsencoded);
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
            var r2 = mochafunctions.__set__("utils", utils);
            var r1 = criteria.__set__("mochafunctions", mochafunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochafailuredocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });

            r4();
            r3();
            r2();
            r1();
        });

        it('hasMochaTestRegressed - no document in past pipeline', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasMochaTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback("err", {
                    statusCode: 200
                }, null);
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
            var r2 = mochafunctions.__set__("utils", utils);
            var r1 = criteria.__set__("mochafunctions", mochafunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochafailuredocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });

            r4();
            r3();
            r2();
            r1();
        });

        it('hasMochaTestRegressed - no failure in current build', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasMochaTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback("err", {
                    statusCode: 200
                }, null);
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
            var r2 = mochafunctions.__set__("utils", utils);
            var r1 = criteria.__set__("mochafunctions", mochafunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });

            r4();
            r3();
            r2();
            r1();
        });

        it('hasMochaTestRegressed - failure to get last successful build', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasMochaTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback("err", {
                    statusCode: 200
                }, null);
            };
            global.draConfig.dlms_server = "http://dradummy.com";

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback("err", null);
                    }
                }
            };

            var r4 = utils.__set__("exports.makeRestCall", mockreq);
            var r3 = utils.__set__("db", mockdb);
            var r2 = mochafunctions.__set__("utils", utils);
            var r1 = criteria.__set__("mochafunctions", mochafunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochafailuredocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });

            r4();
            r3();
            r2();
            r1();
        });

        it('hasMochaTestRegressed - no last successful build', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasMochaTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback("err", {
                    statusCode: 200
                }, null);
            };
            global.draConfig.dlms_server = "http://dradummy.com";

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback(null, null);
                    }
                }
            };

            var r4 = utils.__set__("exports.makeRestCall", mockreq);
            var r3 = utils.__set__("db", mockdb);
            var r2 = mochafunctions.__set__("utils", utils);
            var r1 = criteria.__set__("mochafunctions", mochafunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochafailuredocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });

            r4();
            r3();
            r2();
            r1();
        });

        it('hasIstanbulCoverageRegressed - with regression error', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasIstanbulCoverageRegressed(-4)',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                istanbuldocsencoded[0].build_id = "oneibmcloud_DeployAnalytics_195";
                return callback(null, {
                    statusCode: 200
                }, istanbuldocsencoded);
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
            var r2 = istanbulfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("istanbulfunctions", istanbulfunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, istanbulregressdocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });

            r1();
            r2();
            r3();
            r4();
        });

        it('hasIstanbulCoverageRegressed - no document in past pipeline', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasIstanbulCoverageRegressed(-4)',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                istanbuldocsencoded[0].build_id = "oneibmcloud_DeployAnalytics_195";
                return callback("err", {
                    statusCode: 200
                }, null);
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
            var r2 = istanbulfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("istanbulfunctions", istanbulfunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, istanbulregressdocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });

            r1();
            r2();
            r3();
            r4();
        });

        it('hasIstanbulCoverageRegressed - current result does not have istanbul coverage', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasIstanbulCoverageRegressed(-4)',
                        op: '=',
                        value: false
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, mochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasIstanbulCoverageRegressed - no last successful build', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasIstanbulCoverageRegressed(-4)',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                istanbuldocsencoded[0].build_id = "oneibmcloud_DeployAnalytics_195";
                return callback(null, {
                    statusCode: 200
                }, istanbuldocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback(null, null);
                    }
                }
            };

            var r4 = utils.__set__("exports.makeRestCall", mockreq);
            var r3 = utils.__set__("db", mockdb);
            var r2 = istanbulfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("istanbulfunctions", istanbulfunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, istanbulregressdocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });

            r1();
            r2();
            r3();
            r4();
        });

        it('hasIstanbulCoverageRegressed - error getting previous build', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasIstanbulCoverageRegressed(-4)',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                istanbuldocsencoded[0].build_id = "oneibmcloud_DeployAnalytics_195";
                return callback(null, {
                    statusCode: 200
                }, istanbuldocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback("err", null);
                    }
                }
            };

            var r4 = utils.__set__("exports.makeRestCall", mockreq);
            var r3 = utils.__set__("db", mockdb);
            var r2 = istanbulfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("istanbulfunctions", istanbulfunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, istanbulregressdocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });

            r1();
            r2();
            r3();
            r4();
        });

        it('hasIstanbulCoverageRegressed - no regression error', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasIstanbulCoverageRegressed(-4)',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                istanbuldocsencoded[0].build_id = "oneibmcloud_DeployAnalytics_195";
                return callback(null, {
                    statusCode: 200
                }, istanbuldocsencoded);
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
            var r2 = istanbulfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("istanbulfunctions", istanbulfunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, istanbuldocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });

            r1();
            r2();
            r3();
            r4();
        });
    });
}());
