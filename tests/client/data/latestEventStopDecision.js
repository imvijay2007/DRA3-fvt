var latestEventStopDecision = {
    "_id": "5628e2d14572b7bc08a995ae",
    org_id: 'fakeorg',
    build_id: 'jaime-ec1d-4c7c-9ebd-second1',
    project_name: 'JAIMEwasHERE',
    runtime_name: 'd91397d8-4fee-4eed-8aa2-mochaIstanbul1',
    timestamp: '2016-04-05T16:57:52.981Z',
    custom_metadata: {
        job_name: 'Back-end/Test Job',
        stage_name: 'Unit Test Stage',
        build_number: '249',
        toolchain_id: '8313c1fd-1ece-4010-9bbe-133b7066e9f5',
        content_type: 'application/json'
    },
    tool_name: 'dra',
    artifact_name: 'decision',

    contents: {
        "criteriaName": "DRATestDeploy",
        "mode": "decision",
        "projectName": "oneibmcloud | DeployAnalytics",
        "score": "80%",
        "decision": "Stop",

        "rules": [{
            "name": "Test Completed",
            "mode": "advisory",
            "conditions": [{
                "eval": "eventType",
                "op": "=",
                "value": "testComplete"
            }],
            "failures": [],
            "functionResponse": [{
                "eval": "eventType",
                "actualValue": "testComplete"
            }],
            "matchedDocs": [
                "55fb3b9ea932c51d00e6cc56"
            ],
            "reportMode": "Basic",
            "outcome": "Success"
        }, {
            "name": "Code Coverage (Istanbul)",
            "conditions": [{
                "eval": "eventType",
                "op": "=",
                "value": "istanbulCoverage"
            }, {
                "eval": "filecontents.total.lines.pct",
                "op": ">=",
                "value": "40"
            }, {
                "eval": "filecontents.(routes/criteria.js).lines.pct",
                "op": ">=",
                "value": "40"
            }],
            "failures": [],
            "functionResponse": [{
                "eval": "eventType",
                "actualValue": "istanbulCoverage"
            }, {
                "eval": "filecontents.total.lines.pct",
                "actualValue": 55.84
            }, {
                "eval": "filecontents.(routes/criteria.js).lines.pct",
                "actualValue": 76.32
            }],
            "matchedDocs": [
                "55fb3b9ea932c51d00e6cc55"
            ],
            "reportMode": "Basic",
            "outcome": "Success"
        }, {
            "name": "Unit Test Success (Mocha)",
            "conditions": [{
                "eval": "_mochaTestSuccessPercentage",
                "op": "=",
                "value": 100
            }],
            "failures": [],
            "functionResponse": [{
                "functionname": "mochaTestSuccessPercentage",
                "reportType": "UTSuccess",
                "tests": 28,
                "passes": 28,
                "percentage": 100
            }],
            "matchedDocs": [
                "55fb3b9da932c51d00e6cc54"
            ],
            "reportMode": "Function",
            "outcome": "Success"
        }, {
            "name": "Unit Test Regression (Mocha)",
            "conditions": [{
                "eval": "_hasMochaTestRegressed",
                "op": "=",
                "value": false
            }],
            "failures": [],
            "functionResponse": [{
                "functionname": "hasMochaTestRegressed",
                "reportType": "UTRegression",
                "returnValue": false,
                "pipelinePast": {
                    "id": "oneibmcloud_DeployAnalytics_199",
                    "timestamp": "2015-09-17T21:40:55.317Z"
                },
                "pipelineCurrent": {
                    "id": "oneibmcloud_DeployAnalytics_200",
                    "timestamp": "2015-09-17T22:15:57.170Z"
                },
                "regressionOccured": false,
                "regression": []
            }],
            "matchedDocs": [
                "55fb3b9da932c51d00e6cc54",
                "55fb3367f61bef1d00582327"
            ],
            "reportMode": "Function",
            "outcome": "Success"
        }, {
            "name": "Coverage Regression (Istanbul)",
            "conditions": [{
                "eval": "_hasIstanbulCoverageRegressed(-2)",
                "op": "=",
                "value": false
            }],
            "failures": [{
                "failed": "_hasIstanbulCoverageRegressed(-2) evaluated as: [true], expected: [false], operation: [=]"
            }],
            "functionResponse": [{
                "functionname": "hasIstanbulCoverageRegressed",
                "reportType": "CoverageRegression",
                "pipelinePast": {
                    "id": "oneibmcloud_DeployAnalytics_199",
                    "timestamp": "2015-09-17T21:40:56.364Z"
                },
                "pipelineCurrent": {
                    "id": "oneibmcloud_DeployAnalytics_200",
                    "timestamp": "2015-09-17T22:15:58.018Z"
                },
                "regression": [{
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
                    }
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
                    }
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
                    }
                }]
            }],
            "matchedDocs": [
                "55fb3b9ea932c51d00e6cc55",
                "55fb3368f61bef1d00582328"
            ],
            "reportMode": "Function",
            "outcome": "Failed"
        }]
    },



    "timestampsec": 1443730765946
};
