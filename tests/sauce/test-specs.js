var webdriver = require('selenium-webdriver'),
    assert = require('assert');
test = require('../../node_modules/selenium-webdriver/testing');
SauceLabs = require('saucelabs');

var sauce = 'http://ondemand.saucelabs.com:80/wd/hub';
var sauce = 'http://localhost:5555/wd/hub';
var http = require('https');
var ReportPage = require('./pageobjects/ReportPage.js');
var reportPage;

log = function(txt) {
    if (process.env.DEBUG == "true") {
        console.log(txt);
    }
};

var browser;
var allPassed;







test.describe('da-test url for ' + process.env.REPORT_URL, function() {

    test.before(function() {
        browser = new webdriver.Builder().
        usingServer(sauce).
        forBrowser('firefox').
        withCapabilities({
            browserName: 'Firefox',
            platform: 'Windows XP',
            name: 'Rule result check',
            tags: ["demo", "ibm", "devops"],
            build: '1.1.0',
            username: process.env.SAUCE_USERNAME,
            accessKey: process.env.SAUCE_ACCESS_KEY
        }).
        build();

        reportPage = new ReportPage(browser, webdriver);


        var in_url = process.env.REPORT_URL;
        browser.get(in_url);

        var flow = webdriver.promise.controlFlow();

        flow.execute(function() {
            return webdriver.promise.delayed(8 * 1000);
        });
    });

    test.beforeEach(function() {
        var flow = webdriver.promise.controlFlow();

        //        flow.execute(function() {
        //            return webdriver.promise.delayed(3 * 1000);
        //        });
    });

    test.after(function(done) {
        browser.getSession().then(function(session) {
            //            var sauceAccount = new SauceLabs({
            //                username: process.env.SAUCE_USERNAME,
            //                password: process.env.SAUCE_ACCESS_KEY
            //            });
            //
            //            sauceAccount.updateJob(session.getId(), {
            //                passed: allPassed
            //            }, function() {});
            browser.quit();
            done();
        });
    });



    test.describe('Basic Report Type', function() {

        allPassed = true;

        test.it('Check for rule "Success - advisory"', function(done) {

            reportPage.getDetailsResultsForRule(1, function(elem) {

                reportPage.getDetailsRowByIndex(0, elem, function(txt) {

                    var string = "Failed";
                    assert(txt == string, "txt should equal '" + string + "'");
                    done();

                });

            });

        });

        test.it('Check for basic condition match', function(done) {

            reportPage.getDetailsResultsForRule(1, function(elem) {

                reportPage.getDetailsRowByIndex(1, elem, function(txt) {

                    var string = "eventType = istanbulCoverage";
                    assert(txt == string, "txt should equal '" + string + "'");
                    done();

                });

            });

        });

    });

});
