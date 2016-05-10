//global.draConfig = {};
(function() {

    'use strict';

    var requireHelper = require('./requireHelper');
    var utils = requireHelper.require('tests/coverage/instrumented/routes/utils.js');
    //var mdb = requireHelper.require('tests/coverage/instrumented/dataprovider/mongodb.js');
    var assert = require('chai').assert;
    //var sinon = require('sinon');

    var testutils = require('./testutils');
    var mochadocs = testutils.getTestFile("mochaResult.json");
    var mochaencodeddocs = testutils.getTestFile("mochaEncodedResult.json");

    var content = new Buffer('{"first": "This is the first"}').toString('base64');
    /*
        var mockevents = [{
            _id: 12345,
            pipelineRunId: "a_b_123",
            timestamp: "2015-09-24T14:59:15.053Z",
            eventType: "dummyEvent",
            file: "abc.json",
            filetype: ".json",
            filecontents: content
        }, {
            _id: 12346,
            pipelineRunId: "a_b_123",
            timestamp: "2015-09-24T14:59:16.053Z",
            eventType: "dummyEvent",
            file: "abc.json",
            filetype: ".json",
            filecontents: content
        }, {
            _id: 12347,
            pipelineRunId: "a_b_123",
            timestamp: "2015-09-24T14:59:17.053Z",
            eventType: "dummyEvent",
            file: "abc.json",
            filetype: ".json",
            filecontents: content
        }, {
            _id: 12348,
            pipelineRunId: "a_b_123",
            timestamp: "2015-09-24T14:59:18.053Z",
            eventType: "dummyEvent",
            comment: "An event without filecontent"
        }];

        var mockbadevents = [{
            _id: 12345,
            pipelineRunId: "a_b_129",
            timestamp: "2015-09-24T14:59:19.053Z",
            eventType: "dummyEvent",
            file: "abcde.json",
            filetype: ".json",
            filecontents: "sdfsdfsdfsdf"
        }, {
            _id: 12347,
            pipelineRunId: "a_b_123",
            timestamp: "2015-09-24T14:59:17.053Z",
            eventType: "dummyEvent",
            file: "abc.json",
            filetype: ".json",
            filecontents: content
        }, {
            _id: 12348,
            pipelineRunId: "a_b_123",
            timestamp: "2015-09-24T14:59:18.053Z",
            eventType: "dummyEvent",
            comment: "An event without filecontent"
        }];

        var mocknofilecontentevents = [{
            _id: 12360,
            pipelineRunId: "a_b_123",
            timestamp: "2015-09-24T14:59:18.053Z",
            eventType: "dummyEvent",
            comment: "An event without filecontent"
        }];

        var mockprojects = [{
            projectName: "dummy | test",
            projectkey: "7735eb98-d0f2-47f7-b8b5-93d4307731cd",
            created: 1449785702073,
            toolchainid: "1db7e8ce-4f4c-4cd7-9454-cb4eb53f6639",
            updated: 1452109986288,
            organization_guid: "427cc56e-2bdc-426b-a0b7-072cdd714e3e",
            _id: "568d70a245c5969c0cb62b64"
        }];

        // mock project without orgid
        var mockprojectswoorg = [{
            projectName: "dummy | test",
            projectkey: "7735eb98-d0f2-47f7-b8b5-93d4307731cd",
            created: 1449785702073,
            toolchainid: "1db7e8ce-4f4c-4cd7-9454-cb4eb53f6639",
            updated: 1452109986288,
            _id: "568d70a245c5969c0cb62b64"
        }];


        var mockeventsdb = {
            events: {
                find: function(arg, callback) {
                    return callback(null, mockevents);
                }
            }
        };
        var mockbadeventsdb = {
            events: {
                find: function(arg, callback) {
                    return callback(null, mockbadevents);
                }
            }
        };
        var mockzeroeventsdb = {
            events: {
                find: function(arg, callback) {
                    return callback(null, []);
                }
            }
        };
        var mocknofilecontenteventsdb = {
            events: {
                find: function(arg, callback) {
                    return callback(null, mocknofilecontentevents);
                }
            }
        };
        var mockeventserrordb = {
            events: {
                find: function(arg, callback) {
                    return callback("Error Occured", null);
                }
            }
        };
    */

    describe('Utils', function() {

        it('findOneEvent - DLMSSERVER env variable not defined', function(done) {
            //delete global.DLMS_SERVER;
            delete global.draConfig.dlms_server;
            utils.findOneEvent('Bearer somehex', {
                org_id: "oneorg",
                build_id: "onebuild"
            }, function(err, doc) {
                //console.log(err, doc);
                assert(err === "Value for dlms_server is not defined", "Should have received the error");
                assert(doc === null, "Should have received a null");
                done();
            });
        });

        it('findOneEvent - one response, DLMS_SERVER with slash', function(done) {
            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochaencodeddocs);
            };

            var r1 = utils.__set__("exports.makeRestCall", mockreq);
            global.draConfig.dlms_server = "http://dradummy.com/";
            utils.findOneEvent('Bearer somehex', {
                org_id: "oneorg",
                build_id: "onebuild"
            }, function(err, doc) {
                //console.log(err, doc);
                assert(err === null, "Should not have received the error");
                assert(doc !== null, "Should have received a body");
                done();
            });
            r1();
        });

        it('findOneEvent - one response, DLMS_SERVER without slash', function(done) {
            var mockreq = function makeRestCall(method, url, headers, res, callback) {
                return callback(null, {
                    statusCode: 200
                }, mochaencodeddocs);
            };

            var r1 = utils.__set__("exports.makeRestCall", mockreq);
            global.draConfig.dlms_server = "http://dradummy.com";
            utils.findOneEvent('Bearer somehex', {
                org_id: "oneorg",
                build_id: "onebuild"
            }, function(err, doc) {
                //console.log(err, doc);
                assert(err === null, "Should not have received the error");
                assert(doc !== null, "Should have received a body");
                done();
            });
            r1();
        });
        /*
                it('findEvents', function(done) {
                    var revertdb1 = utils.__set__("db", mockeventsdb);
                    utils.findEvents("somequery", function(err, doc) {
                        //console.log(JSON.stringify(doc, null, 4));
                        assert(err === null, "Should not have received the error");
                        assert(doc.length === 4, "Invalid number of documents received");
                        assert(doc[2].filecontents.first === "This is the first", "File contents not decoded correctly");
                        done();
                    });
                });

                it('findEvents - with one event having invalid encoded filecontent', function(done) {
                    var revertdb1 = utils.__set__("db", mockbadeventsdb);
                    utils.findEvents("somequery", function(err, doc) {
                        assert(err === null, "Should not have received the error");
                        assert(doc.length === 2, "Invalid number of documents received");
                        done();
                    });
                });

                // technically it should return an array with only one event in it
                it('findEvents - querying with id', function(done) {
                    var revertdb1 = utils.__set__("db", mockeventsdb);
                    utils.findEvents({
                        _id: "5638d1903ae3ce1d00d7ff8c"
                    }, function(err, doc) {
                        assert(err === null, "Should not have received the error");
                        assert(doc.length > 1, "should received one document");
                        done();
                    });
                });

                it('findOneEvent', function(done) {
                    var revertdb1 = utils.__set__("db", mockeventsdb);
                    utils.findOneEvent("somequery", function(err, doc) {
                        assert(err === null, "Should not have received the error");
                        assert(Array.isArray(doc) === false, "Should not have received an array");
                        assert(doc.filecontents.first === "This is the first", "File contents not decoded correctly");
                        done();
                    });
                });

                it('findOneEvent - with one event having invalid encoded filecontent', function(done) {
                    var revertdb1 = utils.__set__("db", mockbadeventsdb);
                    utils.findOneEvent("somequery", function(err, doc) {
                        //console.log(JSON.stringify(doc, null, 4));
                        assert(err === null, "Should not have received the error");
                        assert(Array.isArray(doc) === false, "Should not have received an array");
                        assert(typeof(doc.filecontents) !== 'undefined', "The file content should have be available");
                        assert(doc._id === 12347, "Invalid document returned");
                        done();
                    });
                });

                it('findOneEvent - no events returned from the database', function(done) {
                    var revertdb1 = utils.__set__("db", mockzeroeventsdb);
                    utils.findOneEvent("somequery", function(err, doc) {
                        //console.log(JSON.stringify(doc, null, 4));
                        assert(err !== null, "Should have received the error");
                        assert(err === "Document not found", "Invalid error response");
                        done();
                    });
                });

                it('findOneEvent - no file content events', function(done) {
                    var revertdb1 = utils.__set__("db", mocknofilecontenteventsdb);
                    utils.findOneEvent("somequery", function(err, doc) {
                        //console.log(JSON.stringify(doc, null, 4));
                        assert(err === null, "Should not have received the error");
                        assert(Array.isArray(doc) === false, "Invalid number of documents received");
                        assert(doc._id === 12360, "Invalid document returned");
                        done();
                    });
                });

                it('findOneEvent - error returned', function(done) {
                    var revertdb1 = utils.__set__("db", mockeventserrordb);
                    utils.findOneEvent("somequery", function(err, doc) {
                        //console.log(JSON.stringify(doc, null, 4));
                        assert(err !== null, "Should not have received the error");
                        assert(err === "Error Occured", "Should have received an error");
                        done();
                    });
                });

                it('database - passing null replicaSet', function(done) {
                    global.MONGODB_REPLICASET = null;
                    requireHelper.require('dataprovider/mongodb.js').getCollections();
                    done();
                });

                it('database - passing valid replicaSet', function(done) {
                    delete global.MONGODB_REPLICASET;
                    requireHelper.require('dataprovider/mongodb.js').getCollections();
                    done();
                });

                it('checkCondition - Invalid operation', function(done) {
                    assert(utils.checkCondition("a", "<>", "b") === false, "Invalid operation should have returned false");
                    assert(utils.checkCondition("a", "=", "b") === false, "a = b should fail");
                    assert(utils.checkCondition("first", "pattern", "first|second") === true, "[first|second] should pass");
                    assert(utils.checkCondition("second", "pattern", "first|second") === true, "[first|second] should pass");
                    assert(utils.checkCondition("third", "pattern", "first|second") === false, "[first|second] should fail");
                    done();
                });

                it('dataprovider - getUrl', function(done) {
                    assert(mdb.getUri().substring(0, 7) === "mongodb", "Invalid url returned");
                    done();
                });

                it('makeRestCall - success', function(done) {
                    var resp = {};
                    resp.statusCode = 200;
                    var body = {
                        name: "ucparule",
                        status: "active"
                    };
                    var mockrequest = function(arg, callback) {
                        return callback(null, resp, body);
                    };

                    var revert2 = utils.__set__("request", mockrequest);

                    utils.makeRestCall("GET", "http://www.ibm.com", null, null, function(err, resp, body) {
                        assert(resp.statusCode, 200, "Incorrect status code");
                        assert(body.name, "ucparule", "Incorrect name");
                        done();
                    });
                });

                it('makeRestCall - fail', function(done) {
                    var resp = {};
                    resp.statusCode = 400;
                    var body = {
                        name: "ucparule",
                        status: "active"
                    };
                    var mockrequest = function(arg, callback) {
                        return callback("err", resp, null);
                    };

                    var revert2 = utils.__set__("request", mockrequest);

                    utils.makeRestCall("GET", "http://www.ibm.com", null, null, function(err, resp, body) {
                        assert(resp.statusCode, 400, "Incorrect status code");
                        assert(err, "err", "Incorrect error");
                        done();
                    });

                    revert2();
                });

                it('getProfile - success', function(done) {
                    var resp = {};
                    resp.statusCode = 200;
                    var body = {
                        name: "Austin",
                        status: "active"
                    };
                    var mockrequest = function(arg, callback) {
                        return callback(null, resp, body);
                    };

                    var revert2 = utils.__set__("request", mockrequest);

                    utils.getProfile("accesstoken", "http://www.ibm.com", function(err, data) {
                        assert(data.name, "Austin", "Incorrect response");
                        assert(err === null, true, "Incorrect error");
                        done();
                    });

                    revert2();
                });

                it('getProfile - failure1', function(done) {
                    var resp = {};
                    resp.statusCode = 400;
                    var body = {
                        name: "Austin",
                        status: "active"
                    };
                    var mockrequest = function(arg, callback) {
                        return callback(null, resp, body);
                    };

                    var revert2 = utils.__set__("request", mockrequest);

                    utils.getProfile("accesstoken", "http://www.ibm.com", function(err, data) {
                        assert(data === false, true, "Incorrect respose");
                        assert(err === null, true, "Incorrect error");
                        done();
                    });

                    revert2();
                });

                it('getProfile - failure2', function(done) {
                    var resp = {};
                    resp.statusCode = 200;
                    var body = {
                        name: "Austin",
                        status: "active"
                    };
                    var mockrequest = function(arg, callback) {
                        return callback("err", resp, null);
                    };

                    var revert2 = utils.__set__("request", mockrequest);

                    utils.getProfile("accesstoken", "http://www.ibm.com", function(err, data) {
                        assert(data === false, true, "Incorrect respose");
                        assert(err === null, true, "Incorrect error");
                        done();
                    });

                    revert2();
                });
        */
    });
}());
