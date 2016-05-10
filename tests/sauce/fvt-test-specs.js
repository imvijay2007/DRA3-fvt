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

//console.log = function()

//test.describe('fvt-test1', function() {
//  var browser;
//  var allPassed = true;
//
//  test.before(function() {
//    browser = new webdriver.Builder().
//        usingServer(sauce).
//        forBrowser('firefox').
////        withCapabilities({
////        browserName: 'Firefox',
////        platform: 'Windows XP',
////        name: 'Report page title check',
////        tags: ["demo","ibm","devops"],
////        build: '1.1.0',
////        username: process.env.SAUCE_USERNAME,
////        accessKey: process.env.SAUCE_ACCESS_KEY
////    }).
//        build();
//  });
//
//  test.it("check report title: <project_name> - <report name>", function(done) {
//	  var in_url = process.env.REPORT_URL;
//		var x = in_url.split("=");
//		var x1 = x[1].split("&");
//		var x2 = x1[0].split("_");
//      browser.get(in_url);
//            var flow = webdriver.promise.controlFlow();
//                flow.execute(function () { return webdriver.promise.delayed(3 * 1000); });
//        browser.getTitle('value').then(function(title) {
//             assert.equal(title, x2[1]+' - Deployment Risk Analytics Decision Report');
//            });
//        done();
//    });
//
//  test.afterEach(function(done) {   
//           if(this.currentTest.state === 'passed')  
//             allPassed = true;
//            else
//             allPassed = false;
//            done();
//    });
//
//  test.after(function(done) {
//    browser.getSession().then(function(session){
//            var sauceAccount = new SauceLabs({
//                username: process.env.SAUCE_USERNAME,
//                password: process.env.SAUCE_ACCESS_KEY
//            });
//            sauceAccount.updateJob(session.getId(), {passed:allPassed}, function(){});
//            browser.quit();
//            done();
//    });
//   
//  });
//});
































var browser;
var allPassed;

//test.before(function() {
//    browser = new webdriver.Builder().
//        usingServer(sauce).
//        forBrowser('firefox').
////        withCapabilities({
////            browserName: 'Firefox',
////            platform: 'Windows XP',
////            name: 'Rule result check',
////            tags: ["demo","ibm","devops"],
////            build: '1.1.0',
////            username: process.env.SAUCE_USERNAME,
////            accessKey: process.env.SAUCE_ACCESS_KEY
////        }).
//        build();
//    
//    var in_url = process.env.REPORT_URL;
//    browser.get(in_url);
//    
//    var flow = webdriver.promise.controlFlow();
//
//    flow.execute(function () { 
//        return webdriver.promise.delayed(3 * 1000); 
//    });
//});

//test.after(function(done) {
//    browser.getSession().then(function(session){
////        var sauceAccount = new SauceLabs({
////            username: process.env.SAUCE_USERNAME,
////            password: process.env.SAUCE_ACCESS_KEY
////        });
////
////        sauceAccount.updateJob(session.getId(), {passed:allPassed}, function(){});
//        browser.quit();
//        done();
//    });
//});







