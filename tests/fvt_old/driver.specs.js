//assert = require('assert');
var assert = require('chai').assert;
var grunt = require('grunt');
var fs = require('fs');
var path = require('path');
var REQUEST = require('request');
var test = require('./readfilelist.js');
var _ = require('lodash');

var request = REQUEST.defaults({
    strictSSL: true
});
var pkey = '';
var assert_response = 0;
var assert_result = '';
var actual_decision;
// store original values
var temp_IDS_PROJECT_NAME = process.env.IDS_PROJECT_NAME;
var temp_PIPELINE_STAGE_INPUT_REV = process.env.PIPELINE_STAGE_INPUT_REV;
var temp_DRA_PROJECT_KEY = process.env.DRA_PROJECT_KEY;
var temp_DRA_SERVER = process.env.DRA_SERVER;
//console.log("cached value: ",temp_IDS_PROJECT_NAME);
//console.log("cached value: ",temp_PIPELINE_STAGE_INPUT_REV);
//console.log("cached value: ",temp_DRA_PROJECT_KEY);
//console.log("cached value: ",temp_DRA_SERVER);
// store original values

var fvtUrl;
var master_test_name = [];
var master_test_list = [];

var whole_bunch = test.readmaster();
//console.log(whole_bunch);

for (var m = 0; m < whole_bunch.length; m++) {
    master_test_name.push(whole_bunch[m].testname);
    master_test_list.push(whole_bunch[m].tests);
}
//console.log("Test Names: ", master_test_name);
//console.log("Test List: ", master_test_list);


//var master_test_list = [
//['fvt-test1.json', 'fvt-test4.json']
//];
var tests;
var l = 0;
//var tests = test.readfiles();
//console.log("Tests: ",tests);


master_test_list.forEach(function(item) {
    tests = item;

    describe('FVT - ' + master_test_name[l++], function() {
        var i = 1;
        tests.forEach(function(item) {

            describe('FVT #' + String(i++), function() {

                it("register project", function(done) {
                    this.timeout(20000);
                    var j = readfile(item);
                    var server = j.server;
                    var savedata = {};
                    savedata.projectName = j.projectName;
                    // Register
                    registerproject(server, savedata, function() {
                        assert.equal(assert_response, 200);
                        //console.log('Registration complete');
                        done();
                    });
                    // Register
                });
                it("remove criteria", function(done) {
                    this.timeout(20000);
                    var j = readfile(item);
                    var server = j.server;
                    var savedata = {};
                    var x1 = item.replace(".json", "");
                    var x = '/' + x1 + '/' + j.criteria;
                    var savedata1 = readfile(x);
                    savedata.name = savedata1.name;
                    // Remove
                    removecriteria(server, savedata, function() {
                        assert.equal(assert_response, 200);
                        //console.log('Removed criteria');
                        done();
                    });
                    // Remove
                });
                it("remove events", function(done) {
                    this.timeout(20000);
                    var j = readfile(item);
                    var server = j.server;
                    var savedata = {};
                    savedata.projectName = j.projectName;
                    savedata.pipelineRunId = (j.projectName).replace(" | ", "_") + '_' + j.PIPELINE_STAGE_INPUT_REV;
                    //console.log("Savedata:",savedata);
                    // Remove
                    removeevents(server, savedata, function() {
                        assert.equal(assert_response, 200);
                        //console.log('Removed events');
                        done();
                    });
                    // Remove
                });
                it("post criteria", function(done) {
                    this.timeout(20000);
                    var j = readfile(item);
                    var server = j.server;
                    var x1 = item.replace(".json", "");
                    var x = '/' + x1 + '/' + j.criteria;
                    var savedata = readfile(x);
                    // Postcriteria
                    postcriteria(server, savedata, function() {
                        assert.equal(assert_response, 200);
                        //console.log('Criteria post complete');
                        done();
                    });
                    // Postcriteria
                });
                it("initiate project", function(done) {
                    this.timeout(20000);
                    var j = readfile(item);
                    var server = j.server;
                    var savedata = {};
                    savedata.projectName = j.projectName;
                    savedata.PIPELINE_STAGE_INPUT_REV = j.PIPELINE_STAGE_INPUT_REV;
                    // Initiate
                    initiateproject(server, savedata, function() {
                        //var expect1 = 'missing';
                        //var expect2 = 'Failed';
                        //var expect3 = 'Fatal';
                        //assert.equal(assert_result.indexOf(expect1.toString()), -1);
                        //assert.equal(assert_result.indexOf(expect2.toString()), -1);
                        //assert.equal(assert_result.indexOf(expect3.toString()), -1);
                        //console.log('Project initiated');
                        done();
                    });
                    // Initiate
                });
                it("send events", function(done) {
                    this.timeout(20000);
                    var j = readfile(item);
                    var server = j.server;
                    var eve = j.events;
                    var path = item.replace(".json", "");
                    var elen = 0;
                    // Sendstuff
                    sendevents(eve, path, server, function() {
                        elen++;
                        //console.log("Events length:",elen);
                        var expect1 = 'successfully';
                        assert.notEqual(assert_result.indexOf(expect1.toString()), -1);
                        if (elen === eve.length) {
                            //console.log('Events sent');
                            done();
                        }
                    });
                    // Sendstuff
                });
                it("request decision", function(done) {
                    this.timeout(20000);
                    var j = readfile(item);
                    var server = j.server;
                    var x1 = item.replace(".json", "");
                    var x = '/' + x1 + '/' + j.decisionfile;
                    var y = '/' + x1 + '/' + j.criteria;
                    var expected_decision = readfile(x);
                    var criteria_decision = readfile(y);
                    //console.log("Expected decision from file: ",expected_decision);
                    var savedata = {};
                    savedata.decision = criteria_decision.name;
                    savedata.projectName = j.projectName;
                    savedata.criteriaName = criteria_decision.name;
                    // Decision
                    requestdecision(server, savedata, function() {
                        getdecisionfromapi(server, savedata, function() {
                            fvtUrl = assert_result.match(/http\S+/g)[0];
                            var final_expected_decision = removefields(expected_decision);
                            var final_actual_decision = removefields(actual_decision);
                            //console.log("Final expected decision: ",JSON.stringify(final_expected_decision));
                            //console.log("Final actual decision: ",JSON.stringify(final_actual_decision));
                            var w = compare(final_expected_decision, final_actual_decision);
                            assert.equal(w, true);
                            restoreenvironment();
                            //console.log('Decision received');
                            done();
                        });

                    });
                    // Decision
                });

                it("remove project", function(done) {
                    this.timeout(20000);
                    var j = readfile(item);
                    var server = j.server;
                    var savedata = {};
                    savedata.projectName = j.projectName;
                    // Remove
                    removeproject(server, savedata, function() {
                        assert.equal(assert_response, 200);
                        //console.log('Removed project');
                        done();
                    });
                    // Remove
                });
            });
        });

    });

});


