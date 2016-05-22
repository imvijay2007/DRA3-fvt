/*jshint node:true*/
/********************************************************** {COPYRIGHT-TOP} ****
* Licensed Materials - Property of IBM
*
* (C) Copyright IBM Corp. 2015 All Rights Reserved
*
* US Government Users Restricted Rights - Use, duplication, or
* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
********************************************************* {COPYRIGHT-END} ****/

module.exports = function (cb) {
    var http = require('http');
    var server = http.createServer(function (req, res) {
      try {
          console.log('req: ', req.url);
          switch (req.url) {
              case '/status':
                require('../routes/status')(req, res);
                break;
              case '/version':
                require('../routes/version')(req, res);
                break;
              default:
                throw new Error('Invalid Route: ' + req.url);
          }
      } catch (e) {
          console.log(e);
          res.end('failed\r\n');
      }
    });

    server.on('error', function (err) {
      console.log(err);
    });

    server.listen(process.env.PORT, function () {
        address = server.address();
        console.log('opened server on %j', address);
        if (cb) {
            //running verifcation tests
            cb(address);
        } else {
            require('child_process').exec("grunt dev-fvttestfile", function(err, stdout, stderr) {
                var a = stdout.toString();
                console.log("I am testing this...");
                console.log(a);
            });
        }
    });
};
