//Licensed Materials - Property of IBM
//
//@ Copyright IBM Corp. 2015  All Rights Reserved
//
//US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.


var rewire = require("rewire");

exports.require = function(path) {
    return rewire((process.env.INSTRUMENTED_BASE_DIR || '../../') + path);
};
