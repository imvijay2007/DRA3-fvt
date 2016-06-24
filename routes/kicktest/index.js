/*jshint node:true*/
/********************************************************** {COPYRIGHT-TOP} ****
* Licensed Materials - Property of IBM
*
* (C) Copyright IBM Corp. 2015 All Rights Reserved
*
* US Government Users Restricted Rights - Use, duplication, or
* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
********************************************************* {COPYRIGHT-END} ****/

var fs = require('fs'), path = require('path');
var Mocha = require('mocha');

module.exports = function (req, res) {
    
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            try {
                var userinput = JSON.parse(body);
            }
            catch(e) {
                res.end('Invalid JSON entered!');
                throw new Error("Invalid JSON:",e);
            }
            process.env.CF_USER = userinput.login_id;
            process.env.CF_PASS = userinput.login_pw;
            process.env.CF_ORG = userinput.cf_org;
            switch (userinput.env) {
            case 'dev':
                process.env.DLMS_SERVER = 'https://dev-dlms.stage1.ng.bluemix.net';
                process.env.DRA_SERVER = 'https://dev-dra.stage1.ng.bluemix.net';
                process.env.AUTH_URL = 'https://login.stage1.ng.bluemix.net/UAALoginServerWAR/oauth/token';
                break;
            case 'new':
                process.env.DLMS_SERVER = 'https://new-dlms.stage1.ng.bluemix.net';
                process.env.DRA_SERVER = 'https://new-dra.stage1.ng.bluemix.net';
                process.env.AUTH_URL = 'https://login.stage1.ng.bluemix.net/UAALoginServerWAR/oauth/token';
                break;
            case 'stage1':
                process.env.DLMS_SERVER = 'https://dlms.stage1.ng.bluemix.net';
                process.env.DRA_SERVER = 'https://dra.stage1.ng.bluemix.net';
                process.env.AUTH_URL = 'https://login.stage1.ng.bluemix.net/UAALoginServerWAR/oauth/token';
                break;
            case 'prod':
                process.env.DLMS_SERVER = 'https://dlms.ng.bluemix.net';
                process.env.DRA_SERVER = 'https://dra.ng.bluemix.net';
                process.env.AUTH_URL = 'https://login.ng.bluemix.net/UAALoginServerWAR/oauth/token';
                break;
            default:
                throw new Error('Invalid environment: ' + userinput.env);
          }
            console.log("====================================================");
            console.log("User:",process.env.CF_USER);
            console.log("Org:",process.env.CF_ORG);
            console.log("DLMS:",process.env.DLMS_SERVER);
            console.log("DRA:",process.env.DRA_SERVER);
            console.log("====================================================");
            
            var mocha = new Mocha({
              reporter: 'json'
            });

            //clear require cache
            fs.readdirSync('tests/bm').filter(function(file){
            return file.substr(-3) === '.js';
            }).forEach(function(file){
                   delete require.cache[require.resolve(path.join('../../tests/bm', file))];
            });
            fs.readdirSync('tests/fvt').filter(function(file){
            return file.substr(-3) === '.js';
            }).forEach(function(file){
                   delete require.cache[require.resolve(path.join('../../tests/fvt', file))];
            });

            //Adding bm test files
            fs.readdirSync('tests/bm').filter(function(file){
            return file.substr(-3) === '.js';
            }).forEach(function(file){
                mocha.addFile(
                    path.join('tests/bm', file)
                );
            });

            //Adding fvt test files
            fs.readdirSync('tests/fvt').filter(function(file){
            return file.substr(-3) === '.js';
            }).forEach(function(file){
                mocha.addFile(
                    path.join('tests/fvt', file)
                );
            });

            console.log("----Running test now:%s-----",process.env.CF_USER);
            mocha.run().on('test end', function(test) {
                console.log('Test done:%s | User:%s',test.title,process.env.CF_USER);
            })
            .on('end', function(test) {
                res.setHeader('content-type','application/json');
                res.end(JSON.stringify(this.testResults));
                console.log("Test over:%s",process.env.CF_USER);
            });
        });
        
    }
    
    
    /*
    
    var mocha = new Mocha({
      reporter: 'json'
    });
    
    console.log("-------clear require cache----------");
    fs.readdirSync('tests/bm').filter(function(file){
    return file.substr(-3) === '.js';
    }).forEach(function(file){
           delete require.cache[require.resolve(path.join('../../tests/bm', file))];
    });
    fs.readdirSync('tests/fvt').filter(function(file){
    return file.substr(-3) === '.js';
    }).forEach(function(file){
           delete require.cache[require.resolve(path.join('../../tests/fvt', file))];
    });
    
    console.log("-------Adding bm test files----------");
    //Adding token test files
    fs.readdirSync('tests/bm').filter(function(file){
    return file.substr(-3) === '.js';
    }).forEach(function(file){
        mocha.addFile(
            path.join('tests/bm', file)
        );
    });
    
    console.log("-------Adding fvt test files----------");
    //Adding fvt test files
    fs.readdirSync('tests/fvt').filter(function(file){
    return file.substr(-3) === '.js';
    }).forEach(function(file){
        mocha.addFile(
            path.join('tests/fvt', file)
        );
    });
    
    console.log("-------Running test now----------");
    mocha.run().on('test end', function(test) {
        console.log('Test done: '+test.title);
    })
    .on('end', function(test) {
        res.setHeader('content-type','application/json');
        res.end(JSON.stringify(this.testResults));
        console.log("Test over!");
    });
    
    */
    
};


