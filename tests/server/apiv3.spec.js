global.syslogConfig = {};
global.syslogConfig.enabled = false;
var requireHelper = require('./requireHelper');
var criteria_create = requireHelper.require('tests/coverage/instrumented/routes/api/criteria/create');
var criteria_update = requireHelper.require('tests/coverage/instrumented/routes/api/criteria/update');
var criteria_delete = requireHelper.require('tests/coverage/instrumented/routes/api/criteria/delete');
var criteria_read = requireHelper.require('tests/coverage/instrumented/routes/api/criteria/read');
var convertMap = requireHelper.require('tests/coverage/instrumented/routes/api/criteria/convert');
var utils = requireHelper.require('tests/coverage/instrumented/routes/utils.js');
var apiv1 = requireHelper.require('tests/coverage/instrumented/routes/apiv1.js');
var assert = require('chai').assert;
var sinon = require('sinon');

(function() {
    'use strict';
    describe('apiv3 criteria', function() {

        it('create.validate with empty body', function(done) {
            var reqMock = {};
            var resMock = {};
            resMock.status = function(code) {
                return this;
            };
            resMock.send = function(msg) {
                return this;
            };
            resMock.end = function() {
                return this;
            };
            sinon.spy(resMock, "status");
            sinon.spy(resMock, "send");

            reqMock.query = {
                org_id: 'org_id'
            };

            reqMock.body = {};
            criteria_create.validate(reqMock, resMock, function() {});
            assert(resMock.status.lastCall.args[0] === 400, 'Unexpected status code:' + resMock.status.lastCall.args[0]);
            assert(resMock.send.lastCall.args[0] === 'Post body is missing', 'Unexpected msg:' + resMock.send.lastCall.args[0]);
            done();
        });

        it('create.validate with empty name', function(done) {
            var reqMock = {};
            var resMock = {};
            resMock.status = function(code) {
                return this;
            };
            resMock.send = function(msg) {
                return this;
            };
            resMock.end = function() {
                return this;
            };
            sinon.spy(resMock, "status");
            sinon.spy(resMock, "send");

            reqMock.query = {
                org_id: 'org_id'
            };

            reqMock.body = {
                name: ''
            };
            criteria_create.validate(reqMock, resMock, function() {});
            assert(resMock.status.lastCall.args[0] === 400, 'Unexpected status code:' + resMock.status.lastCall.args[0]);
            assert(resMock.send.lastCall.args[0] === 'Criteria name is missing', 'Unexpected msg:' + resMock.send.lastCall.args[0]);
            done();
        });

        it('create.validate with proper body & name', function(done) {
            var reqMock = {};
            var resMock = {};
            resMock.status = function(code) {
                return this;
            };
            resMock.send = function(msg) {
                return this;
            };
            resMock.end = function() {
                return this;
            };
            sinon.spy(resMock, "status");
            sinon.spy(resMock, "send");

            reqMock.query = {
                org_id: 'org_id'
            };

            reqMock.body = {
                name: 'some-name'
            };
            //criteria_create.validate(reqMock, resMock, done);
            criteria_create.validate(reqMock, resMock, function() {});
            //console.log(resMock.status.lastCall.args[0], resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.args[0] === 400, 'Unexpected status code:' + resMock.status.lastCall.args[0]);
            assert(resMock.send.lastCall.args[0] === 'Rules not defined in the criteria', 'Unexpected msg:' + resMock.send.lastCall.args[0]);
            done();

        });

        it('create.convert with proper body', function(done) {
            var ACriteria = {
                "_id": "",
                "id": 1461701195949,
                "name": "Test12",
                "stage": "fvt",
                "supports": ["mocha", "saucelab", "junit"],
                "rules": [{
                    "id": 1461701195949,
                    "name": "Test12",
                    "stage": "fvt",
                    "percentPass": "12",
                    "regression": true,
                    "format": "mocha",
                    "criticalTests": []
                }]
            };

            var reqMock = {};
            var resMock = {};
            resMock.status = function(code) {
                return this;
            };
            resMock.send = function(msg) {
                return this;
            };
            resMock.end = function() {
                return this;
            };
            sinon.spy(resMock, "status");
            sinon.spy(resMock, "send");

            reqMock.query = {
                org_id: 'org_id'
            };

            reqMock.body = ACriteria;
            criteria_create.convert(reqMock, resMock, done);
        });

        it('create.execute with proper body', function(done) {
            var ACriteria = {
                "_id": "",
                "id": 1461701195949,
                "name": "Test12",
                "stage": "fvt",
                "supports": ["mocha", "saucelab", "junit"],
                "rules": [{
                    "id": 1461701195949,
                    "name": "Test12",
                    "stage": "fvt",
                    "percentPass": "12",
                    "regression": true,
                    "format": "mocha",
                    "criticalTests": []
                }]
            };

            var reqMock = {};
            var resMock = {};
            resMock.status = function(code) {
                return this;
            };
            resMock.send = function(msg) {
                return this;
            };
            resMock.end = function() {
                return this;
            };
            sinon.spy(resMock, "status");
            sinon.spy(resMock, "send");

            reqMock.query = {
                org_id: 'org_id'
            };

            reqMock.body = ACriteria;
            criteria_create.execute(reqMock, resMock);
            done();
        });


        it('update.validate - no criteria name in query', function(done) {
            var reqMock = {};
            var resMock = {};
            resMock.status = function(code) {
                return this;
            };
            resMock.send = function(msg) {
                return this;
            };
            resMock.end = function() {
                return this;
            };
            sinon.spy(resMock, "status");
            sinon.spy(resMock, "send");

            reqMock.query = {
                org_id: 'org_id'
            };

            reqMock.body = {
                name: ''
            };
            criteria_update.validate(reqMock, resMock, function() {});
            //console.log(resMock.status.lastCall.args[0], resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.args[0] === 400, 'Unexpected status code:' + resMock.status.lastCall.args[0]);
            assert(resMock.send.lastCall.args[0] === 'Criteria name is missing in the query', 'Unexpected msg:' + resMock.send.lastCall.args[0]);
            done();
        });
        /*
                it('update.validate - with empty body', function(done) {
                    var reqMock = {};
                    var resMock = {};
                    resMock.status = function(code) {
                        return this;
                    };
                    resMock.send = function(msg) {
                        return this;
                    };
                    resMock.end = function() {
                        return this;
                    };
                    sinon.spy(resMock, "status");
                    sinon.spy(resMock, "send");

                    reqMock.query = {
                        org_id: 'org_id',
                        criteria_name: "abc"
                    };

                    reqMock.body = {};
                    criteria_update.validate(reqMock, resMock, function() {});
                    console.log(resMock.status.lastCall.args[0], resMock.send.lastCall.args[0]);
                    assert(resMock.status.lastCall.args[0] === 400, 'Unexpected status code:' + resMock.status.lastCall.args[0]);
                    assert(resMock.send.lastCall.args[0] === 'Post body is missing', 'Unexpected msg:' + resMock.send.lastCall.args[0]);
                    done();
                });

                it('update.validate - with proper name', function(done) {
                    var reqMock = {};
                    var resMock = {};
                    resMock.status = function(code) {
                        return this;
                    };
                    resMock.send = function(msg) {
                        return this;
                    };
                    resMock.end = function() {
                        return this;
                    };
                    sinon.spy(resMock, "status");
                    sinon.spy(resMock, "send");

                    reqMock.query = {
                        org_id: 'org_id'
                    };

                    reqMock.body = {
                        name: 'some-name'
                    };
                    criteria_update.validate(reqMock, resMock, done);
                });
        */
        it('update.execute - with proper body & name', function(done) {
            var reqMock = {};
            var resMock = {};
            resMock.status = function(code) {
                return this;
            };
            resMock.send = function(msg) {
                return this;
            };
            resMock.end = function() {
                return this;
            };
            sinon.spy(resMock, "status");
            sinon.spy(resMock, "send");

            reqMock.query = {
                org_id: 'org_id'
            };
            reqMock.body = {
                name: 'some-name'
            };
            criteria_update.execute(reqMock, resMock);
            done();
        });



        it('delete.validate with empty name', function(done) {
            var reqMock = {};
            var resMock = {};
            resMock.status = function(code) {
                return this;
            };
            resMock.send = function(msg) {
                return this;
            };
            resMock.end = function() {
                return this;
            };
            sinon.spy(resMock, "status");
            sinon.spy(resMock, "send");

            reqMock.query = {
                org_id: 'org_id'
            };

            reqMock.body = {
                name: ''
            };
            criteria_delete.validate(reqMock, resMock, function() {});
            //console.log(resMock.send.lastCall.args[0]);
            assert(resMock.status.lastCall.args[0] === 400, 'Unexpected status code:' + resMock.status.lastCall.args[0]);
            assert(resMock.send.lastCall.args[0] === 'Criteria name is missing in the query', 'Unexpected msg:' + resMock.send.lastCall.args[0]);
            done();
        });

        it('delete.validate with proper name', function(done) {
            var reqMock = {};
            var resMock = {};
            resMock.status = function(code) {
                return this;
            };
            resMock.send = function(msg) {
                return this;
            };
            resMock.end = function() {
                return this;
            };
            sinon.spy(resMock, "status");
            sinon.spy(resMock, "send");

            reqMock.query = {
                org_id: 'org_id',
                criteria_name: 'some-name'
            };

            //reqMock.body = {
            //    name: 'some-name'
            //};
            criteria_delete.validate(reqMock, resMock, done);
        });

        it('delete.convert with name', function(done) {
            var reqMock = {};
            var resMock = {};
            resMock.status = function(code) {
                return this;
            };
            resMock.send = function(msg) {
                return this;
            };
            resMock.end = function() {
                return this;
            };
            sinon.spy(resMock, "status");
            sinon.spy(resMock, "send");

            reqMock.query = {
                org_id: 'org_id'
            };
            reqMock.body = {
                name: 'some-name'
            };
            criteria_delete.convert(reqMock, resMock, done);
        });

        it('delete.execute with name', function(done) {
            var reqMock = {};
            var resMock = {};
            resMock.status = function(code) {
                return this;
            };
            resMock.send = function(msg) {
                return this;
            };
            resMock.end = function() {
                return this;
            };
            sinon.spy(resMock, "status");
            sinon.spy(resMock, "send");

            reqMock.query = {
                org_id: 'org_id'
            };
            reqMock.body = {
                name: 'some-name'
            };
            criteria_delete.execute(reqMock, resMock);
            done();
        });

        /*
                it('read.execute with name', function(done) {
                    var mockdb = {
                        criteriarules: {
                            find: function(arg, callback) {
                                return callback("err", {});
                            }
                        }
                    };

                    //var r3 = criteria.__set__("exports.makeRestCall", mockrequest);
                    var r1 = criteria_read.__set__("db", mockdb);
                    var r2 = criteria_read.__set__("utils", utils);

                    var reqMock = {};
                    var resMock = {};
                    resMock.status = function(code) {
                        return this;
                    };
                    resMock.send = function(msg) {
                        return this;
                    };
                    resMock.end = function() {
                        return this;
                    };
                    sinon.spy(resMock, "status");
                    sinon.spy(resMock, "send");

                    reqMock.query = {
                        org_id: 'org_id'
                    };
                    reqMock.query = {
                        name: 'some-name'
                    };

                    reqMock.body = {
                        name: 'some-name'
                    };
                    criteria_read.execute(reqMock, resMock);
                    console.log(resMock.status.lastCall.args[0], resMock.send.lastCall.args[0]);
                    assert(resMock.status.lastCall.args[0] === 400, 'Unexpected status code:' + resMock.status.lastCall.args[0]);
                    assert(resMock.send.lastCall.args[0] === 'Post body is missing', 'Unexpected msg:' + resMock.send.lastCall.args[0]);
                    done();
                    r1();
                    r2();
                });


                it('read.execute with no name', function(done) {
                    var mockdb = {
                        criteriarules: {
                            find: function(arg, callback) {
                                return callback("err", {});
                            }
                        }
                    };

                    //var r3 = criteria.__set__("exports.makeRestCall", mockrequest);
                    var r1 = criteria_read.__set__("db", mockdb);
                    var r2 = criteria_read.__set__("utils", utils);


                    var reqMock = {};
                    var resMock = {};
                    resMock.status = function(code) {
                        return this;
                    };
                    resMock.send = function(msg) {
                        return this;
                    };
                    resMock.end = function() {
                        return this;
                    };
                    sinon.spy(resMock, "status");
                    sinon.spy(resMock, "send");

                    reqMock.query = {
                        org_id: 'org_id'
                    };

                    reqMock.body = {};
                    reqMock.query = {
                        name: ''
                    };
                    criteria_read.execute(reqMock, resMock, done);
                    r1();
                    r2();
                });


                it('read.validate - just by pass', function(done) {
                    var reqMock = {};
                    var resMock = {};
                    resMock.status = function(code) {
                        return this;
                    };
                    resMock.send = function(msg) {
                        return this;
                    };
                    resMock.end = function() {
                        return this;
                    };
                    sinon.spy(resMock, "status");
                    sinon.spy(resMock, "send");

                    reqMock.query = {
                        org_id: 'org_id'
                    };

                    reqMock.body = {};
                    criteria_read.validate(reqMock, resMock, done);
                });

                it('read.convert', function(done) {
                    var r1 = criteria_read.__set__("convertMap", convertMap);
                    var ObjectId = function(str) {
                        return str;
                    };
                    var ISODate = function(str) {
                        return str;
                    };
                    var reqMock = {};
                    var resMock = {
                        criterias: [{
                            "_id": ObjectId("571fbc93e7f29ffd08fa836e"),
                            "id": 1461697675752,
                            "name": "dale fvt",
                            "stage": "fvt",
                            "supports": [
                                "mocha",
                                "saucelab",
                                "junit"
                            ],
                            "rules": [{
                                "id": 1461697675752,
                                "name": "dale fvt",
                                "type": "fvt",
                                "format": "mocha",
                                "conditions": [{
                                    "eval": "_mochaTestSuccessPercentage",
                                    "op": ">=",
                                    "value": 100,
                                    "forStage": "fvt",
                                    "forTool": "mocha"
                                }, {
                                    "eval": "_hasMochaCriticalTestsPassed()",
                                    "op": "=",
                                    "value": true,
                                    "criticalTests": [],
                                    "forStage": "fvt",
                                    "forTool": "mocha"
                                }, {
                                    "eval": "_hasMochaTestRegressed",
                                    "op": "=",
                                    "value": false,
                                    "forStage": "fvt",
                                    "forTool": "mocha"
                                }]
                            }],
                            "revision": 3,
                            "v3data": {
                                "_id": "",
                                "id": 1461697675752,
                                "name": "dale fvt",
                                "stage": "fvt",
                                "supports": [
                                    "mocha",
                                    "saucelab",
                                    "junit"
                                ],
                                "rules": [{
                                    "id": 1461697675752,
                                    "name": "dale fvt",
                                    "stage": "fvt",
                                    "percentPass": "100",
                                    "regression": true,
                                    "format": "mocha",
                                    "criticalTests": []
                                }],
                                "revision": 3
                            },
                            "created_at": ISODate("2016-04-26T19:08:03.598Z"),
                            "org_id": "a7120277-b641-4023-93e4-06deaca3b3a6",
                            "org_name": "bair@us.ibm.com"
                        }, {
                            "_id": ObjectId("571fd487e8a9ce711624273e"),
                            "id": 1461703807739,
                            "name": "blah",
                            "stage": "fvt",
                            "supports": [
                                "mocha",
                                "saucelab",
                                "junit"
                            ],
                            "rules": [{
                                "id": 1461703807739,
                                "name": "blah",
                                "type": "fvt",
                                "format": "mocha",
                                "conditions": [{
                                    "eval": "_mochaTestSuccessPercentage",
                                    "op": ">=",
                                    "value": 100,
                                    "forStage": "fvt",
                                    "forTool": "mocha"
                                }, {
                                    "eval": "_hasMochaCriticalTestsPassed()",
                                    "op": "=",
                                    "value": true,
                                    "criticalTests": [],
                                    "forStage": "fvt",
                                    "forTool": "mocha"
                                }, {
                                    "eval": "_hasMochaTestRegressed",
                                    "op": "=",
                                    "value": false,
                                    "forStage": "fvt",
                                    "forTool": "mocha"
                                }]
                            }],
                            "revision": 3,
                            "v3data": {
                                "_id": "",
                                "id": 1461703807739,
                                "name": "blah",
                                "stage": "fvt",
                                "supports": [
                                    "mocha",
                                    "saucelab",
                                    "junit"
                                ],
                                "rules": [{
                                    "id": 1461703807739,
                                    "name": "blah",
                                    "stage": "fvt",
                                    "percentPass": "100",
                                    "regression": true,
                                    "format": "mocha",
                                    "criticalTests": []
                                }],
                                "revision": 3
                            },
                            "created_at": ISODate("2016-04-26T20:50:15.461Z"),
                            "org_id": "a7120277-b641-4023-93e4-06deaca3b3a6",
                            "org_name": "bair@us.ibm.com"
                        }]
                    };
                    resMock.status = function(code) {
                        return this;
                    };
                    resMock.send = function(msg) {
                        return this;
                    };
                    resMock.end = function() {
                        return this;
                    };
                    sinon.spy(resMock, "status");
                    sinon.spy(resMock, "send");

                    reqMock.query = {
                        org_id: 'org_id'
                    };

                    reqMock.body = {};
                    criteria_read.convert(reqMock, resMock);
                    assert(resMock.status.lastCall.args[0] === 200, 'Unexpected status code:' + resMock.status.lastCall.args[0]);
                    done();

                });
        */
    });

}());
