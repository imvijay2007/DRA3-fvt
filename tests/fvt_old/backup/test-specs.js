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
test.describe('da-test url for ' + process.env.REPORT_URL, function() {
    test.before(function() {
        browser = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build();
        reportPage = new ReportPage(browser, webdriver);
        var in_url = "https://da-test.oneibmcloud.com/#/report?pipelineRunId=oneibmcloud_SampleFVTProject1_5&projectKey=ca5ed665-0714-494e-8ce4-be81d22c26d0&criteriaName=Samplefvtcriteria4";
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

    test.describe('Functional test Report Type', function() {
        allPassed = true;
        test.it("Check for rule outcome", function(done) {
            reportPage.getDetailsResultsForRule(1, function(elem) {
                reportPage.getDetailsRowByIndex(0, elem, function(txt) {
                    var string = "Failed";
                    assert(txt == string, "Outcome Result should equal '" + string + "' instead of '" + txt + "'");
                });
            });
            done();
        });
        test.it("Check if success percentage display", function(done) {
            reportPage.getDetailsResultsForRule(1, function(elem) {
                reportPage.getCoverageRowTextByIndex(0, elem, function(txt) {
                    var string = "Test Success Percentage:";
                    assert(txt == string, "txt should equal '" + string + "' instead of '" + txt + "'");
                });
            });
            done();
        });
        test.it("Check if expected bar graphs display", function(done) {
            reportPage.getDetailsResultsForRule(1, function(elem) {
                reportPage.getCoverageRowHTMLByIndex(1, elem, function(html) {
                    var expected = 90;
                    assert((html.split(expected).length - 1) >= 2, 'Expected value/bar width should be "' + expected + '"');
                });
            });
            done();
        });
        test.it("Check if actual bar graphs display", function(done) {
            reportPage.getDetailsResultsForRule(1, function(elem) {
                reportPage.getCoverageRowHTMLByIndex(2, elem, function(html) {
                    var actual = 71;
                    assert((html.split(actual).length - 1) >= 2, 'Actual value/bar width should be "' + actual + '"');
                });
            });
            done();
        });
    });

    test.describe('Code coverage Report Type', function() {
        test.it('Check for rule outcome', function(done) {
            reportPage.clickRuleByIndex(3, function() {
                reportPage.getDetailsResultsForRule(3, function(elem) {
                    reportPage.getDetailsRowByIndex(0, elem, function(txt) {
                        var string = "Failed";
                        assert(txt == string, "txt should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it('Check for rule eval-value', function(done) {
            reportPage.clickRuleByIndex(3, function() {
                reportPage.getDetailsResultsForRule(3, function(elem) {
                    reportPage.getDetailsRowByIndex(1, elem, function(txt) {
                        var string = "eventType = istanbulCoverage";
                        assert(txt == string, "txt should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it('Check for coverage label', function(done) {
            reportPage.clickRuleByIndex(3, function() {
                reportPage.getDetailsResultsForRule(3, function(elem) {
                    reportPage.getCoverageRowTextByIndex(0, elem, function(txt) {
                        var string = "Coverage for total.lines.pct";
                        assert(txt == string, "txt should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it('Check for expected value', function(done) {
            reportPage.clickRuleByIndex(3, function() {
                reportPage.getDetailsResultsForRule(3, function(elem) {
                    reportPage.getCoverageRowHTMLByIndex(1, elem, function(html) {
                        var expected = 40;
                        assert((html.split(expected).length - 1) >= 2, 'Expected value/bar width should be "' + expected + '"');
                    });
                });
            });
            done();
        });
        test.it('Check for actual value', function(done) {
            reportPage.clickRuleByIndex(3, function() {
                reportPage.getDetailsResultsForRule(3, function(elem) {
                    reportPage.getCoverageRowHTMLByIndex(2, elem, function(html) {
                        var actual = 37.84;
                        assert((html.split(actual).length - 1) >= 2, 'Actual value/bar width should be "' + actual + '"');
                    });
                });
            });
            done();
        });
        test.it('Check for coverage label', function(done) {
            reportPage.clickRuleByIndex(3, function() {
                reportPage.getDetailsResultsForRule(3, function(elem) {
                    reportPage.getCoverageRowTextByIndex(3, elem, function(txt) {
                        var string = "Coverage for (routes/criteria.js).lines.pct";
                        assert(txt == string, "txt should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it('Check for expected value', function(done) {
            reportPage.clickRuleByIndex(3, function() {
                reportPage.getDetailsResultsForRule(3, function(elem) {
                    reportPage.getCoverageRowHTMLByIndex(4, elem, function(html) {
                        var expected = 40;
                        assert((html.split(expected).length - 1) >= 2, 'Expected value/bar width should be "' + expected + '"');
                    });
                });
            });
            done();
        });
        test.it('Check for expected value', function(done) {
            reportPage.clickRuleByIndex(3, function() {
                reportPage.getDetailsResultsForRule(3, function(elem) {
                    reportPage.getCoverageRowHTMLByIndex(5, elem, function(html) {
                        var actual = 46.32;
                        assert((html.split(actual).length - 1) >= 2, 'Actual value/bar width should be "' + actual + '"');
                    });
                });
            });
            done();
        });
    });

    test.describe('Unit test Report Type', function() {
        test.it('Check for rule outcome', function(done) {
            reportPage.clickRuleByIndex(4, function() {
                reportPage.getDetailsResultsForRule(4, function(elem) {
                    reportPage.getDetailsRowByIndex(0, elem, function(txt) {
                        var string = "Failed";
                        assert(txt == string, "Outcome Result should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it('Check if success percentage display', function(done) {
            reportPage.clickRuleByIndex(4, function() {
                reportPage.getDetailsResultsForRule(4, function(elem) {
                    reportPage.getCoverageRowTextByIndex(0, elem, function(txt) {
                        var string = "Test Success Percentage:";
                        assert(txt == string, "txt should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it("Check if expected bar graphs display", function(done) {
            reportPage.clickRuleByIndex(4, function() {
                reportPage.getDetailsResultsForRule(4, function(elem) {
                    reportPage.getCoverageRowHTMLByIndex(1, elem, function(html) {
                        var expected = 100;
                        assert((html.split(expected).length - 1) >= 2, 'Expected value/bar width should be "' + expected + '"');
                    });
                });
            });
            done();
        });
        test.it("Check if actual bar graphs display", function(done) {
            reportPage.clickRuleByIndex(4, function() {
                reportPage.getDetailsResultsForRule(4, function(elem) {
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
        test.it('Check for regressed test 1', function(done) {
            reportPage.clickRuleByIndex(5, function() {
                reportPage.getDetailsResultsForRule(5, function(elem) {
                    reportPage.getRegressionRowByIndex(0, elem, function(txt) {
                        var string = "Build# check";
                        assert(txt == string, "Outcome Result should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
        test.it('Check for regressed test 2', function(done) {
            reportPage.clickRuleByIndex(5, function() {
                reportPage.getDetailsResultsForRule(5, function(elem) {
                    reportPage.getRegressionRowByIndex(1, elem, function(txt) {
                        var string = "Timestamp check";
                        assert(txt == string, "Outcome Result should equal '" + string + "' instead of '" + txt + "'");
                    });
                });
            });
            done();
        });
    });

    test.describe('D3 graphs for CoverageRegression Report Type', function() {

        test.it("Check the image source - negative", function(done) {
            reportPage.clickRuleByIndex(6, function() {
                reportPage.getDetailsResultsForRule(6, function(elem) {
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
            reportPage.clickRuleByIndex(6, function() {
                reportPage.getDetailsResultsForRule(6, function(elem) {
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
            reportPage.clickRuleByIndex(6, function() {
                reportPage.getDetailsResultsForRule(6, function(elem) {
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
            reportPage.clickRuleByIndex(6, function() {
                reportPage.getDetailsResultsForRule(6, function(elem) {
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
            reportPage.clickRuleByIndex(6, function() {
                reportPage.getDetailsResultsForRule(6, function(elem) {
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
            reportPage.clickRuleByIndex(6, function() {
                reportPage.getDetailsResultsForRule(6, function(elem) {
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
                reportPage.clickRuleByIndex(6, function() {
                    reportPage.getDetailsResultsForRule(6, function(elem) {
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
