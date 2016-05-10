(function() {

    'use strict';

    var requireHelper = require('./requireHelper');
    var criteria = requireHelper.require('tests/coverage/instrumented/routes/criteria.js');
    var blanketjsfunctions = requireHelper.require('tests/coverage/instrumented/routes/tools/blanketjsfunctions.js');
    var utils = requireHelper.require('tests/coverage/instrumented/routes/utils.js');
    var assert = require('chai').assert;

    var testutils = require('./testutils');
    var mochadocs = testutils.getTestFile("mochaResult.json");
    var blankejsdocs = testutils.getTestFile("blanketjsResult.json");
    var blankejsdocsencoded = testutils.getTestFileEncoded("blanketjsResult.json");
    var pastblanketjsdocsencoded = testutils.getTestFileEncoded("pastBlanketjsResult.json");
    var dradecisionproceeddocs = testutils.getTestFile("draDecisionProceed.json");

    var build_id = 'oneibmcloud_DeployAnalytics_200';

    describe('BlanketJS functions', function() {
        it('pipeline does not have test results', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasBlanketCoverageRegressed',
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

        it('testResult does not have tests section', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasBlanketCoverageRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var tempdocs = testutils.getTestFile("blanketjsResult.json");
            delete tempdocs[0].contents.files;
            tempdocs[0].contents.files = [];

            criteria.applyRules('Bearer somehex', testCriteria, build_id, tempdocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('has regression', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasBlanketCoverageRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, pastblanketjsdocsencoded);
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
            var r2 = blanketjsfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("blanketjsfunctions", blanketjsfunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, blankejsdocs, function(response) {
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

        it('Failed to get Last successful build', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasBlanketCoverageRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, pastblanketjsdocsencoded);
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
            var r2 = blanketjsfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("blanketjsfunctions", blanketjsfunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, blankejsdocs, function(response) {
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

        it('pipeline does not have last successful build', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasBlanketCoverageRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, pastblanketjsdocsencoded);
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
            var r2 = blanketjsfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("blanketjsfunctions", blanketjsfunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, blankejsdocs, function(response) {
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

        it('pipeline has no regression', function(done) {
            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasBlanketCoverageRegressed(-4)',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, blankejsdocsencoded);
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
            var r2 = blanketjsfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("blanketjsfunctions", blanketjsfunctions);

            criteria.applyRules('Bearer somehex', testCriteria, build_id, blankejsdocs, function(response) {
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