test.describe('da-test url for oneibmcloud_deploy-analytics-ci_14', function() {

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

                    var string = "Success - advisory";
                    assert(txt == string, "txt should equal '" + string + "'");
                    done();

                });

            });

        });

        test.it('Check for basic condition match', function(done) {

            reportPage.getDetailsResultsForRule(1, function(elem) {

                reportPage.getDetailsRowByIndex(1, elem, function(txt) {

                    var string = "eventType = testComplete";
                    assert(txt == string, "txt should equal '" + string + "'");
                    done();

                });

            });

        });

    });









    test.describe('Basic Graph for UTSuccess/TestResult Report Type', function() {

        allPassed = true;

        test.it("Check if outcome displays", function(done) {

            // Click leftBlock rule
            reportPage.clickRuleByIndex(4, function() {

                reportPage.getDetailsResultsForRule(4, function(elem) {

                    reportPage.getDetailsRowByIndex(0, elem, function(txt) {

                        var string = "Success";
                        assert(txt == string, "Outcome Result should equal '" + string + "'");
                        done();

                    });

                });

            });

        });

        test.it("Check that TestSuccess title displays", function(done) {

            reportPage.clickRuleByIndex(4, function() {

                reportPage.getDetailsResultsForRule(4, function(elem) {

                    reportPage.getCoverageRowTextByIndex(0, elem, function(txt) {

                        var string = "Test Success Percentage:";
                        assert(txt == string, "txt should equal '" + string + "'");
                        done();

                    });

                });

            });

        });

        test.it("Check that expected bar graphs display", function(done) {

            reportPage.clickRuleByIndex(4, function() {

                reportPage.getDetailsResultsForRule(4, function(elem) {

                    reportPage.getCoverageRowHTMLByIndex(1, elem, function(html) {

                        var expected = 100;
                        assert((html.split(expected).length - 1) >= 2, 'Expected value/bar width should be "' + expected + '"');
                        done();

                    });

                });

            });

        });

        test.it("Check that actual bar graphs display", function(done) {

            reportPage.clickRuleByIndex(4, function() {

                reportPage.getDetailsResultsForRule(4, function(elem) {

                    reportPage.getCoverageRowHTMLByIndex(2, elem, function(html) {

                        var actual = 100;
                        assert((html.split(actual).length - 1) >= 2, 'Actual value/bar width should be "' + actual + '"');
                        done();

                    });

                });

            });

        });

    });


    test.describe('Basic Graph for CoverageResult Report Type', function() {

        allPassed = true;

        test.it("Check if outcome displays", function(done) {

            reportPage.clickRuleByIndex(3, function() {

                reportPage.getDetailsResultsForRule(3, function(elem) {

                    reportPage.getDetailsRowByIndex(0, elem, function(txt) {

                        var string = "Success";
                        assert(txt == string, "Outcome Result should equal '" + string + "'");
                        done();

                    });

                });

            });

        });

        test.it("Check that CoverageResult title displays", function(done) {

            reportPage.clickRuleByIndex(3, function() {

                reportPage.getDetailsResultsForRule(3, function(elem) {

                    reportPage.getCoverageRowTextByIndex(0, elem, function(txt) {

                        var string = "Coverage for total.lines.pct";
                        assert(txt == string, "txt should equal '" + string + "'");
                        done();

                    });

                });

            });

        });

        test.it("Check that expected bar graphs display", function(done) {

            reportPage.clickRuleByIndex(3, function() {

                reportPage.getDetailsResultsForRule(3, function(elem) {

                    reportPage.getCoverageRowHTMLByIndex(1, elem, function(html) {

                        var expected = 40;
                        assert((html.split(expected).length - 1) >= 2, 'Expected value/bar width should be "' + expected + '"');
                        done();

                    });

                });

            });

        });

        test.it("Check that actual bar graphs display", function(done) {

            reportPage.clickRuleByIndex(3, function() {

                reportPage.getDetailsResultsForRule(3, function(elem) {

                    reportPage.getCoverageRowHTMLByIndex(2, elem, function(html) {

                        var actual = 80.62;
                        assert((html.split(actual).length - 1) >= 2, 'Actual value/bar width should be "' + actual + '"');
                        done();

                    });

                });

            });

        });

        test.it("Check that CoverageResult title displays", function(done) {

            reportPage.clickRuleByIndex(3, function() {

                reportPage.getDetailsResultsForRule(3, function(elem) {

                    reportPage.getCoverageRowTextByIndex(3, elem, function(txt) {

                        var string = "Coverage for (routes/criteria.js).lines.pct";
                        assert(txt == string, "txt should equal '" + string + "'");
                        done();

                    });

                });

            });

        });

        test.it("Check that expected bar graphs display", function(done) {

            reportPage.clickRuleByIndex(3, function() {

                reportPage.getDetailsResultsForRule(3, function(elem) {

                    reportPage.getCoverageRowHTMLByIndex(4, elem, function(html) {

                        var expected = 40;
                        assert((html.split(expected).length - 1) >= 2, 'Expected value/bar width should be "' + expected + '"');
                        done();

                    });

                });

            });

        });

        test.it("Check that actual bar graphs display", function(done) {

            reportPage.clickRuleByIndex(3, function() {

                reportPage.getDetailsResultsForRule(3, function(elem) {

                    reportPage.getCoverageRowHTMLByIndex(5, elem, function(html) {

                        var actual = 92.35;
                        assert((html.split(actual).length - 1) >= 2, 'Actual value/bar width should be "' + actual + '"');
                        done();

                    });

                });

            });

        });

    });

});




