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

var in_url;

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
        var in_url = "https://da-test.oneibmcloud.com/#/report?pipelineRunId=oneibmcloud_FVT_coveragetest_5&projectKey=ca5ed665-0714-494e-8ce4-be81d22c26d0&criteriaName=Fvt_coverage_regression_test";
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

    test.describe('Code coverage Report Type', function() {
        test.it('Check for rule outcome', function(done) {
            reportPage.clickRuleByIndex(1, function() {
                reportPage.getDetailsResultsForRule(1, function(elem) {
                    reportPage.getDetailsRowByIndex(0, elem, function(txt) {
                        var string = "Failed";
                        assert(txt == string, "txt should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it('Check for rule eval-value', function(done) {
            reportPage.clickRuleByIndex(1, function() {
                reportPage.getDetailsResultsForRule(1, function(elem) {
                    reportPage.getDetailsRowByIndex(1, elem, function(txt) {
                        var string = "eventType = istanbulCoverage";
                        assert(txt == string, "txt should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it('Check for coverage label', function(done) {
            reportPage.clickRuleByIndex(1, function() {
                reportPage.getDetailsResultsForRule(1, function(elem) {
                    reportPage.getCoverageRowTextByIndex(0, elem, function(txt) {
                        var string = "Coverage for total.lines.pct";
                        assert(txt == string, "txt should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it('Check for expected value', function(done) {
            reportPage.clickRuleByIndex(1, function() {
                reportPage.getDetailsResultsForRule(1, function(elem) {
                    reportPage.getCoverageRowHTMLByIndex(1, elem, function(html) {
                        var expected = 40;
                        assert((html.split(expected).length - 1) >= 2, 'Expected value/bar width should be "' + expected + '"');
                    });
                });
            });
            done();
        });
        test.it('Check for actual value', function(done) {
            reportPage.clickRuleByIndex(1, function() {
                reportPage.getDetailsResultsForRule(1, function(elem) {
                    reportPage.getCoverageRowHTMLByIndex(2, elem, function(html) {
                        var actual = 37.84;
                        assert((html.split(actual).length - 1) >= 2, 'Actual value/bar width should be "' + actual + '"');
                    });
                });
            });
            done();
        });
        test.it('Check for coverage label', function(done) {
            reportPage.clickRuleByIndex(1, function() {
                reportPage.getDetailsResultsForRule(1, function(elem) {
                    reportPage.getCoverageRowTextByIndex(3, elem, function(txt) {
                        var string = "Coverage for (routes/criteria.js).lines.pct";
                        assert(txt == string, "txt should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it('Check for expected value', function(done) {
            reportPage.clickRuleByIndex(1, function() {
                reportPage.getDetailsResultsForRule(1, function(elem) {
                    reportPage.getCoverageRowHTMLByIndex(4, elem, function(html) {
                        var expected = 40;
                        assert((html.split(expected).length - 1) >= 2, 'Expected value/bar width should be "' + expected + '"');
                    });
                });
            });
            done();
        });
        test.it('Check for actual value', function(done) {
            reportPage.clickRuleByIndex(1, function() {
                reportPage.getDetailsResultsForRule(1, function(elem) {
                    reportPage.getCoverageRowHTMLByIndex(5, elem, function(html) {
                        var actual = 46.32;
                        assert((html.split(actual).length - 1) >= 2, 'Actual value/bar width should be "' + actual + '"');
                    });
                });
            });
            done();
        });
    });

    test.describe('D3 graphs for CoverageRegression Report Type', function() {

        test.it("Check the image source - negative", function(done) {
            reportPage.clickRuleByIndex(2, function() {
                reportPage.getDetailsResultsForRule(2, function(elem) {
                    reportPage.getCoverageRegressionGraphByIndex(1, elem, function(elem) {
                        reportPage.getImageSrcByIndex(1, elem, function(src) {
                            var val = "../imagefiles/down.png";
                            assert(src == val, "Image source should be '" + val + "'" + "' instead of '" + src + "'");
                            done();
                        });
                    });
                });
            });
        });
        test.it("Check the image source - positive", function(done) {
            reportPage.clickRuleByIndex(2, function() {
                reportPage.getDetailsResultsForRule(2, function(elem) {
                    reportPage.getCoverageRegressionGraphByIndex(1, elem, function(elem) {
                        reportPage.getImageSrcByIndex(2, elem, function(src) {
                            var val = "../imagefiles/up.png";
                            assert(src == val, "Image source should be '" + val + "'" + "' instead of '" + src + "'");
                            done();
                        });
                    });
                });
            });
        });
        test.it("Check the image source - 0%", function(done) {
            reportPage.clickRuleByIndex(2, function() {
                reportPage.getDetailsResultsForRule(2, function(elem) {
                    reportPage.getCoverageRegressionGraphByIndex(2, elem, function(elem) {
                        reportPage.getImageSrcByIndex(2, elem, function(src) {
                            var val = null;
                            assert(src == val, "Image source should be '" + val + "'" + "' instead of '" + src + "'");
                            done();
                        });
                    });
                });
            });
        });
        test.it("Check the fill value - negative", function(done) {
            reportPage.clickRuleByIndex(2, function() {
                reportPage.getDetailsResultsForRule(2, function(elem) {
                    reportPage.getCoverageRegressionGraphByIndex(1, elem, function(elem) {
                        reportPage.getFloatingLabelFillByIndex(1, elem, function(fill) {
                            var val = "rgb(255, 0, 0)";
                            assert(fill == val, "Fill value should be '" + val + "'" + "' instead of '" + fill + "'");
                            done();
                        });
                    });
                });
            });
        });
        test.it("Check the fill value - positive", function(done) {
            reportPage.clickRuleByIndex(2, function() {
                reportPage.getDetailsResultsForRule(2, function(elem) {
                    reportPage.getCoverageRegressionGraphByIndex(1, elem, function(elem) {
                        reportPage.getFloatingLabelFillByIndex(2, elem, function(fill) {
                            var val = "rgb(27, 177, 153)";
                            assert(fill == val, "Fill value should be '" + val + "'" + "' instead of '" + fill + "'");
                            done();
                        });
                    });
                });
            });
        });
        test.it("Check the fill value - 0%", function(done) {
            reportPage.clickRuleByIndex(2, function() {
                reportPage.getDetailsResultsForRule(2, function(elem) {
                    reportPage.getCoverageRegressionGraphByIndex(2, elem, function(elem) {
                        reportPage.getFloatingLabelFillByIndex(2, elem, function(fill) {
                            var val = "rgb(0, 0, 0)";
                            assert(fill == val, "Fill value should be '" + val + "'" + "' instead of '" + fill + "'");
                            done();
                        });
                    });
                });
            });
        });

        //test.it("Check rectangle height - negative", function(done) {
        //    reportPage.clickRuleByIndex(7, function() {
        //        reportPage.getDetailsResultsForRule(7, function(elem) {
        //            reportPage.getCoverageRegressionGraphByIndex(1, elem, function(elem) {
        //                reportPage.getRectangleheightByIndex(1, elem, function(src) {
        //                   var val1 = src;
        //					reportPage.getRectangleheightByIndex(2, elem, function(src) {
        //						var val2 = src;
        //						assert(val1 == "118.30760000000001", "Image source should be 118.30760000000001 instead of '" + val1 + "'");
        //						//assert(val2 == "110.124", "Image source should be 110.124 instead of '" + val2 + "'");
        //						//done();
        //					});
        //              });
        //            });
        //        });
        //    });
        //});

        var expectedLabels = ['Statements', 'Branches', 'Functions', 'Lines'];
        var asyncCounter = 0;
        for (var i = 0; i < expectedLabels.length; i++) {
            test.it("Check x-axis: " + expectedLabels[i] + " label", function(done) {
                var asyncIndex = asyncCounter++;
                reportPage.clickRuleByIndex(2, function() {
                    reportPage.getDetailsResultsForRule(2, function(elem) {
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

    });
});
