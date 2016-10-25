//var grunt = require('grunt');
//console.log("Generated file will be posted:",grunt.config('pkg'));        
//.data.mochaTest['fvt-spec-file'].options.captureFile);

console.log("This file will be posted:", capture_file_name);

var REQUEST = require('request');
var fs = require('fs');

var testresult = fs.readFileSync(capture_file_name, 'utf8');

var buff = new Buffer(JSON.stringify(testresult));
var base64buff = buff.toString('base64');

var request = REQUEST.defaults({
    strictSSL: false
});

var postdata = {
    org_name: (process.env.CF_ORG || 'vjegase@us.ibm.com'),
    project_name: 'dlmsrs-loadtest',
    runtime_name: 'dlmsrs-loadtest',
    module_name: 'dlmsrs-loadtest',
    build_id: 'master:' + capture_file_name,
    environment_name: 'master',
    lifecycle_stage: 'unittest',
    artifact_name: capture_file_name,
    contents_type: 'application/json',
    contents: base64buff
};

var server = (process.env.DLMS_SERVER || 'https://dev-dlms.stage1.ng.bluemix.net');
var org_name = (process.env.CF_ORG || 'vjegase@us.ibm.com');

var options = {
    method: 'POST',
    url: server + '/v1/results',
    headers: {
        Authorization: 'bearer ' + bmtoken
    },
    json: true,
    body: postdata
};

arestcall(options, function(err, resp, body) {
    console.log("POST /results response:", body);
});


function arestcall(options, callback) {
    request(options, function(err, resp, body) {
        if (err) {
            callback(err, resp, null);
        } else {
            callback(null, resp, body);
        }
    });
}