//test.describe('Basic List for UTRegression/TestRegression Report Type', function() {
//
//    test.before(function() {
//        browser = new webdriver.Builder().
//        usingServer(sauce).
//        forBrowser('firefox').
//            //        withCapabilities({
//            //            browserName: 'Firefox',
//            //            platform: 'Windows XP',
//            //            name: 'Rule result check',
//            //            tags: ["demo","ibm","devops"],
//            //            build: '1.1.0',
//            //            username: process.env.SAUCE_USERNAME,
//            //            accessKey: process.env.SAUCE_ACCESS_KEY
//            //        }).
//        build();
//
//        var in_url = process.env.REPORT_URL;
//        in_url = 'https://da-test.oneibmcloud.com/#/report?pipelineRunId=oneibmcloud_FVTProject_4&projectKey=e668e6dd-8195-4a38-b041-4ef4d1884a18&criteriaName=somecriteria';
//        browser.get(in_url);
//
//        var flow = webdriver.promise.controlFlow();
//
//        flow.execute(function() {
//            return webdriver.promise.delayed(8 * 1000);
//        });
//    });
//
//    test.after(function(done) {
//        browser.getSession().then(function(session) {
//            var sauceAccount = new SauceLabs({
//                username: process.env.SAUCE_USERNAME,
//                password: process.env.SAUCE_ACCESS_KEY
//            });
//
//            sauceAccount.updateJob(session.getId(), {
//                passed: allPassed
//            }, function() {});
//            browser.quit();
//            done();
//        });
//    });
//
//    allPassed = true;
//
//    test.it("Check if outcome displays, TestSuccess title displays, and expected/actual bar graphs display", function(done) {
//
//        // Click leftBlock rule
//        browser.findElement(webdriver.By.xpath('.//div[contains(@class,"leftBlock")]/div[3]')).click().then(function() {
//            browser.findElement(webdriver.By.xpath('.//div[contains(@class,"rightBlock")]/child::div[3]')).then(function(elem) {
//                // Find outcome
//                elem.findElements(webdriver.By.xpath('.//descendant::div[contains(@class, "testCaseRow")]/div')).then(function(elem) {
//
//                    // Result
//                    elem[0].getText().then(function(txt) {
//                        //console.log( txt );
//                        assert(txt == "Failed", "Outcome Result should equal 'Failed'");
//                    });
//
//                });
//
//                elem.findElements(webdriver.By.xpath('.//descendant::div[contains(@class, "testCaseRow")]/span')).then(function(elem) {
//
//                    // Check first test case that regressed
//                    elem[0].getText().then(function(txt) {
//                        //console.log( txt );
//                        assert(txt == "Build# check", "First test case should equal 'Build# check'");
//                    });
//
//                    // Check last test case that regressed
//                    elem[elem.length - 1].getText().then(function(txt) {
//                        //console.log( txt );
//                        assert(txt == "Timestamp check", "Second test case should equal 'Timestamp check'");
//                    });
//
//                });
//            });
//        });
//
//
//        done();
//    });
//
//    test.afterEach(function(done) {
//        if (this.currentTest.state === 'passed')
//            allPassed = true;
//        else
//            allPassed = false;
//        done();
//    });
//
//
//});

