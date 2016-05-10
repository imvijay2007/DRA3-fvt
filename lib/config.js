/***********************************************
 Licensed Materials - Property of IBM
Restricted Materials of IBM.  Reproduction, modification and redistribution are prohibited.

DevOps Lifecycle Message Store - Webhook Service

© Copyright IBM Corporation 2016.
U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
************************************************/
if (!process.env.VCAP_SERVICES || !process.env.VCAP_APPLICATION) {
    throw new Error('No Config');
}
var vcap = JSON.parse(process.env.VCAP_SERVICES);

var vcapapp = JSON.parse(process.env.VCAP_APPLICATION);

if (vcap && vcap['user-provided']) {
    vcap['user-provided'].forEach(function (service) {
        if (service.credentials) {
            for (var credName in service.credentials) {
                if (module.exports[credName]) {
                    throw new Error("Credential name conflicts with another config: " + credName);
                }
                module.exports[credName] = service.credentials[credName];
            }
        }
    });
}
