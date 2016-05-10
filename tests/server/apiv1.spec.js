//Licensed Materials - Property of IBM
//
//@ Copyright IBM Corp. 2015  All Rights Reserved
//
//US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
/*jslint browser: true, plusplus: true, nomen: true*/
/*global describe, it, require, beforeEach, afterEach*/

global.syslogConfig = {};
global.syslogConfig.enabled = false;

(function() {

    'use strict';

    var requireHelper = require('./requireHelper');
    var apiv1 = requireHelper.require('tests/coverage/instrumented/routes/apiv1.js');
    var criteria = requireHelper.require('tests/coverage/instrumented/routes/criteria.js');
    var utils = requireHelper.require('tests/coverage/instrumented/routes/utils.js');
    var assert = require('chai').assert;
    var sinon = require('sinon');

    var testutils = require('./testutils');
    var mochadocsencoded = testutils.getTestFileEncoded("mochaResult.json");
    var acriteriamocha = testutils.getTestFile("acriteriamocha.json");
    var acriteriaistanbul = testutils.getTestFile("acriteriaistanbul.json");

    // create mock request and response
    var reqMock = {};

    var resMock = {};
    resMock.status = function() {
        return this;
    };
    resMock.send = function() {
        return this;
    };
    resMock.end = function() {
        return this;
    };
    sinon.spy(resMock, "status");
    sinon.spy(resMock, "send");


    describe('apiv1', function() {
        it('list decisions success', function() {
            reqMock.query = {
                org_id: "ORG1"
            };

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback(null, mochadocsencoded);
                    }
                }
            };
            var r2 = utils.__set__("db", mockdb);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.listDecisions(reqMock, resMock);
            assert(resMock.status.lastCall.calledWith(200), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
        });

        it('list decision err getting data', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback("err", mochadocsencoded);
                    }
                }
            };
            var r2 = utils.__set__("db", mockdb);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.listDecisions(reqMock, resMock);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
        });

        it('latest decision success', function() {
            reqMock.query = {
                org_id: "ORG1"
            };

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback(null, mochadocsencoded);
                    }
                }
            };
            var r2 = utils.__set__("db", mockdb);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.latestDecision(reqMock, resMock);
            assert(resMock.status.lastCall.calledWith(200), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
        });

        it('latest decision zero response', function() {
            reqMock.query = {
                org_id: "ORG1"
            };

            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback(null, []);
                    }
                }
            };
            var r2 = utils.__set__("db", mockdb);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.latestDecision(reqMock, resMock);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
        });

        it('latest decision err getting data', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            var mockdb = {
                events: {
                    find: function(arg, callback) {
                        return callback("err", mochadocsencoded);
                    }
                }
            };
            var r2 = utils.__set__("db", mockdb);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.latestDecision(reqMock, resMock);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
        });
    });

    describe('apiv1', function() {
        it('decision - bearertoken missing', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1"
            };
            reqMock.headers = {};
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback("err", mochadocsencoded);
                    }
                }
            };

            //var r3 = criteria.__set__("exports.makeRestCall", mockrequest);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].indexOf('bearertoken is required to make a decision') !== -1, "Expected response message:" + resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
        });
        it('decision - failed to get criteria', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback("err", mochadocsencoded);
                    }
                }
            };

            //var r3 = criteria.__set__("exports.makeRestCall", mockrequest);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].message.indexOf('Failed to get criteria from database') !== -1, "Expected response message:" + resMock.send.lastCall.args[0].message);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
        });

        it('decision - missing post parameters 1', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                //project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1"
            };

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);   
            assert(resMock.send.lastCall.args[0].indexOf('project_name is required to make a decision') !== -1, "Expected response message:" + resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
        });

        it('decision - missing parameters 2', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                //runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1"
            };
            reqMock.headers = {};

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args); 
            assert(resMock.send.lastCall.args[0].indexOf('Either runtime_name or module_name is') !== -1, "Expected response message:" + resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
        });

        it('decision - missing parameters 3', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                //build_id: "build1",
                criteria_name: "criteria1"
            };
            reqMock.headers = {};

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].indexOf('build_id is required to make a decision') !== -1, "Expected response message:" + resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
        });

        it('decision - missing parameters 4', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1"
            };
            reqMock.headers = {};

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].indexOf('criteria_name is required to make a decision') !== -1, "Expected response message:" + resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
        });

        it('decision - criteria ok but failed to get events', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback("err", {
                    statusCode: 400
                }, mochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [acriteriamocha]);
                    }
                }
            };

            var r4 = utils.__set__("exports.makeRestCall", mockrequest);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].message.indexOf('Failed to get events for build_id') !== -1, "Expected response message:" + resMock.send.lastCall.args[0].message);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
        });

        it('decision - criteria ok events ok some decision', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [acriteriamocha]);
                    }
                },
                events: {
                    save: function(decision, callback) {
                        decision._id = "123abc";
                        return callback(null, decision);
                    }
                }
            };

            var r5 = utils.__set__("exports.makeRestCall", mockrequest);
            var r4 = utils.__set__("db", mockdb);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(JSON.stringify(resMock.send.lastCall.args, null, 4), resMock.status.lastCall.args, resMock.send.lastCall.args[0].contents.rules[0].artifact_name, resMock.send.lastCall.args[0].contents.rules[1].artifact_name);
            assert(resMock.send.lastCall.args[0].artifact_name === 'decision', "Expected response message:" + resMock.send.lastCall.args[0].artifact_name);
            assert(resMock.send.lastCall.args[0].contents.rules[0].artifact_name === 'mochatest2.json', "Expected response message:" + resMock.send.lastCall.args[0].contents.rules[0].artifact_name);
            assert(resMock.send.lastCall.args[0].contents.rules[1].artifact_name === 'mochatest1.json', "Expected response message:" + resMock.send.lastCall.args[0].contents.rules[1].artifact_name);
            assert(resMock.status.lastCall.calledWith(200), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
            r4();
            r5();
        });

        it('decision - some decision, with invalid rule_names', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1",
                rule_names: "abc"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [acriteriamocha]);
                    }
                },
                events: {
                    save: function(decision, callback) {
                        decision._id = "123abc";
                        return callback(null, decision);
                    }
                }
            };

            var r5 = utils.__set__("exports.makeRestCall", mockrequest);
            var r4 = utils.__set__("db", mockdb);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0] === 'Criteria does not have any rules, some rule required to make a decision', "Expected response message:" + resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
            r4();
            r5();
        });

        it('decision - some decision, with valid rule_names', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1",
                rule_names: "Regression (mocha)"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [acriteriamocha]);
                    }
                },
                events: {
                    save: function(decision, callback) {
                        decision._id = "123abc";
                        return callback(null, decision);
                    }
                }
            };

            var r5 = utils.__set__("exports.makeRestCall", mockrequest);
            var r4 = utils.__set__("db", mockdb);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].artifact_name === 'decision', "Expected response message:" + resMock.send.lastCall.args[0].artifact_name);
            assert(resMock.status.lastCall.calledWith(200), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
            r4();
            r5();
        });

        it('decision - some decision, with valid rule_names correct delimiter', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1",
                rule_names: "At least 100% success in unit tests (mocha);Regression (mocha)"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [acriteriamocha]);
                    }
                },
                events: {
                    save: function(decision, callback) {
                        decision._id = "123abc";
                        return callback(null, decision);
                    }
                }
            };

            var r5 = utils.__set__("exports.makeRestCall", mockrequest);
            var r4 = utils.__set__("db", mockdb);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].artifact_name === 'decision', "Expected response message:" + resMock.send.lastCall.args[0].artifact_name);
            assert(resMock.status.lastCall.calledWith(200), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
            r4();
            r5();
        });

        it('decision - some decision, with valid rule_names incorrect delimiter', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1",
                rule_names: "At least 100% success in unit tests (mocha),Regression (mocha)"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [acriteriamocha]);
                    }
                },
                events: {
                    save: function(decision, callback) {
                        decision._id = "123abc";
                        return callback(null, decision);
                    }
                }
            };

            var r5 = utils.__set__("exports.makeRestCall", mockrequest);
            var r4 = utils.__set__("db", mockdb);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0] === 'Criteria does not have any rules, some rule required to make a decision', "Expected response message:" + resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
            r4();
            r5();
        });

        it('decision - criteria ok events ok some decision save failed', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [acriteriamocha]);
                    }
                },
                events: {
                    save: function(decision, callback) {
                        return callback("err", decision);
                    }
                }
            };

            var r5 = utils.__set__("exports.makeRestCall", mockrequest);
            var r4 = utils.__set__("db", mockdb);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].indexOf('Failed to save the decision: err') !== -1, "Expected response message:" + resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
            r4();
            r5();
        });

        it('decision - criteria ok events ok but empty some decision save ok', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, []);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [acriteriamocha]);
                    }
                },
                events: {
                    save: function(decision, callback) {
                        decision._id = "123abcd";
                        return callback(null, decision);
                    }
                }
            };

            var r5 = utils.__set__("exports.makeRestCall", mockrequest);
            var r4 = utils.__set__("db", mockdb);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].decision_id === '123abcd', "Expected response message:" + resMock.send.lastCall.args[0].decision_id);
            assert(resMock.status.lastCall.calledWith(200), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
            r4();
            r5();
        });

        it('decision - some decision, with invalid stage names', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1",
                rule_names: "abc",
                lifecycle_stage_names: "abc"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [acriteriamocha]);
                    }
                },
                events: {
                    save: function(decision, callback) {
                        decision._id = "123abc";
                        return callback(null, decision);
                    }
                }
            };

            var r5 = utils.__set__("exports.makeRestCall", mockrequest);
            var r4 = utils.__set__("db", mockdb);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0] === 'Criteria does not have any rules, some rule required to make a decision', "Expected response message:" + resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
            r4();
            r5();
        });

        it('decision - some decision, with valid stage names', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1",
                rule_names: "abc",
                lifecycle_stage_names: "fvt"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [acriteriamocha]);
                    }
                },
                events: {
                    save: function(decision, callback) {
                        decision._id = "123abc";
                        return callback(null, decision);
                    }
                }
            };

            var r5 = utils.__set__("exports.makeRestCall", mockrequest);
            var r4 = utils.__set__("db", mockdb);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].artifact_name === 'decision', "Expected response message:" + resMock.send.lastCall.args[0].artifact_name);
            assert(resMock.status.lastCall.calledWith(200), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
            r4();
            r5();
        });

        it('decision - decision with artifact name in criteria', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        acriteriamocha.rules[0].conditions[0].forArtifact = "abc";
                        acriteriamocha.rules[1].conditions[0].forArtifact = "abc";
                        return callback(null, [acriteriamocha]);
                    }
                },
                events: {
                    save: function(decision, callback) {
                        decision._id = "123abc";
                        return callback(null, decision);
                    }
                }
            };

            var r5 = utils.__set__("exports.makeRestCall", mockrequest);
            var r4 = utils.__set__("db", mockdb);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].artifact_name === 'decision', "Expected response message:" + resMock.send.lastCall.args[0].artifact_name);
            assert(resMock.status.lastCall.calledWith(200), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
            r4();
            r5();
            delete acriteriamocha.rules[0].conditions[0].forArtifact;
            delete acriteriamocha.rules[1].conditions[0].forArtifact;
        });

        it('decision - decision with forStage missing in criteria', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        delete acriteriamocha.rules[0].conditions[0].forStage;
                        return callback(null, [acriteriamocha]);
                    }
                },
                events: {
                    save: function(decision, callback) {
                        decision._id = "123abc";
                        return callback(null, decision);
                    }
                }
            };

            var r5 = utils.__set__("exports.makeRestCall", mockrequest);
            var r4 = utils.__set__("db", mockdb);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0] === 'Failed while expanding the criteria for reason: Invalid criteria, either forStage or forTool is undefined', "Expected response message:" + resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
            r4();
            r5();
            acriteriamocha.rules[0].conditions[0].forStage = 'unittest';
        });

        it('decision - decision with forTool missing in criteria', function() {
            reqMock.query = {
                org_id: "ORG1"
            };
            reqMock.body = {
                project_name: "project1",
                runtime_name: "runtime1",
                build_id: "build1",
                criteria_name: "criteria1"
            };
            reqMock.headers = {
                authorization: "bearer token"
            };
            var mockrequest = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochadocsencoded);
            };
            global.draConfig.dlms_server = "http://dradummy.com";
            var mockdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        delete acriteriamocha.rules[1].conditions[0].forTool;
                        return callback(null, [acriteriamocha]);
                    }
                },
                events: {
                    save: function(decision, callback) {
                        decision._id = "123abc";
                        return callback(null, decision);
                    }
                }
            };

            var r5 = utils.__set__("exports.makeRestCall", mockrequest);
            var r4 = utils.__set__("db", mockdb);
            var r3 = criteria.__set__("db", mockdb);
            var r2 = apiv1.__set__("criteria", criteria);
            var r1 = apiv1.__set__("utils", utils);

            apiv1.decision(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0] === 'Failed while expanding the criteria for reason: Invalid criteria, either forStage or forTool is undefined', "Expected response message:" + resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

            r1();
            r2();
            r3();
            r4();
            r5();
            acriteriamocha.rules[1].conditions[0].forTool = 'mocha';
        });
    });
}());