function readfile(file) {
    var contents = fs.readFileSync(getFilename(file), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON;
}

function restoreenvironment() {
    // store original values
    process.env.IDS_PROJECT_NAME = temp_IDS_PROJECT_NAME;
    process.env.PIPELINE_STAGE_INPUT_REV = temp_PIPELINE_STAGE_INPUT_REV;
    process.env.DRA_PROJECT_KEY = temp_DRA_PROJECT_KEY;
    process.env.DRA_SERVER = temp_DRA_SERVER;
    // store original values
    //console.log("Restored value: ",process.env.IDS_PROJECT_NAME);
    //console.log("Restored value: ",process.env.PIPELINE_STAGE_INPUT_REV);
    //console.log("Restored value: ",process.env.DRA_PROJECT_KEY);
    //console.log("Restored value: ",process.env.DRA_SERVER);
}

function getFilename(filename) {
    var file = path.join(__dirname, filename);
    return file;
}

function registerproject(server, savedata, callback) {
    //console.log("server:",server);console.log("project:",savedata);
    request({
        method: 'POST',
        url: server + '/api/v1/project',
        json: true,
        body: savedata,
    }, function(err, resp, body) {
        if (err) {
            console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } else {
            if (resp.statusCode === 200) {
                assert_response = resp.statusCode;
                pkey = body.projectkey;
                //console.log(pkey);
            } else {
                //console.log("Register process failed ", body);
                assert_response = 1; // Just to flag the response anything else than success (200)
            }
        }
        callback();
    });
}

function postcriteria(server, savecriteria, callback) {
    //console.log("server:",server);console.log("project:",savecriteria);
    request({
        method: 'POST',
        url: server + '/api/v1/criteria',
        json: true,
        body: savecriteria,
        headers: {
            projectKey: pkey
        }
    }, function(err, resp, body) {
        if (err) {
            //console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } else {
            if (resp.statusCode === 200) {
                assert_response = resp.statusCode;
                //console.log("Criteria posted!");
            } else {
                //console.log("Criteria post failed ", body);
                assert_response = 1; // Just to flag the response anything else than success (200)
            }
        }
        callback();
    });
}

function getdecisionfromapi(server, savedata, callback) {
    //console.log("server:",server);console.log("project:",savedata);
    request({
        method: 'GET',
        url: server + '/api/v1/latestEvent?projectName=' + savedata.projectName + '&criteriaName=' + savedata.criteriaName,
        json: true,
        headers: {
            projectKey: pkey
        }
    }, function(err, resp, body) {
        if (err) {
            //console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } else {
            if (resp.statusCode === 200) {
                actual_decision = body;
                //console.log("Actual decision from API: ",body);
            } else {
                //console.log("Criteria post failed ", body);
                assert_response = 1; // Just to flag the response anything else than success (200)
            }
        }
        callback();
    });
}

function initiateproject(server, savedata, callback) {
    //console.log("server:",server);
    process.env.IDS_PROJECT_NAME = savedata.projectName;
    process.env.PIPELINE_STAGE_INPUT_REV = savedata.PIPELINE_STAGE_INPUT_REV;
    process.env.DRA_PROJECT_KEY = pkey;
    process.env.DRA_SERVER = server;

    // console.log("Test value: ",process.env.IDS_PROJECT_NAME);
    // console.log("Test value: ",process.env.PIPELINE_STAGE_INPUT_REV);
    // console.log("Test value: ",process.env.DRA_PROJECT_KEY);
    // console.log("Test value: ",process.env.DRA_SERVER);


    //this.timeout(5000);
    //var arg2 = '-init=' + pkey;
    //var arg3 = '-deployAnalyticsServer=' + server;
    //grunt.util.spawn({
    //cmd: 'grunt',
    //grunt: true,
    //args: ['--gruntfile=node_modules/grunt-idra/idra.js', arg2]
    //}, function(err, result) {
    //console.log(result.toString());
    //assert_result = result.stdout.toString();
    //console.log("Assert_Result before callback(with stdout):",assert_result);
    callback();
    //});
}

function sendevents(events, path, server, callback) {
    //console.log("server:",server);console.log("Events:",events);console.log("Path:",path);

    for (var i = 0; i < events.length; i++) {
        //this.timeout(5000);
        //console.log("Iteration:",i);
        //console.log("Type:",events[i].type);
        //console.log("File:",events[i].file);
        var arg2 = '-eventType=' + events[i].type;
        var arg3 = '-file=tests/fvt/' + path + '/' + events[i].file;
        var arg4 = '-deployAnalyticsServer=' + server;
        //console.log("Arg2:",arg2);
        grunt.util.spawn({
            cmd: 'grunt',
            grunt: true,
            args: ['--gruntfile=node_modules/grunt-idra/idra.js', arg2, arg3, arg4]
        }, function(err, result) {
            //console.log(result.toString());
            var expect1 = 'Failed';
            var expect2 = 'Fatal';
            assert_result = result.stdout.toString();
            callback();
        });
    }
}

function requestdecision(server, savedata, callback) {
    //console.log("server:",server);console.log("savedata:",savedata);
    //this.timeout(5000);
    var arg2 = '-decision=' + savedata.decision;
    var arg3 = '-deployAnalyticsServer=' + server;
    grunt.util.spawn({
        cmd: 'grunt',
        grunt: true,
        args: ['--gruntfile=node_modules/grunt-idra/idra.js', arg2, arg3]
    }, function(err, result) {
        //console.log(result.toString());
        assert_result = result.stdout.toString();
        //console.log("Assert_Result before callback(with stdout):",assert_result);
        callback();
    });
}

function removeevents(server, savedata, callback) {
    //console.log("server:",server);console.log("project:",savedata);
    request({
        method: 'DELETE',
        url: server + '/api/v1/event?pipelineRunId=' + savedata.pipelineRunId,
        json: true,
        headers: {
            projectKey: pkey
        }
    }, function(err, resp, body) {
        if (err) {
            console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } else {
            if (resp.statusCode === 200) {
                assert_response = resp.statusCode;
                //pkey = body.projectkey;
                //console.log(pkey);
            } else {
                console.log("Register process failed ", body);
                assert_response = 1; // Just to flag the response anything else than success (200)
            }
        }
        callback();
    });
}

function removecriteria(server, savedata, callback) {
    //console.log("server:",server);console.log("criteria:",savedata.name);
    request({
        method: 'DELETE',
        url: server + '/api/v1/criteria?name=' + savedata.name,
        json: true,
        body: savedata,
        headers: {
            projectKey: pkey
        }
    }, function(err, resp, body) {
        if (err) {
            console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } else {
            if (resp.statusCode === 200) {
                assert_response = resp.statusCode;
                //pkey = body.projectkey;
                //console.log(pkey);
            } else {
                console.log("Register process failed ", body);
                assert_response = 1; // Just to flag the response anything else than success (200)
            }
        }
        callback();
    });
}

function removeproject(server, savedata, callback) {
    //console.log("server:",server);console.log("project:",savedata);
    request({
        method: 'DELETE',
        url: server + '/api/v1/project?projectName=' + savedata.projectName,
        json: true,
        headers: {
            projectKey: pkey
        }
    }, function(err, resp, body) {
        if (err) {
            console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } else {
            if (resp.statusCode === 200) {
                assert_response = resp.statusCode;
                //pkey = body.projectkey;
                //console.log(pkey);
            } else {
                console.log("Register process failed ", body);
                assert_response = 1; // Just to flag the response anything else than success (200)
            }
        }
        callback();
    });
}

function removefields(json) {
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            // do something with `key'
            if ((key === "timestamp") || key === ("timestampsec") || key === ("projectKey") || (key === "_id"))
                delete json[key];
            else if (key === "rules") {
                var temp = _.sortBy(json[key], 'name');
                delete json[key];
                json.rules = temp;
                for (var i = 0; i < temp.length; i++) {
                    var j = temp[i];
                    for (var key1 in j) {
                        if (j.hasOwnProperty(key1)) {
                            // do something with `key'
                            if ((key1 === "matchedDocs") || (key1 === "drilldownEventLogId") || (key1 === "functionResponse"))
                                delete j[key1];
                        }
                    }

                }
            }
        }
    }
    //console.log(json);
    return json;
}

function compare(json1, json2) {
    return _.isEqual(json1, json2);
}
