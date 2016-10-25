// runs every 1 hour
//var interval = 1000*60*60*1;

// runs every 3 minutes
var interval = 1000*60*3;

var gruntCommands = function(){
    require('child_process').exec('grunt dev-fvttestfile --verbose', function(err, stdout, stderr) {
        var testresult = stdout.toString();
        console.log(testresult);
    });
};

var purge = function() {
    setInterval(gruntCommands,interval);
}

gruntCommands();
module.exports = purge;
