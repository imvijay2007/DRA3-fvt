// runs every 1 hour
var interval = 1000*60*60*1;

// runs every 3 minutes
//var interval = 1000*60*3;

var purge = function() {
    setInterval(function(){
        require('child_process').exec('grunt dev-fvttest --verbose', function(err, stdout, stderr) {
                var a = stdout.toString();
                console.log(a);
            });
    },interval);
}

module.exports = purge;
