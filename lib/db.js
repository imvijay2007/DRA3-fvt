/*eslint-env node */

var conf = require('./config');
var cloudant = require('cloudant')(conf['cloudantNoSQLDB'].url);
var cloudant_database = 'dlms';
exports.cloudant = cloudant;
var cloudant_testresults = cloudant.use(cloudant_database);
exports.cloudant_testresults = cloudant_testresults;

//Initiate the cloudant database.
var initDB = function() {
    cloudant.db.create(cloudant_database, function(err/*, body*/) {
	    if (!err) {
//	        console.log('Successfully created database and populated!');
	    } else {
//	        console.log("Database already exists. Population/querying will happen on database: %s",cloudant_database);
	    }
    });
};

var deleteDoc = function(query_obj, cb) {
	cloudant_testresults.find(query_obj, function(err, doc) {
		if(err) {
			console.log('delette error when reading doc')
		}
		else if(doc.docs.length>0)
		{
			doc.docs.map(function(a) {
				cloudant_testresults.destroy(a["_id"], a["_rev"],function(err,data) {
					if (err) {
						console.log('delete error: ', err)
					}
					else {
						cb(a);
					}
				})
			});
			console.log('deleting '+ doc.docs.length +' records');
		}
		else console.log('no record to be deleted')
	})
}
exports.deleteDoc = deleteDoc;

exports.initDB = initDB;