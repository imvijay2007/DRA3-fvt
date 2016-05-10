(function() {

    'use strict';

    var requireHelper = require('./requireHelper');
    var criteria = requireHelper.require('tests/coverage/instrumented/routes/criteria.js');
    var assert = require('chai').assert;
    var sinon = require('sinon');

    var testutils = require('./testutils');
    var acriteriamocha = testutils.getTestFile("acriteriamocha.json");

    // create mock request and response
    var reqMock = {};

    var resMock = {};
    resMock.status = function() {
        return this;
        /*
        return {
            json: function() {},
            send: function() {}
        };
        */
    };
    resMock.send = function() {
        return this;
    };
    resMock.end = function() {
        return this;
    };
    sinon.spy(resMock, "status");
    sinon.spy(resMock, "send");

    describe('criteria api', function() {
        it('getCriteria', function() {
            reqMock.query = {
                criteria_name: 'abc',
                org_id: 'org_id'
            };

            var mockrulesdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [acriteriamocha]);
                    }
                }
            };
            var revertdb1 = criteria.__set__("db", mockrulesdb);

            criteria.getCriteria(reqMock, resMock);
            assert(resMock.status.lastCall.calledWith(200), 'Unexpected status code:' + resMock.status.lastCall.args);
        });
        it('getCriteria (with no query params)', function() {
            reqMock.query = {};

            var mockrulesdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, []);
                    }
                }
            };
            var revertdb1 = criteria.__set__("db", mockrulesdb);

            criteria.getCriteria(reqMock, resMock);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
        });
        it('getAllCriterias', function() {
            reqMock.query = {
                org_id: 'org_id'
            };

            var aCriteria = {
                name: 'aCriteria',
                rules: [{
                    _advisory_: true,
                    eventType: {
                        op: '=',
                        value: "buildComplete"
                    }
                }, ]
            };
            var mockrulesdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    }
                }
            };
            var revertdb1 = criteria.__set__("db", mockrulesdb);

            criteria.getAllCriterias(reqMock, resMock);
            assert(resMock.status.lastCall.calledWith(200), 'Unexpected status code:' + resMock.status.lastCall.args);
        });
        it('deleteCriteria', function() {
            reqMock.query = {
                criteria_name: 'abc',
                org_id: 'org_id'
            };

            var aCriteria = {
                name: 'defaultCriteria',
                rules: [{
                    name: 'rule1',
                    mode: 'advisory',
                    conditions: [{
                        eval: 'eventType',
                        op: '=',
                        value: "_buildinitiated"
                    }]
                }]
            };
            var mockrulesdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    },
                    remove: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    }
                }
            };
            var revertdb1 = criteria.__set__("db", mockrulesdb);

            criteria.deleteCriteria(reqMock, resMock);
            assert(resMock.status.lastCall.calledWith(200), 'Unexpected status code:' + resMock.status.lastCall.args);
        });
        it('addCriteria - criteria already exists', function() {
            reqMock.query = {
                org_id: 'org_id'
            };

            var aCriteria = {
                name: 'defaultCriteria',
                rules: [{
                    name: 'rule1',
                    mode: 'advisory',
                    conditions: [{
                        eval: 'eventType',
                        op: '=',
                        value: "_buildinitiated"
                    }]
                }]
            };

            reqMock.body = aCriteria;

            var mockrulesdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    },
                    remove: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    },
                    save: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    }
                }
            };
            var revertdb1 = criteria.__set__("db", mockrulesdb);

            criteria.addCriteria(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].msg === 'criteria name:defaultCriteria already exists in database', 'Unexpected status code:' + resMock.send.lastCall.args[0].msg);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
        });
        it('addCriteria - Invalid criteria', function() {
            reqMock.query = {
                org_id: 'org_id'
            };

            var aCriteria = {
                name: 'defaultCriteria',
                rules: [{
                    name: 'rule1',
                    mode: 'advisory',
                    conditions: [{
                        eval: 'eventType',
                        op: '=',
                        value: "_buildinitiated"
                    }]
                }]
            };

            var fCriteria = {
                name: 'dCriteria',
                rules: [{
                    name: 'rule1',
                    mode: 'advisory',
                    conditions: [{
                        eval: 'eventType',
                        op: '=',
                        value: "_buildinitiated"
                    }]
                }]
            };

            reqMock.body = aCriteria;

            var mockrulesdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [fCriteria]);
                    },
                    remove: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    },
                    save: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    }
                }
            };
            var revertdb1 = criteria.__set__("db", mockrulesdb);

            criteria.addCriteria(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].msg === 'Criteria validation failed: forTool not specified in the conditions', 'Unexpected status code:' + resMock.send.lastCall.args[0].msg);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
        });
        it('addCriteria - valid criteria', function() {
            reqMock.query = {
                org_id: 'org_id'
            };

            var aCriteria = {
                name: 'defaultCriteria',
                rules: [{
                    name: 'rule1',
                    mode: 'advisory',
                    conditions: [{
                        eval: 'eventType',
                        op: '=',
                        value: "_buildinitiated",
                        forTool: "abc",
                        forStage: "dec"
                    }]
                }]
            };

            var fCriteria = {
                name: 'dCriteria',
                rules: [{
                    name: 'rule1',
                    mode: 'advisory',
                    conditions: [{
                        eval: 'eventType',
                        op: '=',
                        value: "_buildinitiated"
                    }]
                }]
            };

            reqMock.body = aCriteria;

            var mockrulesdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [fCriteria]);
                    },
                    remove: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    },
                    save: function(arg, callback) {
                        return callback(null, aCriteria);
                    }
                }
            };
            var revertdb1 = criteria.__set__("db", mockrulesdb);

            criteria.addCriteria(reqMock, resMock);
            //console.log(resMock.send.lastCall.args, resMock.status.lastCall.args);
            assert(resMock.send.lastCall.args[0].msg === 'Successfully added criteria: defaultCriteria to the database', 'Unexpected status code:' + resMock.send.lastCall.args[0].msg);
            assert(resMock.status.lastCall.calledWith(201), 'Unexpected status code:' + resMock.status.lastCall.args);
        });
        it('addCriteria - empty body', function() {
            reqMock.body = null;

            var aCriteria = {
                name: 'defaultCriteria',
                rules: [{
                    name: 'rule1',
                    mode: 'advisory',
                    conditions: [{
                        eval: 'eventType',
                        op: '=',
                        value: "_buildinitiated"
                    }]
                }]
            };
            var mockrulesdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    },
                    remove: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    },
                    save: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    }
                }
            };
            var revertdb1 = criteria.__set__("db", mockrulesdb);

            criteria.addCriteria(reqMock, resMock);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
        });
        it('addCriteria - error while looking for criteria', function() {
            reqMock.body = {
                name: 'abc'
            };

            var aCriteria = {
                name: 'defaultCriteria',
                rules: [{
                    name: 'rule1',
                    mode: 'advisory',
                    conditions: [{
                        eval: 'eventType',
                        op: '=',
                        value: "_buildinitiated"
                    }]
                }]
            };
            var mockrulesdb = {
                criteriarules: {
                    find: function(arg, callback) {
                        return callback("err", null);
                    },
                    remove: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    },
                    save: function(arg, callback) {
                        return callback(null, [aCriteria]);
                    }
                }
            };
            var revertdb1 = criteria.__set__("db", mockrulesdb);

            criteria.addCriteria(reqMock, resMock);
            assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
        });
    });
}());
