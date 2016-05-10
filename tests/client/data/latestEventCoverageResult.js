var latestEventCoverageResult = {
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
        "score": "60%",
        "decision": "Stop",
        "criteriaName": "DRATestDeploy",
        "mode": "decision",
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
                "actualValue": "testComplete",
                "reportType": "Basic"
            }],
            "matchedDocs": [
                "5617f1ede0eecb1d001e4c2a"
            ],
            "reportMode": "Basic",
            "outcome": "Success"
        }, {
            "name": "Unit Test Regression (Mocha)",
            "conditions": [{
                "eval": "_hasMochaTestRegressed",
                "op": "=",
                "value": false
            }],
            "failures": [{
                "failed": "TypeError: Cannot read property 'failures' of undefined"
            }],
            "functionResponse": [],
            "matchedDocs": [],
            "reportMode": "Function",
            "outcome": "Failed"
        }, {
            "name": "Code Coverage (Istanbul)",
            "conditions": [{
                "eval": "eventType",
                "op": "=",
                "value": "istanbulCoverage",
                "reportType": "CoverageResult"
            }, {
                "eval": "contents.total.lines.pct",
                "op": ">=",
                "value": "40",
                "reportType": "CoverageResult"
            }, {
                "eval": "contents.(routes/criteria.js).lines.pct",
                "op": ">=",
                "value": "40",
                "reportType": "CoverageResult"
            }],
            "failures": [],
            "functionResponse": [{
                "eval": "eventType",
                "actualValue": "istanbulCoverage",
                "reportType": "CoverageResult"
            }, {
                "eval": "contents.total.lines.pct",
                "actualValue": 81.77,
                "reportType": "CoverageResult"
            }, {
                "eval": "contents.(routes/criteria.js).lines.pct",
                "actualValue": 92.47,
                "reportType": "CoverageResult"
            }],
            "matchedDocs": [
                "5617f1ece0eecb1d001e4c29"
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
            "failures": [{
                "failed": "TypeError: Cannot read property 'stats' of undefined"
            }],
            "functionResponse": [],
            "matchedDocs": [],
            "reportMode": "Function",
            "outcome": "Failed"
        }, {
            "name": "Coverage Regression (Istanbul)",
            "conditions": [{
                "eval": "_hasIstanbulCoverageRegressed(-2)",
                "op": "=",
                "value": false
            }],
            "failures": [],
            "functionResponse": [{
                "functionname": "hasIstanbulCoverageRegressed",
                "reportType": "CoverageRegression",
                "pipelinePast": {
                    "id": "oneibmcloud_deploy-analytics-ci_14",
                    "timestamp": "2015-10-06T19:44:42.376Z"
                },
                "pipelineCurrent": {
                    "id": "oneibmcloud_deploy-analytics-ci_16",
                    "timestamp": "2015-10-09T16:57:16.606Z"
                },
                "regression": []
            }],
            "matchedDocs": [
                "5617f1ece0eecb1d001e4c29",
                "561424aadf9ca71d007d024b"
            ],
            "reportMode": "Function",
            "outcome": "Success"
        }]
    },
    "timestampsec": 1444409854376
};
