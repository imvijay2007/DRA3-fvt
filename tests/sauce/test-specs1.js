var webdriver = require('selenium-webdriver'),
    assert = require('assert');
test = require('../../node_modules/selenium-webdriver/testing');
SauceLabs = require('saucelabs');

var sauce = 'http://ondemand.saucelabs.com:80/wd/hub';
//var sauce = 'http://localhost:5555/wd/hub';
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



test.describe('DRA - UI', function() {
    test.before(function() {
        browser = new webdriver.Builder().
        usingServer(sauce).
        forBrowser('firefox').
        withCapabilities({
            browserName: 'Firefox',
            platform: 'Windows XP',
            name: 'DRA-FVT',
            tags: ["demo", "ibm", "devops"],
            build: '1.1.0',
            username: process.env.SAUCE_USERNAME,
            accessKey: process.env.SAUCE_ACCESS_KEY
        }).
        build();

        //        browser = new webdriver.Builder().
        //        withCapabilities(webdriver.Capabilities.chrome()).
        //        build();
        reportPage = new ReportPage(browser, webdriver);
        var in_url = "https://da-test.oneibmcloud.com/#/report?pipelineRunId=oneibmcloud_FVT_unittest_5&projectKey=ca5ed665-0714-494e-8ce4-be81d22c26d0&criteriaName=Fvt_unittest_regression";
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

    test.describe('Unit test Report Type', function() {
        test.it('Check for rule outcome', function(done) {
            this.timeout(20000);
            reportPage.clickRuleByIndex(1, function() {
                reportPage.getDetailsResultsForRule(1, function(elem) {
                    reportPage.getDetailsRowByIndex(0, elem, function(txt) {
                        var string = "Failed";
                        assert(txt == string, "Outcome Result should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it('Check if success percentage display', function(done) {
            this.timeout(20000);
            reportPage.clickRuleByIndex(1, function() {
                reportPage.getDetailsResultsForRule(1, function(elem) {
                    reportPage.getCoverageRowTextByIndex(0, elem, function(txt) {
                        var string = "Test Success Percentage:";
                        assert(txt == string, "txt should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it("Check if expected bar graphs display", function(done) {
            this.timeout(20000);
            reportPage.clickRuleByIndex(1, function() {
                reportPage.getDetailsResultsForRule(1, function(elem) {
                    reportPage.getCoverageRowHTMLByIndex(1, elem, function(html) {
                        var expected = 100;
                        assert((html.split(expected).length - 1) >= 2, 'Expected value/bar width should be "' + expected + '"');
                    });
                });
            });
            done();
        });
        test.it("Check if actual bar graphs display", function(done) {
            this.timeout(20000);
            reportPage.clickRuleByIndex(1, function() {
                reportPage.getDetailsResultsForRule(1, function(elem) {
                    reportPage.getCoverageRowHTMLByIndex(2, elem, function(html) {
                        var expected = 75;
                        assert((html.split(expected).length - 1) >= 2, 'Expected value/bar width should be "' + expected + '"');
                    });
                });
            });
            done();
        });
    });

    test.describe('Unit test Regression Report Type', function() {
        this.timeout(20000);
        test.it('Check for regressed test 1', function(done) {
            reportPage.clickRuleByIndex(2, function() {
                reportPage.getDetailsResultsForRule(2, function(elem) {
                    reportPage.getRegressionRowByIndex(0, elem, function(txt) {
                        var string = "test rules engine with advisory criteria";
                        assert(txt == string, "Outcome Result should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it('Check for regressed test 2', function(done) {
            this.timeout(20000);
            reportPage.clickRuleByIndex(2, function() {
                reportPage.getDetailsResultsForRule(2, function(elem) {
                    reportPage.getRegressionRowByIndex(1, elem, function(txt) {
                        var string = "test rules engine with decision criteria";
                        assert(txt == string, "Outcome Result should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
    });

});
