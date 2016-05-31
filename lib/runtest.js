// runs every 4 hours
//var interval = 1000*60*60*4;

// runs every 5 minutes
var interval = 1000*60*5;

var purge = function() {
    setInterval(function(){
        require('child_process').exec('grunt dev-fvttestfile --verbose', function(err, stdout, stderr) {
                var a = stdout.toString();
                console.log(a);
            });
    },interval);
}

module.exports = purge;
