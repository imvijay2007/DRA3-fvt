(function() {

    'use strict';

    var requireHelper = require('./requireHelper');
    var criteria = requireHelper.require('tests/coverage/instrumented/routes/criteria.js');
    var saucelabfunctions = requireHelper.require('tests/coverage/instrumented/routes/tools/saucelabfunctions.js');
    var utils = requireHelper.require('tests/coverage/instrumented/routes/utils.js');
    var assert = require('chai').assert;

    var testutils = require('./testutils');
    var saucelabdocs = testutils.getTestFile("saucelabResult.json");
    var saucelabdocsencoded = testutils.getTestFileEncoded("saucelabResult.json");
    var mochadocs = testutils.getTestFile("mochaResult.json");
    var dradecisionproceeddocs = testutils.getTestFile("draDecisionProceed.json");

    var build_id = 'oneibmcloud_DeployAnalytics_200';

    describe('saucelabfunctions', function() {

        it('SuccessPercentage Success', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_saucelabTestSuccessPercentage',
                        op: '=',
                        value: 100
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('SuccessPercentage - No test in the result', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_saucelabTestSuccessPercentage',
                        op: '=',
                        value: 100
                    }]
                }]
            };

            var saucelabdocs1 = testutils.getTestFile("saucelabResult.json");
            delete saucelabdocs1[0].contents;
            saucelabdocs1[0].contents = [];

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs1, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('SuccessPercentage - No results', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_saucelabTestSuccessPercentage',
                        op: '=',
                        value: 100
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

        it('hasSaucelabCriticalTestPassed - no arguments passed', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabCriticalTestPassed',
                        op: '=',
                        value: true
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasSaucelabCriticalTestPassed - no arguments passed', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabCriticalTestPassed',
                        op: '=',
                        value: true
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasSaucelabCriticalTestPassed - no test in the result', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabCriticalTestPassed("Test App page", "Test Home Page")',
                        op: '=',
                        value: true
                    }]
                }]
            };

            var saucelabdocs1 = testutils.getTestFile("saucelabResult.json");
            delete saucelabdocs1[0].contents;
            saucelabdocs1[0].contents = [];

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs1, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasSaucelabCriticalTestPassed - no test result', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabCriticalTestPassed("Test App page", "Test Home Page")',
                        op: '=',
                        value: true
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

        it('hasSaucelabCriticalTestPassed - success', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabCriticalTestPassed("Test App page", "Test Home Page")',
                        op: '=',
                        value: true
                    }]
                }]
            };

            var saucelabdocs1 = testutils.getTestFile("saucelabResult.json");
            saucelabdocs1[0].contents[1].consolidated_status = "Failed";

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs1, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasSaucelabCriticalTestPassed - failed', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabCriticalTestPassed("Test App page", "Test Home Page")',
                        op: '=',
                        value: true
                    }]
                }]
            };

            var saucelabdocs1 = testutils.getTestFile("saucelabResult.json");
            saucelabdocs1[0].contents[0].consolidated_status = "Failed";

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs1, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasSaucelabTestRegressed - pipeline has not test result', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabTestRegressed',
                        op: '=',
                        value: false
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

        it('hasSaucelabTestRegressed - test result has no test cases', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var saucelabdocs1 = testutils.getTestFile("saucelabResult.json");
            delete saucelabdocs1[0].contents;
            saucelabdocs1[0].contents = [];

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs1, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasSaucelabTestRegressed - success no failed test cases', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === true, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '100%', 'Unexpected score:' + response.score);
                done();
            });
        });

        it('hasSaucelabTestRegressed - has regression', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var saucelabdocs1 = testutils.getTestFile("saucelabResult.json");
            saucelabdocs1[0].contents[0].consolidated_status = "Failed";

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                saucelabdocs[0].build_id = "oneibmcloud_DeployAnalytics_195";
                return callback(null, {
                    statusCode: 200
                }, saucelabdocsencoded);
            };
            global.DLMS_SERVER = "http://dradummy.com";

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback(null, dradecisionproceeddocs);
                    }
                }
            };

            var r4 = utils.__set__("exports.makeRestCall", mockreq);
            var r3 = utils.__set__("db", mockdb);
            var r2 = saucelabfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("saucelabfunctions", saucelabfunctions);

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs1, function(response) {
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

        it('hasSaucelabTestRegressed - Failed to get last successful pipeline', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var saucelabdocs1 = testutils.getTestFile("saucelabResult.json");
            saucelabdocs1[0].contents[0].consolidated_status = "Failed";

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback("err", dradecisionproceeddocs);
                    }
                }
            };

            //var r4 = utils.__set__("exports.makeRestCall", mockreq);
            var r3 = utils.__set__("db", mockdb);
            var r2 = saucelabfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("saucelabfunctions", saucelabfunctions);

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs1, function(response) {
                //console.log(JSON.stringify(response, null, 4));
                assert(response.proceed === false, 'Unexpected decision:' + response.proceed);
                assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                assert(response.score === '0%', 'Unexpected score:' + response.score);
                done();
            });

            r1();
            r2();
            r3();
        });

        it('hasSaucelabTestRegressed - no last successful pipeline', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var saucelabdocs1 = testutils.getTestFile("saucelabResult.json");
            saucelabdocs1[0].contents[0].consolidated_status = "Failed";

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                saucelabdocs[0].build_id = "oneibmcloud_DeployAnalytics_195";
                return callback(null, {
                    statusCode: 200
                }, []);
            };
            global.DLMS_SERVER = "http://dradummy.com";

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback(null, null);
                    }
                }
            };

            var r4 = utils.__set__("exports.makeRestCall", mockreq);
            var r3 = utils.__set__("db", mockdb);
            var r2 = saucelabfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("saucelabfunctions", saucelabfunctions);

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs1, function(response) {
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

        it('hasSaucelabTestRegressed - no test result in past pipeline', function(done) {

            var testCriteria = {
                name: 'testCriteria',
                mode: 'decision',
                rules: [{
                    name: 'rule1',
                    conditions: [{
                        eval: '_hasSaucelabTestRegressed',
                        op: '=',
                        value: false
                    }]
                }]
            };

            var saucelabdocs1 = testutils.getTestFile("saucelabResult.json");
            saucelabdocs1[0].contents[0].consolidated_status = "Failed";

            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                saucelabdocs[0].build_id = "oneibmcloud_DeployAnalytics_195";
                return callback(null, {
                    statusCode: 200
                }, []);
            };
            global.DLMS_SERVER = "http://dradummy.com";

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback(null, dradecisionproceeddocs);
                    }
                }
            };

            var r4 = utils.__set__("exports.makeRestCall", mockreq);
            var r3 = utils.__set__("db", mockdb);
            var r2 = saucelabfunctions.__set__("utils", utils);
            var r1 = criteria.__set__("saucelabfunctions", saucelabfunctions);

            criteria.applyRules('Bearer hex', testCriteria, build_id, saucelabdocs1, function(response) {
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
        /*


                it('Predefinedfunctions - SaucelabTestSuccessPercentage - regression has occurred', function(done) {
                    var testCriteria = {
                        name: 'testCriteria',
                        project: 'key',
                        revision: 2,
                        mode: 'decision',
                        rules: [{
                            name: 'rule1',
                            conditions: [{
                                eval: '_hasSaucelabTestRegressed',
                                op: '=',
                                value: false
                                    //forEventType: "jUnitZeroFails225Tests-RegressionHasOccurred"
                            }]
                        }]
                    };

                    var mockeventsdb = {
                        events: {
                            find: function(arg, callback) {
                                return callback(null, pastEvents);
                            },
                            distinct: function(arg1, arg2, callback) {
                                return callback(null, ["oneibmcloud_DeployAnalytics_195"]);
                            },
                        },
                    };
                    var mockutils = {
                        findOneEvent: function(arg, callback) {
                            return callback(null, pastsaucelab);
                        },
                        findEvents: function(arg, callback) {
                            return callback(null, ["oneibmcloud_DeployAnalytics_195"]);
                        }
                    };
                    var revert1 = predefinedfunctions.__set__("db", mockeventsdb);
                    var revert2 = predefinedfunctions.__set__("utils", mockutils);
                    var revert3 = criteria.__set__("predefinedfuncs", predefinedfunctions);

                    criteria.applyRules('Bearer hex', testCriteria, pipelineRunId, currentdocs, function(response) {
                        //console.log(JSON.stringify(response, null, 4));
                        assert(response.rules[0].functionResponse[0].regressionOccured === true, 'Unexpected regressionOccured value:' + response.rules[0].functionResponse[0].regressionOccured);
                        assert(response.rules[0].functionResponse[0].list[0] === "Test Home Page", 'Unexpected test case:' + response.rules[0].functionResponse[0].list[0]);
                        assert(response.decision === 'Stop', 'Unexpected decision:' + response.decision);
                        done();
                    });

                    revert3();
                    revert2();
                    revert1();
                });

                it('Predefinedfunctions - hasSaucelabTestRegressed - no logs in the pipeline', function(done) {

                    var testCriteria = {
                        name: 'testCriteria',
                        project: 'key',
                        revision: 2,
                        mode: 'decision',
                        rules: [{
                            name: 'rule1',
                            conditions: [{
                                eval: '_hasSaucelabTestRegressed',
                                op: '=',
                                value: false
                            }]
                        }]
                    };

                    criteria.applyRules('Bearer hex', testCriteria, pipelineRunId, nounittestdocs, function(response) {
                        //console.log(JSON.stringify(response, null, 4));
                        assert(response.decision === 'Stop', 'Unexpected decision:' + response.decision);
                        assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                        assert(response.score === '0%', 'Unexpected score:' + response.score);
                        done();
                    });
                });

                it('Predefinedfunctions - hasSaucelabTestRegressed - empty file contents', function(done) {

                    var testCriteria = {
                        name: 'testCriteria',
                        project: 'key',
                        revision: 2,
                        mode: 'decision',
                        rules: [{
                            name: 'rule1',
                            conditions: [{
                                eval: '_hasSaucelabTestRegressed',
                                op: '=',
                                value: false
                            }]
                        }]
                    };

                    criteria.applyRules('Bearer hex', testCriteria, pipelineRunId, emptyfilecontent, function(response) {
                        //console.log(JSON.stringify(response, null, 4));
                        assert(response.decision === 'Stop', 'Unexpected decision:' + response.decision);
                        assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                        assert(response.score === '0%', 'Unexpected score:' + response.score);
                        done();
                    });
                });

                it('Predefinedfunctions - hasSaucelabTestRegressed - this pipeline has no saucelab failures', function(done) {

                    var testCriteria = {
                        name: 'testCriteria',
                        project: 'key',
                        revision: 2,
                        mode: 'decision',
                        rules: [{
                            name: 'rule1',
                            conditions: [{
                                eval: '_hasSaucelabTestRegressed',
                                op: '=',
                                value: false
                            }]
                        }]
                    };

                    criteria.applyRules('Bearer hex', testCriteria, pipelineRunId, pastdocs, function(response) {
                        //console.log(JSON.stringify(response, null, 4));
                        assert(response.decision === 'Proceed', 'Unexpected decision:' + response.decision);
                        assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                        assert(response.score === '100%', 'Unexpected score:' + response.score);
                        done();
                    });
                });

                it('Predefinedfunctions - hasSaucelabTestRegressed - main flow', function(done) {

                    var testCriteria = {
                        name: 'testCriteria',
                        project: 'key',
                        revision: 2,
                        mode: 'decision',
                        rules: [{
                            name: 'rule1',
                            conditions: [{
                                eval: '_hasSaucelabTestRegressed',
                                op: '=',
                                value: false
                            }]
                        }]
                    };

                    var mockeventsdb = {
                        events: {
                            find: function(arg, callback) {
                                return callback(null, pastdocs);
                            },
                            distinct: function(arg1, arg2, callback) {
                                return callback(null, ["oneibmcloud_DeployAnalytics_195"]);
                            },
                        },
                    };

                    var mockutils = {
                        findOneEvent: function(arg, callback) {
                            return callback(null, pastsaucelab);
                        },
                        checkCondition: function(arg1, arg2, arg3) {
                            return (arg1 <= arg3);
                        }
                    };
                    var revert1 = predefinedfunctions.__set__("db", mockeventsdb);
                    var revert2 = predefinedfunctions.__set__("utils", mockutils);
                    var revert3 = criteria.__set__("predefinedfuncs", predefinedfunctions);

                    criteria.applyRules('Bearer hex', testCriteria, pipelineRunId, currentdocs, function(response) {
                        //console.log(JSON.stringify(response, null, 4));
                        assert(response.decision === 'Stop', 'Unexpected decision:' + response.decision);
                        assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                        assert(response.score === '0%', 'Unexpected score:' + response.score);
                        done();
                    });

                    revert3();
                    revert2();
                    revert1();

                });

                it('Predefinedfunctions - hasSaucelabTestRegressed - no past pipeline', function(done) {

                    var testCriteria = {
                        name: 'testCriteria',
                        project: 'key',
                        revision: 2,
                        mode: 'decision',
                        rules: [{
                            name: 'rule1',
                            conditions: [{
                                eval: '_hasSaucelabTestRegressed',
                                op: '=',
                                value: false
                            }]
                        }]
                    };

                    var mockeventsdb = {
                        events: {
                            find: function(arg, callback) {
                                return callback(null, pastdocs);
                            },
                            distinct: function(arg1, arg2, callback) {
                                return callback(null, null);
                            },
                        },
                    };

                    var mockutils = {
                        findOneEvent: function(arg, callback) {
                            return callback(null, pastsaucelab);
                        },
                        checkCondition: function(arg1, arg2, arg3) {
                            return (arg1 <= arg3);
                        },
                        findEvents: function(arg1, callback) {
                            return callback(null, []);
                        }
                    };
                    var revert1 = predefinedfunctions.__set__("db", mockeventsdb);
                    var revert2 = predefinedfunctions.__set__("utils", mockutils);
                    var revert3 = criteria.__set__("predefinedfuncs", predefinedfunctions);

                    criteria.applyRules('Bearer hex', testCriteria, pipelineRunId, currentdocs, function(response) {
                        //console.log(JSON.stringify(response, null, 4));
                        assert(response.decision === 'Proceed', 'Unexpected decision:' + response.decision);
                        assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                        assert(response.score === '100%', 'Unexpected score:' + response.score);
                        done();
                    });

                    revert3();
                    revert2();
                    revert1();

                });

                it('Predefinedfunctions - hasSaucelabTestRegressed - no past pipeline', function(done) {

                    var testCriteria = {
                        name: 'testCriteria',
                        project: 'key',
                        revision: 2,
                        mode: 'decision',
                        rules: [{
                            name: 'rule1',
                            conditions: [{
                                eval: '_hasSaucelabTestRegressed',
                                op: '=',
                                value: false
                            }]
                        }]
                    };

                    var mockeventsdb = {
                        events: {
                            find: function(arg, callback) {
                                return callback(null, pastdocs);
                            },
                            distinct: function(arg1, arg2, callback) {
                                return callback(null, null);
                            }
                        }
                    };

                    var mockutils = {
                        findOneEvent: function(arg, callback) {
                            return callback(null, pastsaucelab);
                        },
                        checkCondition: function(arg1, arg2, arg3) {
                            return (arg1 <= arg3);
                        },
                        findEvents: function(arg1, callback) {
                            return callback(null, []);
                        }
                    };
                    var revert1 = predefinedfunctions.__set__("db", mockeventsdb);
                    var revert2 = predefinedfunctions.__set__("utils", mockutils);
                    var revert3 = criteria.__set__("predefinedfuncs", predefinedfunctions);

                    criteria.applyRules('Bearer hex', testCriteria, pipelineRunId, currentdocs, function(response) {
                        //console.log(JSON.stringify(response, null, 4));
                        assert(response.decision === 'Proceed', 'Unexpected decision:' + response.decision);
                        assert(response.rules[0].outcome === 'Success', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                        assert(response.score === '100%', 'Unexpected score:' + response.score);
                        done();
                    });

                    revert3();
                    revert2();
                    revert1();

                });

                it('Predefinedfunctions - hasSaucelabTestRegressed - failed to get past pipeline', function(done) {

                    var testCriteria = {
                        name: 'testCriteria',
                        project: 'key',
                        revision: 2,
                        mode: 'decision',
                        rules: [{
                            name: 'rule1',
                            conditions: [{
                                eval: '_hasSaucelabTestRegressed',
                                op: '=',
                                value: false
                            }]
                        }]
                    };

                    var mockeventsdb = {
                        events: {
                            find: function(arg, callback) {
                                return callback(null, pastdocs);
                            },
                            distinct: function(arg1, arg2, callback) {
                                return callback("err", null);
                            }
                        }
                    };

                    var mockutils = {
                        findOneEvent: function(arg, callback) {
                            return callback(null, pastsaucelab);
                        },
                        checkCondition: function(arg1, arg2, arg3) {
                            return (arg1 <= arg3);
                        }
                    };
                    var revert1 = predefinedfunctions.__set__("db", mockeventsdb);
                    var revert2 = predefinedfunctions.__set__("utils", mockutils);
                    var revert3 = criteria.__set__("predefinedfuncs", predefinedfunctions);

                    criteria.applyRules('Bearer hex', testCriteria, pipelineRunId, currentdocs, function(response) {
                        //console.log(JSON.stringify(response, null, 4));
                        assert(response.decision === 'Stop', 'Unexpected decision:' + response.decision);
                        assert(response.rules[0].outcome === 'Failed', 'Unexpected outcome for rule:' + response.rules[0].name + " outcome:" + response.rules[0].outcome);
                        assert(response.score === '0%', 'Unexpected score:' + response.score);
                        done();
                    });

                    revert3();
                    revert2();
                    revert1();

                });



        */
    });
}());
