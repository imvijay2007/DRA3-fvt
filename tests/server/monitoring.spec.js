(function() {

    'use strict';

    var requireHelper = require('./requireHelper');
    var monitoring = requireHelper.require('tests/coverage/instrumented/routes/monitoring.js');
    var assert = require('chai').assert;

    // create mock request and response
    var reqMock = {};
    var resMock = {
        'statusCode': 0,
        'jsonStr': ''
    };
    var regMock = {};


    describe('Monitoring', function() {
        it('version - BuildVersion env not set', function(done) {
            //process.env.BUILD_VERSION = "ver1";

            resMock.status = function(code) {
                this.statusCode = 200;
                return this;
            };
            resMock.json = function(val) {
                this.jsonStr = val;
                return this;
            };
            monitoring.getVersion(reqMock, resMock);
            assert(resMock.statusCode === 200, 'Unexpected status code:' + resMock.statusCode);
            assert(resMock.jsonStr.build === "N/A", 'Unexpected Json:' + resMock.jsonStr.build);
            done();
        });

        it('version - BuildVersion env set', function(done) {
            process.env.BUILD_VERSION = "ver1";

            resMock.status = function(code) {
                this.statusCode = 200;
                return this;
            };
            resMock.json = function(val) {
                this.jsonStr = val;
                return this;
            };
            monitoring.getVersion(reqMock, resMock);
            assert(resMock.statusCode === 200, 'Unexpected status code:' + resMock.statusCode);
            assert(resMock.jsonStr.build === "ver1", 'Unexpected Json:' + resMock.jsonStr.build);
            done();
        });

        it('status - bad', function(done) {
            resMock.status = function(code) {
                this.statusCode = 200;
                return this;
            };
            resMock.json = function(val) {
                this.jsonStr = val;
                return this;
            };
            var mockeventsdb = {
                events: {
                    find: function(arg, callback) {
                        return callback("err", []);
                    }
                }
            };
            var revertdb1 = monitoring.__set__("db", mockeventsdb);

            monitoring.__set__("register", regMock);
            monitoring.getStatus(reqMock, resMock);
            assert(resMock.statusCode === 200, 'Unexpected status code:' + resMock.statusCode);
            assert(resMock.jsonStr.statusCode === 500, 'Unexpected response code:' + resMock.jsonStr.statusCode);
            assert(resMock.jsonStr.status === 'ERROR', 'Unexpected response status:' + resMock.jsonStr.status);
            done();
        });

        it('status - good', function(done) {
            resMock.status = function(code) {
                this.statusCode = 200;
                return this;
            };
            resMock.json = function(val) {
                this.jsonStr = val;
                return this;
            };
            var mockeventsdb = {
                events: {
                    find: function(arg, callback) {
                        return callback(null, [{}, {}]);
                    }
                }
            };
            var revertdb1 = monitoring.__set__("db", mockeventsdb);

            monitoring.__set__("register", regMock);
            monitoring.getStatus(reqMock, resMock);
            assert(resMock.statusCode === 200, 'Unexpected status code:' + resMock.statusCode);
            assert(resMock.jsonStr.statusCode === 200, 'Unexpected response code:' + resMock.jsonStr.statusCode);
            assert(resMock.jsonStr.status === 'OK', 'Unexpected response status:' + resMock.jsonStr.status);
            done();
        });
    });
}());
