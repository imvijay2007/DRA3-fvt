//Licensed Materials - Property of IBM
//
//@ Copyright IBM Corp. 2015  All Rights Reserved
//
//US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
/*jslint browser: true, plusplus: true, nomen: true*/
/*global describe, it, require, beforeEach, afterEach*/

var gPipelineRunId = '0';
var gProjectKey = '0';
var gCriteriaName = '0';

describe("Report UI", function() {

    beforeEach(module('ConsoleModule'));

    describe("RegressionController1", function() {

        var scope, httpBackend;


        describe("Decision and Image values for STOP", function() {
            beforeEach(inject(function($rootScope, $controller, $httpBackend, $http, _$window_) {
                scope = $rootScope.$new();
                $window = _$window_;
                $window.gPipelineRunId = '0';
                $window.gProjectKey = '0';
                $window.gCriteriaName = '0';
                $window.gDecision = btoa(JSON.stringify(latestEventStopDecision)).toString('base64');

                var key = "91ad781a-ebea-4fc5-8bac-0006475fd735";
                var id = "oneibmcloud_DeployAnalytics_200";
                var criteria = "woot";

                $controller('RegressionController1', {
                    $scope: scope,
                    $http: $http,
                    $routeParams: {
                        projectKey: key,
                        pipelineRunId: id,
                        criteriaName: criteria
                    }
                });

            }));

            it("$scope.decision should be STOP and $image_name should be imagefiles/stop.png", function() {
                //httpBackend.flush();
                assert(scope.decision == "STOP", "Decision should equal STOP");
                assert(scope.image_name == "imagefiles/stop.png", "Image_name should equal imagefiles/stop.png");
            });
        });

        describe("Decision and Image values for STOP - Advisory", function() {
            beforeEach(inject(function($rootScope, $controller, $httpBackend, $http, _$window_) {
                scope = $rootScope.$new();
                $window = _$window_;
                $window.gDecision = btoa(JSON.stringify(latestEventStopAdvisoryDecision)).toString('base64');

                var key = "91ad781a-ebea-4fc5-8bac-0006475fd735";
                var id = "oneibmcloud_DeployAnalytics_200";
                var criteria = "woot";

                $controller('RegressionController1', {
                    $scope: scope,
                    $http: $http,
                    $routeParams: {
                        projectKey: key,
                        pipelineRunId: id,
                        criteriaName: criteria
                    }
                });

            }));

            it("$scope.decision should be STOP - ADVISORY and $image_name should be imagefiles/warning.png", function() {
                //httpBackend.flush();
                assert(scope.decision == "STOP - ADVISORY", "Decision should equal STOP - ADVISORY");
                assert(scope.image_name == "imagefiles/warning.png", "Image_name should equal imagefiles/warning.png");
            });
        });

        describe("Decision and Image values for PROCEED", function() {
            beforeEach(inject(function($rootScope, $controller, $httpBackend, $http, _$window_) {
                scope = $rootScope.$new();
                $window = _$window_;
                $window.gDecision = btoa(JSON.stringify(latestEventProceedDecision)).toString('base64');

                var key = "91ad781a-ebea-4fc5-8bac-0006475fd735";
                var id = "oneibmcloud_DeployAnalytics_200";
                var criteria = "woot";

                $controller('RegressionController1', {
                    $scope: scope,
                    $http: $http,
                    $routeParams: {
                        projectKey: key,
                        pipelineRunId: id,
                        criteriaName: criteria
                    }
                });

            }));

            it("$scope.decision should not be STOP && should not be STOP - ADVISORY and $image_name should be imagefiles/proceed.png", function() {
                //httpBackend.flush();
                assert(scope.decision != "STOP" && scope.decision != "STOP - ADVISORY", "Decision should not be STOP && should not be STOP - ADVISORY");
                assert(scope.image_name == "imagefiles/proceed.png", "Image_name should equal imagefiles/proceed.png");
            });
        });



        describe("Check Rules Array", function() {

            describe("TestRegression ReportType", function() {
                beforeEach(inject(function($rootScope, $controller, $httpBackend, $http, _$window_) {
                    scope = $rootScope.$new();
                    $window = _$window_;
                    $window.gDecision = btoa(JSON.stringify(latestEventTestRegression)).toString('base64');

                    var key = "91ad781a-ebea-4fc5-8bac-0006475fd735";
                    var id = "oneibmcloud_DeployAnalytics_200";
                    var criteria = "woot";

                    $controller('RegressionController1', {
                        $scope: scope,
                        $http: $http,
                        $routeParams: {
                            projectKey: key,
                            pipelineRunId: id,
                            criteriaName: criteria
                        }
                    });

                }));

                it("Rules[ 0 ] should be a TestRegression report ", function() {
                    //httpBackend.flush();
                    //console.log( scope.rules[ 2 ].conditions[ 2 ].eval );
                    assert(scope.rules[0].reportType == "TestRegression", "reportType should be 'UTRegression'");

                    assert(scope.rules[0].utRegressionResults.length == 7, "utRegressionResults array should have seven elements");
                    assert(scope.rules[0].utRegressionResults[2] == "test rules engine with decision criteria - test all conditions", "utRegressionResults[ 2 ] should equal 'test rules engine with decision criteria - test all conditions'");
                    assert(scope.rules[0].utRegressionResults[6] == "test rules engine Predefinedfunctions - hasMochaTestRegressed (run once)", "utRegressionResults[ 2 ] should equal 'test rules engine Predefinedfunctions - hasMochaTestRegressed (run once)'");
                });
            });


            describe("CoverageRegression ReportType", function() {
                beforeEach(inject(function($rootScope, $controller, $httpBackend, $http, _$window_) {
                    scope = $rootScope.$new();
                    $window = _$window_;
                    $window.gDecision = btoa(JSON.stringify(latestEventCoverageRegression)).toString('base64');

                    var key = "91ad781a-ebea-4fc5-8bac-0006475fd735";
                    var id = "oneibmcloud_DeployAnalytics_200";
                    var criteria = "woot";

                    $controller('RegressionController1', {
                        $scope: scope,
                        $http: $http,
                        $routeParams: {
                            projectKey: key,
                            pipelineRunId: id,
                            criteriaName: criteria
                        }
                    });


                }));

                it("ReportType should be set CoverageRegression ", function() {
                    assert(scope.rules[0].reportType == "CoverageRegression", "reportType should be 'CoverageRegression'");
                });

                it("Rules[ 0 ].conditions[ 0 ]covRegressionResults[ 0 ] should be a valid regression object ", function() {
                    assert(scope.rules[0].covRegressionResults[0].filename == "routes/predefinedfunctions.js", "filename should be 'routes/predefinedfunctions.js'");
                    assert(scope.rules[0].covRegressionResults[0].current.statements == 18.89, "current.statements should be '18.89'");
                    assert(scope.rules[0].covRegressionResults[0].diff.lines == -13.88, "current.lines should be '-13.88'");

                });

                it("Rules[ 0 ].conditions[ 0 ]covRegressionResults[ 2 ] should be a valid regression object ", function() {
                    assert(scope.rules[0].covRegressionResults[2].filename == "total", "filename should be 'total'");
                    assert(scope.rules[0].covRegressionResults[2].current.functions == 45.05, "current.functions should be '45.05'");
                    assert(scope.rules[0].covRegressionResults[2].diff.branches == -1.86, "current.branches should be '-1.86'");

                });

                it("TimeStamps should be set ", function() {
                    assert(scope.rules[0].timeStamps.past == "2015-09-17T21:40:56.364Z", "timeStamps.past should be '2015-09-17T21:40:56.364Z'");
                    assert(scope.rules[0].timeStamps.current == "2015-09-17T22:15:58.018Z", "timeStamps.current should be '2015-09-17T22:15:58.018Z'");
                });
            });


            describe("TestResult ReportType", function() {
                beforeEach(inject(function($rootScope, $controller, $httpBackend, $http, _$window_) {
                    scope = $rootScope.$new();
                    $window = _$window_;
                    $window.gDecision = btoa(JSON.stringify(latestEventTestResult)).toString('base64');

                    var key = "91ad781a-ebea-4fc5-8bac-0006475fd735";
                    var id = "oneibmcloud_DeployAnalytics_200";
                    var criteria = "woot";

                    $controller('RegressionController1', {
                        $scope: scope,
                        $http: $http,
                        $routeParams: {
                            projectKey: key,
                            pipelineRunId: id,
                            criteriaName: criteria
                        }
                    });

                }));

                it("Rules[ 0 ].conditions[ 0 ] should be a graphed Test Result report ", function() {
                    //httpBackend.flush();
                    //console.log( scope.rules[ 2 ].conditions[ 2 ].eval );
                    assert(scope.rules[0].reportType == "BasicT", "reportType should be 'BasicT'");

                    assert(scope.rules[0].conditions[0].type == "graph", "conditions.type should be 'graph'");
                    assert(scope.rules[0].conditions[0].eval == "_mochaTestSuccessPercentage", "conditions.eval should be '_mochaTestSuccessPercentage'");
                    assert(scope.rules[0].conditions[0].coverageActual == 98, "conditions.coverageActual should be '98'");
                    assert(scope.rules[0].conditions[0].coverageExpected == 38, "conditions.coverageExpected should be '38'");
                });
            });


            describe("Basic Report Mode", function() {
                beforeEach(inject(function($rootScope, $controller, $httpBackend, $http, _$window_) {
                    scope = $rootScope.$new();
                    $window = _$window_;
                    $window.gDecision = btoa(JSON.stringify(latestEventCoverageResult)).toString('base64');

                    var key = "91ad781a-ebea-4fc5-8bac-0006475fd735";
                    var id = "oneibmcloud_DeployAnalytics_200";
                    var criteria = "woot";

                    $controller('RegressionController1', {
                        $scope: scope,
                        $http: $http,
                        $routeParams: {
                            projectKey: key,
                            pipelineRunId: id,
                            criteriaName: criteria
                        }
                    });

                }));

                it("Rules[ 2 ].conditions[ 0 ] should be a Basic reportType ", function() {
                    //httpBackend.flush();
                    //console.log( scope.rules[ 2 ].conditions[ 0 ].value );
                    assert(scope.rules[2].conditions[0].type == "list", "conditions.type should be 'list' because it is a 'Basic' reportType");
                    assert(scope.rules[2].conditions[0].value == "eventType = istanbulCoverage", "conditions.value should be 'eventType = istanbulCoverage'");
                });

                it("Rules[ 2 ].conditions[ 1 ] should be a Graph reportType ", function() {
                    //httpBackend.flush();
                    //console.log( scope.rules[ 2 ].conditions[ 1 ].eval );
                    assert(scope.rules[2].conditions[1].type == "graph", "conditions.type should be 'graph' because it is a 'Basic' reportType");
                    assert(scope.rules[2].conditions[1].eval == "total.lines.pct", "conditions.eval should be 'filecontents.total.lines.pct'");
                    assert(scope.rules[2].conditions[1].coverageActual == 81.77, "conditions.coverageActual should be '81.77'");
                    assert(scope.rules[2].conditions[1].coverageExpected == 40, "conditions.coverageExpected should be '40'");
                });

                it("Rules[ 2 ].conditions[ 2 ] should be a Graph reportType ", function() {
                    //httpBackend.flush();
                    //console.log( scope.rules[ 2 ].conditions[ 2 ].eval );
                    assert(scope.rules[2].conditions[2].type == "graph", "conditions.type should be 'graph' because it is a 'Basic' reportType");
                    assert(scope.rules[2].conditions[2].eval == "(routes/criteria.js).lines.pct", "conditions.eval should be 'filecontents.(routes/criteria.js).lines.pct'");
                    assert(scope.rules[2].conditions[2].coverageActual == 92.47, "conditions.coverageActual should be '92.47'");
                    assert(scope.rules[2].conditions[2].coverageExpected == 40, "conditions.coverageExpected should be '40'");
                });
            });



        });

    });


    describe("rulesResultList Directive ", function() {

        var compile, scope, directiveElem;
        var element;
        var elm;

        beforeEach(module("../partials/rulesResultList.html"));

        beforeEach(inject(function($rootScope, $compile) {
            // we might move this tpl into an html file as well...
            elm = angular.element(
                //                        '<rules-result-list rule="rule" ng-if="rule.reportType == \'UTRegression\' || rule.reportType == \'TestRegression\'"></rules-result-list>'
                '<rules-result-list rule="rule"></rules-result-list>'
            );

            scope = $rootScope;
            scope.rule = {
                "name": "Unit Test Regression (Mocha)",
                "display": true,
                "reportType": "UTRegression",
                "outcome": "Failed",
                "outcome1": "Failed",
                "utRegressionResults": ["test rules engine with advisory criteria", "test rules engine with decision criteria", "test rules engine with decision criteria - test all conditions", "test rules engine with decision criteria - test all conditions, with one failure", "test rules engine with decision criteria - test all conditions, with one failure (advisory)", "test rules engine test boolean true", "test rules engine Predefinedfunctions - hasMochaTestRegressed (run once)"],
                "$$hashKey": "object:6"
            };


            $compile(elm)(scope);
            scope.$digest();
        }));

        it("Check the number of elements in the list", function() {
            //console.log( elm.children( 'div' ).children( 'div' ) ); 
            // element 1 = outcome
            // elements 2-7 = the testcases
            assert(elm.children('div').children('div').length == 8, "There should be eight elements in the list");
        });

        it("Check the Outcome element in the list", function() {
            var outcome = angular.element(angular.element(elm.children('div').children('div')[0]).children('div')[1]).text();
            //console.log( outcome );
            assert(outcome == "Failed", "The outcome should equal 'Failed'");
        });

        it("Check two elements in the list", function() {
            var firstElement = angular.element(angular.element(elm.children('div').children('div')[1]).children('div')[1]).children('span').text();
            var lastElement = angular.element(angular.element(elm.children('div').children('div')[7]).children('div')[1]).children('span').text();
            //console.log( firstElement );
            //console.log( lastElement );
            assert(firstElement == "test rules engine with advisory criteria", "firstElement should be 'test rules engine with advisory criteria'");
            assert(lastElement == "test rules engine Predefinedfunctions - hasMochaTestRegressed (run once)", "LastElement should be 'test rules engine Predefinedfunctions - hasMochaTestRegressed (run once)'");
        });
    });

    describe("rulesResultAttributeList Directive ", function() {

        var compile, scope, directiveElem;
        var element;
        var elm;

        beforeEach(module("../partials/rulesResultAttributeList.html"));

        beforeEach(inject(function($rootScope, $compile) {
            // we might move this tpl into an html file as well...
            elm = angular.element(
                '<rules-result-attribute-list rule="rule"></rules-result-attribute-list>'
            );

            scope = $rootScope;
            scope.rule = {
                "name": "compliance",
                "display": true,
                "reportType": "Attribute",
                "outcome": "Failed",
                "outcome1": "Failed",
                "conditions": [{
                    "type": "list",
                    "value": "compliance.hits.hits.*._source.compliant = true"
                }, {
                    "type": "list",
                    "value": "compliance.timed_out = false"
                }, {
                    "type": "list",
                    "value": "eventType = SecurityScan"
                }],
                "attributeResults": [
                    [{
                        "eval": "compliance.hits.hits.3._source.description",
                        "actualValue": "Overall compliance verdict",
                        "$$hashKey": "object:29"
                    }, {
                        "eval": "compliance.hits.hits.3._source.reason",
                        "actualValue": "Compliant count is 22 and noncompliant count is 1",
                        "$$hashKey": "object:30"
                    }],
                    [{
                        "eval": "compliance.hits.hits.6._source.description",
                        "actualValue": "checking if ssh server is installed",
                        "$$hashKey": "object:36"
                    }, {
                        "eval": "compliance.hits.hits.6._source.reason",
                        "actualValue": "SSH server package, openssh-server of version 1:6.6p1-2ubuntu2, found. SSH server package, openssh-sftp-server of version 1:6.6p1-2ubuntu2, found. ",
                        "$$hashKey": "object:37"
                    }],
                    [{
                        "eval": "compliance.hits.hits.21._source.description",
                        "actualValue": "Overall compliance verdict",
                        "$$hashKey": "object:43"
                    }, {
                        "eval": "compliance.hits.hits.21._source.reason",
                        "actualValue": "Compliant count is 22 and noncompliant count is 1",
                        "$$hashKey": "object:44"
                    }],
                    [{
                        "eval": "compliance.hits.hits.52._source.description",
                        "actualValue": "Overall compliance verdict",
                        "$$hashKey": "object:50"
                    }, {
                        "eval": "compliance.hits.hits.52._source.reason",
                        "actualValue": "Compliant count is 22 and noncompliant count is 1",
                        "$$hashKey": "object:51"
                    }],
                    [{
                        "eval": "compliance.hits.hits.60._source.description",
                        "actualValue": "checking if ssh server is installed",
                        "$$hashKey": "object:57"
                    }, {
                        "eval": "compliance.hits.hits.60._source.reason",
                        "actualValue": "Dup 1 SSH server package, openssh-server of version 1:6.6p1-2ubuntu2, found. SSH server package, openssh-sftp-server of version 1:6.6p1-2ubuntu2, found. ",
                        "$$hashKey": "object:58"
                    }],
                    [{
                        "eval": "compliance.hits.hits.69._source.description",
                        "actualValue": "checking if ssh server is installed",
                        "$$hashKey": "object:64"
                    }, {
                        "eval": "compliance.hits.hits.69._source.reason",
                        "actualValue": "Dup SSH server package, openssh-server of version 1:6.6p1-2ubuntu2, found. SSH server package, openssh-sftp-server of version 1:6.6p1-2ubuntu2, found. ",
                        "$$hashKey": "object:65"
                    }]
                ],
                "drilldownUrl": "https://www.ibm.com",
                "$$hashKey": "object:3"
            };


            $compile(elm)(scope);
            scope.$digest();
        }));

        it("Check for eight list elements - first the outcome, then the drilldownurl, followed by the attributes", function() {
            var numberOfElements = elm.children('div').children('div').length;

            //console.log( numberOfElements );

            assert(numberOfElements == 8, "There should be eight list elements");
        });

        it("Check that Attributes are listed for the first element", function() {
            var parent = elm.children('div').children('div');
            var titleAttribute = angular.element(angular.element(parent[2]).children('div')[0]).find('span').text();
            var secondAttribute = angular.element(angular.element(parent[2]).children('div')[1]).children('div').children('div').text();

            //console.log( titleAttribute );
            //console.log( secondAttribute );

            assert(titleAttribute == "Description: Overall compliance verdict", "First attribute - title should be 'Description: Overall compliance verdict'");
            assert(secondAttribute == "Reason: Compliant count is 22 and noncompliant count is 1", "First attribute - value should be 'Reason: Compliant count is 22 and noncompliant count is 1'");
        });

        it("Check that Attributes are listed for the sixth element", function() {
            var parent = elm.children('div').children('div');
            var titleAttribute = angular.element(angular.element(parent[7]).children('div')[0]).find('span').text();
            var secondAttribute = angular.element(angular.element(parent[7]).children('div')[1]).children('div').children('div').text();

            //console.log( titleAttribute );
            //console.log( secondAttribute );

            assert(titleAttribute == "Description: checking if ssh server is installed", "First attribute - title should be 'Description: checking if ssh server is installed'");
            assert(secondAttribute == "Reason: Dup SSH server package, openssh-server of version 1:6.6p1-2ubuntu2, found. SSH server package, openssh-sftp-server of version 1:6.6p1-2ubuntu2, found. ", "First attribute - value should be 'Reason: Dup SSH server package, openssh-server of version 1:6.6p1-2ubuntu2, found. SSH server package, openssh-sftp-server of version 1:6.6p1-2ubuntu2, found. '");
        });
    });

    describe("rulesResultGraph Directive ", function() {

        var compile, scope, directiveElem;
        var element;
        var elm;

        beforeEach(module("../partials/rulesResultGraph.html"));

        beforeEach(inject(function($rootScope, $compile) {
            // we might move this tpl into an html file as well...
            elm = angular.element(
                '<rules-result-graph rule="rule"></rules-result-graph>'
            );

            scope = $rootScope;
            scope.rule = {
                "name": "Code Coverage (Istanbul)",
                "display": true,
                "reportType": "Basic",
                "outcome": "Success",
                "outcome1": "Success",
                "conditions": [{
                    "type": "list",
                    "value": "eventType = istanbulCoverage",
                    "$$hashKey": "object:24"
                }, {
                    "type": "list",
                    "value": "filecontents.total.lines.pct >= 40",
                    "$$hashKey": "object:25"
                }, {
                    "type": "list",
                    "value": "filecontents.(routes/criteria.js).lines.pct >= 40",
                    "$$hashKey": "object:26"
                }],
                "$$hashKey": "object:4"
            };


            $compile(elm)(scope);
            scope.$digest();
        }));

        it("Check the Outcome element in the list", function() {
            var outcome = angular.element(angular.element(elm.children('div').children('div')[0]).children('div')[1]).text();
            //console.log( outcome );
            assert(outcome == "Success", "The outcome should equal 'Success'");
        });

        it("Check first and last conditions", function() {
            var firstElement = angular.element(angular.element(elm.children('div').children('div')[1]).children('div').children('div')[1]).text();
            var lastElement = angular.element(angular.element(elm.children('div').children('div')[3]).children('div').children('div')[1]).text();
            //console.log( firstElement );
            //console.log( lastElement );
            assert(firstElement == "eventType = istanbulCoverage", "firstElement should be 'eventType = istanbulCoverage'");
            assert(lastElement == "filecontents.(routes/criteria.js).lines.pct >= 40", "LastElement should be 'filecontents.(routes/criteria.js).lines.pct >= 40'");
        });
    });

    describe("rulesResultGraphT Directive ", function() {

        var compile, scope, directiveElem;
        var element;
        var elm;

        beforeEach(module("../partials/rulesResultGraphT.html"));

        beforeEach(inject(function($rootScope, $compile) {
            // we might move this tpl into an html file as well...
            elm = angular.element(
                '<rules-result-graph-t rule="rule"></rules-result-graph-t>'
            );

            scope = $rootScope;
            scope.rule = {
                "name": "Unit Test Success (Mocha)",
                "display": true,
                "reportType": "BasicT",
                "outcome": "Failed",
                "outcome1": "Failed",
                "conditions": [{
                    "type": "graph",
                    "eval": "_mochaTestSuccessPercentage",
                    "coverageActual": 63,
                    "coverageExpected": 88.5,
                    "$$hashKey": "object:34"
                }],
                "$$hashKey": "object:5"
            };


            $compile(elm)(scope);
            scope.$digest();
        }));

        it("Check the Outcome element in the list", function() {
            var outcome = angular.element(angular.element(elm.children('div').children('div')[0]).children('div')[1]).text();
            //console.log( outcome );
            assert(outcome == "Failed", "The outcome should equal 'Failed'");
        });

        it("Check first and last conditions", function() {
            var firstElement = angular.element(angular.element(elm.children('div').children('div')[1]).children('div').children('div')[1]).html();
            var lastElement = angular.element(angular.element(elm.children('div').children('div')[1]).children('div').children('div')[2]).html();

            //console.log( (firstElement.split("88.5").length - 1) );
            //console.log( (lastElement.split("63").length - 1) );

            // Check to see if the values are used twice.  
            //  It is printed out once as "expected: 88.5"
            //  It is printed the second time as the width of the horizontal bar
            assert((firstElement.split("88.5").length - 1) >= 2, "firstElement should be 'eventType = 88.5'");
            assert((lastElement.split("63").length - 1) >= 2, "LastElement should be '63'");
        });
    });

    describe("rulesResultCovRegression Directive ", function() {

        var compile, scope, directiveElem;
        var element;
        var elm;

        beforeEach(module("../partials/rulesResultCovRegression.html"));

        beforeEach(inject(function($rootScope, $compile) {
            // we might move this tpl into an html file as well...
            elm = angular.element(
                '<rules-result-cov-regression rule="rule"></rules-result-cov-regression>'
            );

            scope = $rootScope;
            scope.rule = {
                "name": "Coverage Regression (Istanbul)",
                "display": true,
                "reportType": "CoverageRegression",
                "outcome": "Failed",
                "outcome1": "Failed",
                "covRegressionResults": [{
                    "filename": "routes/predefinedfunctions.js",
                    "current": {
                        "lines": 8.89,
                        "statements": 8.89,
                        "functions": 0,
                        "branches": 0
                    },
                    "diff": {
                        "lines": -3.88,
                        "statements": -3.88,
                        "functions": 0,
                        "branches": 0
                    },
                    "$$hashKey": "object:44"
                }, {
                    "filename": "routes/criteria.js",
                    "current": {
                        "lines": 76.32,
                        "statements": 76.42,
                        "functions": 83.33,
                        "branches": 78.63
                    },
                    "diff": {
                        "lines": -4.15,
                        "statements": -4.14,
                        "functions": -7.58,
                        "branches": -1.37
                    },
                    "$$hashKey": "object:45"
                }, {
                    "filename": "total",
                    "current": {
                        "lines": 55.84,
                        "statements": 55.91,
                        "functions": 45.05,
                        "branches": 51.31
                    },
                    "diff": {
                        "lines": -4.99,
                        "statements": -4.99,
                        "functions": -4.35,
                        "branches": -1.86
                    },
                    "$$hashKey": "object:46"
                }],
                "timeStamps": {
                    "past": "2015-09-17T21:40:56.364Z",
                    "current": "2015-09-17T22:15:58.018Z"
                },
                "$$hashKey": "object:7"
            };


            $compile(elm)(scope);
            scope.$digest();
        }));

        it("Check for three BarChart Directives", function() {
            //console.log( elm.find( 'bar-chart').length );
            assert(elm.find('bar-chart').length == 3, "There should be three BarChart directives");
        });

        it("Check that both files are listed", function() {
            var firstFile = angular.element(angular.element(angular.element(elm.children('div').children('div')[2]).children('div')[0]).children('div')[1]).children('span').text();
            var secondFile = angular.element(angular.element(angular.element(elm.children('div').children('div')[3]).children('div')[0]).children('div')[1]).children('span').text();

            //console.log( firstFile );
            //console.log( secondFile );

            assert(firstFile == "routes/predefinedfunctions.js", "firstFile should be 'routes/predefinedfunctions.js'");
            assert(secondFile == "routes/criteria.js", "secondFile should be 'routes/criteria.js'");
        });
    });

    describe("barChart Directive ", function() {

        var compile, scope, directiveElem;
        var element;
        var elm;

        describe("Istanbul Coverage", function() {
            beforeEach(inject(function($rootScope, $compile) {
                // we might move this tpl into an html file as well...
                elm = angular.element(
                    '<bar-chart results="file" time-stamps="rule.timeStamps"></bar-chart>'
                );

                scope = $rootScope;
                scope.file = {
                    "filename": "routes/predefinedfunctions.js",
                    "current": {
                        "lines": 8.89,
                        "statements": 8.89,
                        "functions": 0,
                        "branches": 0
                    },
                    "diff": {
                        "lines": -3.88,
                        "statements": 3.88,
                        "functions": -56.565,
                        "branches": 0
                    }
                };

                scope.rule = {
                    timeStamps: {
                        "past": "2015-09-17T21:40:56.364Z",
                        "current": "2015-09-17T22:15:58.018Z"
                    }
                };

                $compile(elm)(scope);
                scope.$digest();
            }));





            describe("GraphTable Arrows, font color, and percentage points", function() {
                it("Verify graphTable data for greater than zero", function() {
                    var container = angular.element(elm.find('svg').children('g').children('g')[2]);
                    var imgName = angular.element(angular.element(container).find('image')[0]).attr('href');
                    var font = angular.element(angular.element(container).find('text')[1]);
                    var color = font.css("fill").toUpperCase();
                    var val = font.text();

                    //                    console.log(container);
                    //                    console.log(imgName);
                    //                    console.log(font);
                    //                    console.log(color);
                    //                    console.log(val);
                    assert(imgName == '../imagefiles/up.png', "ImageName should be '../imagefiles/up.png'");
                    assert(color == '#1BB199', "color should be '#1BB199'");
                    assert(val == '3.88%', "val should be 3.88%");
                });

                it("Verify graphTable data for equal to zero", function() {
                    var container = angular.element(elm.find('svg').children('g').children('g')[3]);
                    var imgName = angular.element(angular.element(container).find('image')[0]).attr('href');
                    var font = angular.element(angular.element(container).find('text')[1]);
                    var color = font.css("fill").toUpperCase();
                    var val = font.text();
                    //                    console.log(container);
                    //                    console.log(imgName);
                    //                    console.log(font);
                    //                    console.log(color);
                    //                    console.log(val);
                    assert(typeof(imgName) == "undefined", "Image element should not exist");
                    assert(color === '#1BB199', "fill color should be empty");
                    assert(val == '0.00%', "val should be '0.00%'");
                });

                it("Verify graphTable data for less than zero", function() {
                    var container = angular.element(elm.find('svg').children('g').children('g')[4]);
                    var imgName = angular.element(angular.element(container).find('image')[0]).attr('href');
                    var font = angular.element(angular.element(container).find('text')[1]);
                    var color = font.css("fill").toUpperCase();
                    var val = font.text();
                    //                    console.log(container);
                    //                    console.log(imgName);
                    //                    console.log(font);
                    //                    console.log(color);
                    //                    console.log(val);
                    assert(imgName == '../imagefiles/down.png', "ImageName should be 'imagefiles/down.png'");
                    assert(color == '#FF0000', "color should be '#FF0000'");
                    assert(val == '-56.56%', "val should be '-56.56%'");
                });
            });

            describe("D3js Graph Bars, Labels, and Legends", function() {
                it("X axis should have labels", function() {
                    var labels = angular.element(elm.find('svg').children('g').children('g')[0]).find('text');
                    var labelsArray = [];
                    var expectedLabels = ['Statements', 'Branches', 'Functions', 'Lines'];

                    for (var i = 0; i < labels.length; i++) {
                        labelsArray.push(angular.element(labels[i]).text());
                        //console.log( labelsArray[ i ] );

                        assert(labelsArray[i] == expectedLabels[i], "Label[ " + i + " ] should equal '" + expectedLabels[i] + "'");
                    }
                });

                /*
                it("Verify D3 current and past bars for 'Statements'", function() {
                    var block = angular.element(elm.find('svg').children('g').children('g')[2]);
                    var statementsTextCurrent = angular.element(block.find('text')[0]).text();
                    var statementsTextPast = angular.element(block.find('text')[1]).text();

                    //console.log(angular.element(elm.find('svg').children('g').children('g')[0]).find('text'));
                    //console.log(angular.element(block.find('text')[1]).text());
                    //console.log(statementsTextCurrent);
                    //console.log(statementsTextPast);

                    assert(statementsTextCurrent == 8.89, "statementsTextCurrent should equal '8.89'");
                    assert(statementsTextPast == 5.01, "statementsTextPast should equal '5.01'");
                });

                it("Verify D3 current and past bars for 'Lines'", function() {
                    var block = angular.element(elm.find('svg').children('g').children('g')[5]);
                    var linesTextCurrent = angular.element(block.find('text')[0]).text();
                    var linesTextPast = angular.element(block.find('text')[1]).text();

                    //console.log( angular.element( elm.find( 'svg' ).children( 'g' ).children( 'g' )[ 0 ] ).find( 'text' ) );
                    //console.log( angular.element( block.find( 'text' ) ) );
                    //console.log( linesTextCurrent );
                    //console.log( linesTextPast );

                    assert(linesTextCurrent == 8.89, "linesTextCurrent should equal '8.89'");
                    assert(linesTextPast == 12.77, "linesTextPast should equal '12.77'");
                });
                */
            });
        });


        describe("Blanket Coverage", function() {
            beforeEach(inject(function($rootScope, $compile) {
                // we might move this tpl into an html file as well...
                elm = angular.element(
                    '<bar-chart results="file" time-stamps="rule.timeStamps"></bar-chart>'
                );

                scope = $rootScope;
                scope.file = {
                    "filename": "routes/predefinedfunctions.js",
                    "current": {
                        "coverage": 8.89
                    },
                    "diff": {
                        "coverage": 0
                    }
                };

                scope.rule = {
                    timeStamps: {
                        "past": "2015-09-17T21:40:56.364Z",
                        "current": "2015-09-17T22:15:58.018Z"
                    }
                };

                $compile(elm)(scope);
                scope.$digest();
            }));

            describe("GraphTable Arrows, font color, and percentage points", function() {
                it("Should only have one cell for Blanket coverage", function() {
                    var numberOfCells = angular.element(elm.find('svg').children('g').children('g')).length;

                    // numberOfCells - (x and y Axis ) - (current and past legends)
                    numberOfCells = numberOfCells - 2;

                    //console.log(numberOfCells);

                    assert(numberOfCells == 1, "numberOfCells should be 1");
                });

                it("Verify graphTable data for equal to zero", function() {
                    var container = angular.element(elm.find('svg').children('g').children('g')[2]);
                    var imgName = angular.element(angular.element(container).find('image')[0]).attr('href');
                    var font = angular.element(angular.element(container).find('text')[1]);
                    var color = font.css("fill").toUpperCase();
                    var val = font.text();
                    //                    console.log(container);
                    //                    console.log(imgName);
                    //                    console.log(font);
                    //                    console.log(color);
                    //                    console.log(val);
                    assert(typeof(imgName) == "undefined", "Image element should not exist");
                    assert(color === '#1BB199', "fill color should be empty");
                    assert(val == '0.00%', "val should be '0.00%'");
                });
            });

            describe("D3js Graph Bars, Labels, and Legends", function() {
                it("X axis should have labels", function() {
                    var labels = angular.element(elm.find('svg').children('g').children('g')[0]).find('text');
                    var labelsArray = [];
                    var expectedLabels = ['Coverage'];

                    for (var i = 0; i < labels.length; i++) {
                        labelsArray.push(angular.element(labels[i]).text());
                        //console.log( labelsArray[ i ] );

                        assert(labelsArray[i] == expectedLabels[i], "Label[ " + i + " ] should equal '" + expectedLabels[i] + "'");
                    }
                });

                /*
                it("Verify D3 current and past bars for 'Coverage'", function() {
                    var block = angular.element(elm.find('svg').children('g').children('g')[2]);
                    var coverageTextCurrent = angular.element(block.find('text')[0]).text();
                    var coverageTextPast = angular.element(block.find('text')[1]).text();

                    //console.log( angular.element( elm.find( 'svg' ).children( 'g' ).children( 'g' )[ 0 ] ).find( 'text' ) );
                    //console.log( angular.element( block.find( 'text' )[ 1 ] ).text() );
                    //console.log( coverageTextCurrent );
                    //console.log( coverageTextPast );

                    assert(coverageTextCurrent == 8.89, "statementsTextCurrent should equal '8.89'");
                    assert(coverageTextPast == 8.89, "statementsTextPast should equal '8.89'");
                });
                */
            });
        });
    });
});
