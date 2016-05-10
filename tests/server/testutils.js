var fs = require('fs');
var path = require('path');
var extend = require('extend');

exports.getTestFile = function(filename) {
    var contents = fs.readFileSync(getFilename(filename), 'utf8');
    return JSON.parse(contents);
};

exports.getTestFileEncoded = function(filename) {
    var alldocs = [];
    var docs = JSON.parse(fs.readFileSync(getFilename(filename), 'utf8'));
    for (var i = 0; i < docs.length; i++) {
        var content = new Buffer(JSON.stringify(docs[i].contents)).toString('base64');
        var adoc = {};
        extend(true, adoc, docs[i]);
        delete adoc.contents;
        adoc.contents = content;
        alldocs.push(adoc);
    }
    return alldocs;
};

exports.getTestFileDecoded = function(filename) {
    var alldocs = [];
    var docs = JSON.parse(fs.readFileSync(getFilename(filename), 'utf8'));
    for (var i = 0; i < docs.length; i++) {
        var content = new Buffer(docs[i].contents, 'base64').toString('ascii');
        var adoc = {};
        extend(true, adoc, docs[i]);
        delete adoc.contents;
        adoc.contents = content;
        alldocs.push(adoc);
    }
    return alldocs;
};

function getFilename(filename) {
    var file = path.join(__dirname, "dlmsdata", filename);
    return file;
}

/*
exports.currentEvents = function() {
    var contents = fs.readFileSync(getFilename("currentevents.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.emptyfilecontent = function() {
    var contents = fs.readFileSync(getFilename("emptyfilecontents.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.deploycompare = function() {
    var contents = fs.readFileSync(getFilename("deploycompare.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.deploycomparemismatch = function() {
    var contents = fs.readFileSync(getFilename("deploycomparemismatch.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.environmentall = function() {
    var contents = fs.readFileSync(getFilename("environmentall.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.environmentalllist = function() {
    var contents = fs.readFileSync(getFilename("environmentalllist.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.projectinfo = function() {
    var contents = fs.readFileSync(getFilename("projectinfo.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.noprojectinfo = function() {
    var contents = fs.readFileSync(getFilename("noprojectinfo.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.environmentalllist = function() {
    var contents = fs.readFileSync(getFilename("environmentalllist.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.environmentnofile = function() {
    var contents = fs.readFileSync(getFilename("environmentnofile.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.environmentallnoorg = function() {
    var contents = fs.readFileSync(getFilename("environmentallnoorg.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.currentEventsUnitTestFail = function() {
    var contents = fs.readFileSync(getFilename("currenteventsunittestfail.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.currentEventsUnitTestFailForKarma = function() {
    var contents = fs.readFileSync(getFilename("currenteventsunittestfailforkarma.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.currentEventsUnitTestFailForKarmaEvent = function() {
    var contents = fs.readFileSync(getFilename("currenteventsunittestfailforkarmaevent.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.currentEventsWithTestFailuresForJUnit = function() {
    var contents = fs.readFileSync(getFilename("currentEventsWithTestFailuresForJUnit.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.currentEventsWithNoTestFailuresForJUnit = function() {
    var contents = fs.readFileSync(getFilename("currentEventsWithNoTestFailuresForJUnit.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.currentEventsForJUnit_UniqueXmlStructure = function() {
    var contents = fs.readFileSync(getFilename("currentEventsForJUnit_UniqueXmlStructure.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.currentEventsForJUnit_MultipleVersions = function() {
    var contents = fs.readFileSync(getFilename("currentEventsForJUnit_MultipleVersions.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.nounittestEvents = function() {
    var contents = fs.readFileSync(getFilename("nounittestevents.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.pastEvents = function() {
    var contents = fs.readFileSync(getFilename("pastevents.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.pastEventsForJUnit_MultipleVersions = function() {
    var contents = fs.readFileSync(getFilename("pastEventsForJUnit_MultipleVersions.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON;
};

exports.pastunittest = function() {
    var contents = fs.readFileSync(getFilename("pastunittest.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON;
};

exports.pastkarmaunittest = function() {
    var contents = fs.readFileSync(getFilename("pastkarmaunittest.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON;
};

exports.pastistanbulcoverage = function() {
    var contents = fs.readFileSync(getFilename("pastIstanbulCoverage.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON;
};

exports.pastsaucelab = function() {
    var contents = fs.readFileSync(getFilename("pastsaucelab.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};

exports.traversedoc = function() {
    var contents = fs.readFileSync(getFilename("traversedoc.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON;
};

exports.bahramtestdoc = function() {
    var contents = fs.readFileSync(getFilename("bahramtest.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON.docs;
};
*/
