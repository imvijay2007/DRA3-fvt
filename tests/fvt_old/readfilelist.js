var fs = require('fs');
var path = require('path');
var ite = [];

exports.readfiles = function() {
    var items = fs.readdirSync(__dirname);
    //console.log(items);
    for (var i = 0; i < items.length; i++) {
        if (path.extname(items[i]) === ".json")
            ite.push(items[i]);
    }
    //console.log(ite);
    return ite;
};

exports.readmaster = function() {
    var contents = fs.readFileSync(getFilename("master_file.json"), 'utf8');
    var contentJSON = JSON.parse(contents);
    return contentJSON;

};

function getFilename(filename) {
    var file = path.join(__dirname, filename);
    return file;
}