test.describe('da-test url for oneibmcloud_DeployAnalytics_200', function() {

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

        var in_url = process.env.COV_REG;
        //log(in_url);
        browser.get(in_url);

        var flow = webdriver.promise.controlFlow();

        flow.execute(function() {
            return webdriver.promise.delayed(8 * 1000);
        });
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

    test.describe('D3 graphs for CoverageRegression Report Type', function() {

        allPassed = true;

        test.it("Check the image source", function(done) {

            reportPage.clickRuleByIndex(5, function() {

                reportPage.getDetailsResultsForRule(5, function(elem) {

                    reportPage.getCoverageRegressionGraphByIndex(1, elem, function(elem) {

                        reportPage.getImageSrcByIndex(1, elem, function(src) {

                            var val = "../imagefiles/down.png";
                            assert(src == val, "Image source should be '" + val + "'");
                            done();

                        });

                    });

                });

            });

        });

        test.it("Check the diff value", function(done) {

            reportPage.clickRuleByIndex(5, function() {

                reportPage.getDetailsResultsForRule(5, function(elem) {

                    reportPage.getCoverageRegressionGraphByIndex(1, elem, function(elem) {

                        reportPage.getFloatingLabelTextByIndex(1, elem, function(txt) {

                            var val = "-4.99%";
                            assert(txt == val, "Diff value should be '" + val + "'");
                            done();

                        });

                    });

                });

            });

        });

        test.it("Check the fill value", function(done) {

            reportPage.clickRuleByIndex(5, function() {

                reportPage.getDetailsResultsForRule(5, function(elem) {

                    reportPage.getCoverageRegressionGraphByIndex(1, elem, function(elem) {

                        reportPage.getFloatingLabelFillByIndex(1, elem, function(fill) {

                            var val = "rgb(255, 0, 0)";
                            assert(fill == val, "Fill value should be '" + val + "'");
                            done();

                        });

                    });

                });

            });

        });

        var expectedLabels = ['Statements', 'Branches', 'Functions', 'Lines'];
        var asyncCounter = 0;

        for (var i = 0; i < expectedLabels.length; i++) {

            test.it("Check x-axis " + expectedLabels[i] + " label", function(done) {

                var asyncIndex = asyncCounter++;

                reportPage.clickRuleByIndex(5, function() {

                    reportPage.getDetailsResultsForRule(5, function(elem) {

                        reportPage.getCoverageRegressionGraphByIndex(1, elem, function(elem) {

                            reportPage.getXAxisLabelTextByIndex(asyncIndex + 1, elem, function(txt) {

                                assert(txt == expectedLabels[asyncIndex], "Label should be '" + expectedLabels[asyncIndex] + "'");
                                done();

                            });

                        });

                    });

                });

            });

        }

        test.it("Check the Current legend", function(done) {

            reportPage.clickRuleByIndex(5, function() {

                reportPage.getDetailsResultsForRule(5, function(elem) {

                    reportPage.getCoverageRegressionGraphByIndex(1, elem, function(elem) {

                        reportPage.getLegendTextByIndex(1, elem, function(txt) {

                            var val = "17 Sep 2015 22:15:58 GMT";
                            assert(txt == val, "Current timestamp value should be '" + val + "'");
                            done();

                        });

                    });

                });

            });

        });

        test.it("Check the Past legend", function(done) {

            reportPage.clickRuleByIndex(5, function() {

                reportPage.getDetailsResultsForRule(5, function(elem) {

                    reportPage.getCoverageRegressionGraphByIndex(1, elem, function(elem) {

                        reportPage.getLegendTextByIndex(2, elem, function(txt) {

                            var val = "17 Sep 2015 21:40:56 GMT";
                            assert(txt == val, "Past timestamp value should be '" + val + "'");
                            done();

                        });

                    });

                });

            });

        });

    });

});
