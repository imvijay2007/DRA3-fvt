/*
 Delete old message older than 7 days
 */
// runs every hour
var interval = 1000*60*60;

// 7 days is configurable
var time_span = 7 * 24 *60 *60 * 1000;
var purge = function() {
    var time_threshhold = Date.now() - time_span;
    setInterval(function(){
        var dbc = require('./db.js');

        dbc.initDB();
        dbc.deleteDoc({
            selector:{
                "_id": {"$gt": 0},
                "timestamp_epoch":{"$lt":time_threshhold},
            }
        },function(doc){
//            console.log('deleteing ',doc["project_name"], doc["timestamp"])
        })
    },interval);
}

module.exports = purge;