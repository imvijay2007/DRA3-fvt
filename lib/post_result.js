var REQUEST = require('request');
var request = REQUEST.defaults({
    strictSSL: false
});
var fs = require('fs');
var path = require('path');

var server = (process.env.DLMS_SERVER || 'https://dev-dlms.stage1.ng.bluemix.net');
//var server = 'http://localhost:6009';
var org_name = (process.env.CF_ORG || 'vjegase@us.ibm.com');
var auth_url = (process.env.AUTH_URL || 'https://login.stage1.ng.bluemix.net/UAALoginServerWAR/oauth/token');
var bmtoken;

exports.upload_data = function(capture_file_name) {
    var x = capture_file_name.split(".");
    capture_file_name = x[0] + '.json'

    var rootdir = process.cwd();
//    console.log("Path.join:");
//    console.log(path.join(__dirname, '../') + capture_file_name);
//    fs.stat(rootdir + '/' + capture_file_name, function(err, stat) {
//        console.log("Error:",err);
//        console.log("Stat:",stat);
//    });
    
    var testresult = fs.readFileSync(rootdir + '/' + capture_file_name, 'utf8');
    var buff = new Buffer(testresult);
    var base64buff = buff.toString('base64');
    
    console.log("Posting file:%s to DLMS Server: %s",capture_file_name,server);
    login(function(bmtoken) {
        var builddata = {
            build_id: capture_file_name,
            repository: {
                repository_url: 'test',
                branch: 'DRA3-FVT',
                commit_id: '12345'
            },
            status: 'pass'
        };
        var buildoptions = {
            method: 'POST',
            url: server + '/v1/organizations/' + org_name + '/environments/DRA3-FVT/runtimes/' +capture_file_name+ '/builds',
            headers: {
                Authorization: 'bearer ' + bmtoken
            },
            json: true,
            body: builddata
        };
        var testdata = {
            org_name: org_name,
            project_name: capture_file_name,
            runtime_name: capture_file_name,
            module_name: capture_file_name,
            build_id: capture_file_name,
            environment_name: 'DRA3-FVT',
            lifecycle_stage: 'unittest',
            artifact_name: capture_file_name,
            contents_type: 'application/json',
            contents: base64buff
        };
        var testoptions = {
            method: 'POST',
            url: server + '/v1/results',
            headers: {
                Authorization: 'bearer ' + bmtoken
            },
            json: true,
            body: testdata
        };
        arestcall(buildoptions, function(err, resp, body) {
            if(!err) {
                console.log("POST /builds response:", body);
                arestcall(testoptions, function(err, resp, body) {
                    console.log("POST /results response:", body);
                });
            }
            else {
                console.log("POST /builds response:", err);
            }
        });
    });
};

function getFilename(filename) {
    var file = "../" + filename;
    return file;
}

function arestcall(options, callback) {
    request(options, function(err, resp, body) {
        if (err) {
            callback(err, resp, null);
        } else {
            callback(null, resp, body);
        }
    });
}

function login(cb) {
    if (bmtoken) {
        cb(bmtoken);
    } else {
        var options = {
            method: 'POST',
            url: auth_url,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                authorization: 'Basic Y2Y6'
            },
            form: {
                username: process.env.CF_USER,
                password: process.env.CF_PASS,
                grant_type: 'password',
                response_type: 'token'
            }
        };
        request(options, function(err, resp, body) {
            if (err) {
                cb(null);
            } else {
                var tok = JSON.parse(body);
                cb(tok.access_token);
            }
        });

    }
}