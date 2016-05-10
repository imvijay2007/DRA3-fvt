describe("Report UI", function() {

    beforeEach(module('ConsoleModule'));

    describe("Controller", function() {

        var scope, httpBackend, $window;

        describe("Pass wireframe", function() {

            //beforeEach(module("../partials/DRA_regression1.html"));

            beforeEach(inject(function($rootScope, $controller, $httpBackend, $http, $timeout, $base64, _$window_) {
                scope = $rootScope.$new();
                httpBackend = $httpBackend;
                $window = _$window_;
                //            $window.gPipelineRunId = 1;
                //            $window.gProjectKey = 1;
                //            $window.gCriteriaName = 1;
                $window.gDecision = btoa(JSON.stringify(decision)).toString('base64');
                var key = "91ad781a-ebea-4fc5-8bac-0006475fd735";
                var id = "oneibmcloud_DeployAnalytics_200";
                var criteria = "woot";
                //var wireFrame = "VGVzdCBSdWxlIDF8RmFpbGVkfGh0dHBzOi8vaS55dGltZy5jb20vdmkvcmt4YzdyTjVNSDgvaHFkZWZhdWx0LmpwZ3xUZXN0IFJ1bGUgMnxGYWlsZWR8aHR0cDovL3d3dy5waWNzaHVuZ2VyLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wNC9kZWF0aC1vbmNlLWhhZC1waG90by11MS5qcGd8VGVzdCBSdWxlIDN8RmFpbGVkfGh0dHBzOi8vcy1tZWRpYS1jYWNoZS1hazAucGluaW1nLmNvbS8yMzZ4LzJhL2VjL2RhLzJhZWNkYWM2ODc4MTQ4YzM1YjUwMzMzZjA1ODc0ZjE4LmpwZ3xUZXN0IFJ1bGUgNHxGYWlsZWR8aHR0cDovL3MxNC5wb3N0aW1nLm9yZy9iOWxtb3RoZHQvdGVzdC5wbmc%3D";
                var wireFrame = "Q292ZXJhZ2UgUmVncmVzc2lvbiBSZXBvcnR8RmFpbGVkfGh0dHA6Ly9zMjEucG9zdGltZy5vcmcvYzlqdHVxbTlqL2dyYXBoX2NvdmVyYWdlX3JlZ3Jlc3Npb24uanBn";
                //                httpBackend.when("GET", "/api/v1/latestEvent?pipelineRunId=" + id + "&criteriaName=" + criteria + "&eventType=_decision").respond(
                //                    latestEventCoverageResult
                //                );
                $controller('RegressionController1', {
                    $scope: scope,
                    $http: $http,

                    $routeParams: {
                        wireframe: wireFrame,
                        projectKey: key,
                        pipelineRunId: id,
                        criteriaName: criteria
                    },
                    //$timeout: $timeout,
                    $base64: $base64

                });

                //
                //httpBackend.flush();
            }));

            it("Rules[ 2 ].conditions[ 0 ] should be a Basic reportType ", function() {
                //console.log($window.gDecision);
            });

        });

        describe("Check Attribute List Report type", function() {

            var compile, scope, directiveElem;
            var element;
            var elm;

            beforeEach(inject(function($rootScope, $controller, $httpBackend, $http, $timeout, $base64, _$window_) {
                scope = $rootScope.$new();
                httpBackend = $httpBackend;
                $window = _$window_;

                $window.gDecision = btoa(JSON.stringify(latestEventAttributesList)).toString('base64');
                var key = "91ad781a-ebea-4fc5-8bac-0006475fd735";
                var id = "testdra_TestDRA_71";
                var criteria = "defaultCriteria";
                //var wireFrame = "Q292ZXJhZ2UgUmVncmVzc2lvbiBSZXBvcnR8RmFpbGVkfGh0dHA6Ly9zMjEucG9zdGltZy5vcmcvYzlqdHVxbTlqL2dyYXBoX2NvdmVyYWdlX3JlZ3Jlc3Npb24uanBn";

                //                $window.gPipelineRunId = id;
                //                $window.gProjectKey = key;
                //                $window.gCriteriaName = criteria;
                //                $window.gWireframe = wireFrame;

                //                httpBackend.when("GET", "/api/v1/latestEvent?pipelineRunId=" + id + "&criteriaName=" + criteria + "&eventType=_decision").respond(
                //                    latestEventAttributesList
                //                );
                $controller('RegressionController1', {
                    $scope: scope,
                    $http: $http,

                    $routeParams: {
                        //wireframe: wireFrame,
                        projectKey: key,
                        pipelineRunId: id,
                        criteriaName: criteria
                    },
                    //$timeout: $timeout,
                    $base64: $base64

                });

                //httpBackend.flush();
            }));

            it("Check drilldown url", function() {
                var url = 'https://www.ibm.com';
                assert(scope.rules[0].drilldownUrl == url, 'Url should be "https://www.ibm.com"');
            });

            it("Check SelectedTitleButton() before", function() {
                assert(scope.rules[1].display === false, 'Display should be false');
            });

            it("Check SelectedTitleButton() after", function() {
                scope.selectedTitleButton(scope.rules[1]);
                assert(scope.rules[1].display === true, 'Display should be true');
            });

        });

        //        describe("Fail latest event call", function() {
        //
        //            var compile, scope, directiveElem;
        //            var element;
        //            var elm;
        //
        //            beforeEach(inject(function($rootScope, $controller, $httpBackend, $http, $timeout, $base64, _$window_) {
        //                scope = $rootScope.$new();
        //                httpBackend = $httpBackend;
        //                $window = _$window_;
        //
        //                var key = "91ad781a-ebea-4fc5-8bac-0006475fd735";
        //                var id = "testdra_TestDRA_71";
        //                var criteria = "defaultCriteria";
        //                //var wireFrame = "Q292ZXJhZ2UgUmVncmVzc2lvbiBSZXBvcnR8RmFpbGVkfGh0dHA6Ly9zMjEucG9zdGltZy5vcmcvYzlqdHVxbTlqL2dyYXBoX2NvdmVyYWdlX3JlZ3Jlc3Npb24uanBn";
        //
        //                //                $window.gPipelineRunId = id;
        //                //                $window.gProjectKey = key;
        //                //                $window.gCriteriaName = criteria;
        //                //                $window.gWireframe = wireFrame;
        //
        //                httpBackend.when("GET", "/api/v1/latestEvent?pipelineRunId=" + id + "&criteriaName=" + criteria + "&eventType=_decision").respond(
        //                    500, "woot"
        //                );
        //                $controller('RegressionController1', {
        //                    $scope: scope,
        //                    $http: $http,
        //
        //                    $routeParams: {
        //                        //wireframe: wireFrame,
        //                        projectKey: key,
        //                        pipelineRunId: id,
        //                        criteriaName: criteria
        //                    },
        //                    //$timeout: $timeout,
        //                    $base64: $base64
        //
        //                });
        //
        //                httpBackend.flush();
        //            }));
        //
        //            it("Check that http fails", function() {
        //                //var url = 'https://www.ibm.com';
        //                //assert(scope.rules[0].drilldownUrl == url, 'Url should be "https://www.ibm.com"');
        //            });
        //
        //        });

        describe("Grab values from gvariable like gProjectKey", function() {

            beforeEach(inject(function($rootScope, $controller, $httpBackend, $http, $timeout, $base64, _$window_) {
                scope = $rootScope.$new();
                httpBackend = $httpBackend;
                $window = _$window_;

                var key = "91ad781a-ebea-4fc5-8bac-0006475fd735";
                var id = "oneibmcloud_DeployAnalytics_200";
                var criteria = "woot";
                var wireFrame = "Q292ZXJhZ2UgUmVncmVzc2lvbiBSZXBvcnR8RmFpbGVkfGh0dHA6Ly9zMjEucG9zdGltZy5vcmcvYzlqdHVxbTlqL2dyYXBoX2NvdmVyYWdlX3JlZ3Jlc3Npb24uanBn";

                $window.gDecision = btoa(JSON.stringify(latestEventCoverageResult)).toString('base64');
                $window.gPipelineRunId = id;
                $window.gProjectKey = key;
                $window.gCriteriaName = criteria;
                $window.gWireframe = wireFrame;

                //                httpBackend.when("GET", "/api/v1/latestEvent?pipelineRunId=" + id + "&criteriaName=" + criteria + "&eventType=_decision").respond(
                //                    latestEventCoverageResult
                //                );
                $controller('RegressionController1', {
                    $scope: scope,
                    $http: $http,

                    $routeParams: {
                        wireframe: wireFrame,
                        projectKey: key,
                        pipelineRunId: id,
                        criteriaName: criteria
                    },
                    //$timeout: $timeout,
                    $base64: $base64

                });

                //httpBackend.flush();
            }));

            it("Rules[ 2 ].conditions[ 0 ] should be a Basic reportType ", function() {
                //console.log( $window.gPipelineRunId );
            });

        });

    });

});
