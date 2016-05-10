(function() {

    'use strict';

    var requireHelper = require('./requireHelper');
    var criteria = requireHelper.require('tests/coverage/instrumented/routes/criteria.js');
    var karmamochafunctions = requireHelper.require('tests/coverage/instrumented/routes/tools/karmamochafunctions.js');
    var utils = requireHelper.require('tests/coverage/instrumented/routes/utils.js');
    var assert = require('chai').assert;

    var testutils = require('./testutils');
    var karmamochadocs = testutils.getTestFile("karmamochaResult.json");
    var karmamochadocsencoded = testutils.getTestFileEncoded("karmamochaResult.json");
    var pastkarmamochadocs = testutils.getTestFile("pastkarmamochaResult.json");
    var pastkarmamochadocsencoded = testutils.getTestFileEncoded("pastkarmamochaResult.json");
    var mochadocs = testutils.getTestFile("mochaResult.json");
    var dradecisionproceeddocs = testutils.getTestFile("draDecisionProceed.json");

    var build_id = 'oneibmcloud_DeployAnalytics_200';

    describe('Karmamocha Functions', function() {

        it('with 90% Success', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        "eval": "_karmamochaTestSuccessPercentage",
                        "op": ">=",
                        "value": 90
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, karmamochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('with some failures', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        "eval": "_karmamochaTestSuccessPercentage",
                        "op": "=",
                        "value": 100
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, karmamochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('no document found', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        "eval": "_karmamochaTestSuccessPercentage",
                        "op": "=",
                        "value": 100
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

        it('regression - no document found', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        "eval": "_hasKarmaMochaTestRegressed",
                        "op": "=",
                        "value": 100
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

        it('regression - no failures found', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        "eval": "_hasKarmaMochaTestRegressed",
                        "op": "=",
                        "value": 100
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, pastkarmamochadocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('no regression', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasKarmaMochaTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                karmamochadocsencoded[0].build_id = "oneibmcloud_DeployAnalytics_195";
                return callback(null, {
                    statusCode: 200
                }, karmamochadocsencoded);
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
            var r2 = karmamochafunctions.__set__("utils", utils);
            var r1 = criteria.__set__("karmamochafunctions", karmamochafunctions);

            criteria.applyRules('Bearer hex', testCriteria, build_id, karmamochadocs, function(response) {
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

        it('with regression', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasKarmaMochaTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, pastkarmamochadocsencoded);
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
            var r2 = karmamochafunctions.__set__("utils", utils);
            var r1 = criteria.__set__("karmamochafunctions", karmamochafunctions);

            criteria.applyRules('Bearer hex', testCriteria, build_id, karmamochadocs, function(response) {
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

        it('error getting last successful build', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasKarmaMochaTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, pastkarmamochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback("err", dradecisionproceeddocs);
                    }
                }
            };

            var r4 = utils.__set__("exports.makeRestCall", mockreq);
            var r3 = utils.__set__("db", mockdb);
            var r2 = karmamochafunctions.__set__("utils", utils);
            var r1 = criteria.__set__("karmamochafunctions", karmamochafunctions);

            criteria.applyRules('Bearer hex', testCriteria, build_id, karmamochadocs, function(response) {
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

        it('no data in past pastpipeline build', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasKarmaMochaTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, []);
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
            var r2 = karmamochafunctions.__set__("utils", utils);
            var r1 = criteria.__set__("karmamochafunctions", karmamochafunctions);

            criteria.applyRules('Bearer hex', testCriteria, build_id, karmamochadocs, function(response) {
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

        it('no karmamocha in past pastpipeline build', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasKarmaMochaTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, karmamochadocsencoded);
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
            var r2 = karmamochafunctions.__set__("utils", utils);
            var r1 = criteria.__set__("karmamochafunctions", karmamochafunctions);

            criteria.applyRules('Bearer hex', testCriteria, build_id, karmamochadocs, function(response) {
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
