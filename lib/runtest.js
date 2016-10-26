// runs every 1 hour
//var interval = 1000*60*60*1;

// runs every process.env.RUN_INTERVAL minutes. This env variable is controlled via manifest file. Default: 10 minutes.
var x = Number(process.env.RUN_INTERVAL) || 10;
var interval = 1000 * 60 * x;

var pr = require('./post_result.js');

var gruntCommands = function() {
    require('child_process').exec('grunt dev-fvttestfile --verbose', function(err, stdout, stderr) {
        var consoleoutput = stdout.toString();
        //.replace(/(\r\n|\n|\r)/gm,"");
        console.log(consoleoutput);
        
        var re = /.*captureFile=(.*)/i;
        var at = consoleoutput.match(re);
        var rawfilename = at[1];
        var cleanfilename = rawfilename.replace(/"/g,"");
        pr.upload_data(cleanfilename); 
    });
};

var purge = function() {
    setInterval(gruntCommands, interval);
}

gruntCommands();
module.exports = purge;