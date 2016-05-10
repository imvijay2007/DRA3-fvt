global.draConfig = {};
global.draConfig.mongodb = {};
//global.draConfig.consolelog = true;
global.syslogConfig = {};
global.syslogConfig.enabled = false;
(function() {

    'use strict';

    var requireHelper = require('./requireHelper');
    var criteria = requireHelper.require('tests/coverage/instrumented/routes/criteria.js');
    var assert = require('chai').assert;

    var testutils = require('./testutils');
    var arrayresults = testutils.getTestFile("arrayResults.json");

    var build_id = 'oneibmcloud_DeployAnalytics_200';

    describe('Test rules engine', function() {

        it('security scan analysis', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'compliance',
                    conditions: [{
                        eval: 'contents.compliance.hits.hits.*._source.compliant',
                        op: '=',
                        value: "true",
                        reportType: "Attributes",
                        reportAttributes: [
                            'contents.compliance.hits.hits.*._source.reason',
                            'contents.compliance.hits.hits.*._source.request_id'
                        ],
                        forTool: "securityscan"
                    }, {
                        eval: 'contents.compliance.timed_out',
                        op: '=',
                        value: false,
                        reportType: "Attributes",
                        forTool: "securityscan"
                    }]
                }, {
                    name: 'vulnerability',
                    conditions: [{
                        eval: 'contents.vulnerability.hits.hits.*._source.vulnerable',
                        op: '=',
                        value: false,
                        reportType: "Attributes",
                        reportAttributes: [
                            'contents.compliance.hits.hits.*._source.reason',
                            'contents.compliance.hits.hits.*._source.request_id'
                        ],
                        forTool: "securityscan"
                    }, {
                        eval: 'contents.vulnerability.timed_out',
                        op: '=',
                        value: false,
                        forTool: "securityscan"
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, arrayresults, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '50%', 'Unexpected score:' + response.score);
                done();
            });

        });

        it('traverse json document', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision', //advisory or decision
                rules: [{
                    name: 'rule1',
                    mode: 'decision',
                    conditions: [{
                        eval: 'contents.compliance.hits.hits.60._source.compliant',
                        op: '=',
                        value: "false",
                        forTool: "securityscan"
                    }]
                }]
            };

            criteria.applyRules('Bearer somehex', testCriteria, build_id, arrayresults, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });
    });
}());
