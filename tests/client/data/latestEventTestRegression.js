var latestEventTestRegression = {
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
        "criteriaName": "DRATestDemo",
        "mode": "decision",
        "projectName": "eplassma1 | TestDRA",
        "score": "50%",
        "decision": "Stop",
        "rules": [{
            "name": "Unit Test Regression (Mocha)",
            "conditions": [{
                "eval": "_hasMochaTestRegressed",
                "op": "=",
                "value": false
            }],
            "failures": [{
                "failed": "_hasMochaTestRegressed evaluated as: [true], expected: [false], operation: [=]"
            }],
            "functionResponse": [{
                "functionname": "hasMochaTestRegressed",
                "reportType": "TestRegression",
                "returnValue": true,
                "pipelinePast": {
                    "id": "eplassma1_TestDRA_18",
                    "timestamp": "2015-09-17T22:06:55.478Z"
                },
                "pipelineCurrent": {
                    "id": "eplassma1_TestDRA_34",
                    "timestamp": "2015-09-18T15:20:33.998Z"
                },
                "regressionOccured": true,
                "list": [
                    "test rules engine with advisory criteria",
                    "test rules engine with decision criteria",
                    "test rules engine with decision criteria - test all conditions",
                    "test rules engine with decision criteria - test all conditions, with one failure",
                    "test rules engine with decision criteria - test all conditions, with one failure (advisory)",
                    "test rules engine test boolean true",
                    "test rules engine Predefinedfunctions - hasMochaTestRegressed (run once)"
                ]
            }],
            "matchedDocs": [
                "55fc2bc1fa794d1d0003e5ad",
                "55fb397fa932c51d00e6cc4f"
            ],
            "reportMode": "Function",
            "outcome": "Failed"
        }]
    },

    "timestampsec": 1443215333075
};










//
//var latestEventTestRegression = {
//  "_id": "5605b7e5c938431d00a89d4a",
//  "criteriaName": "DRATestDemo",
//  "mode": "decision",
//  "revision": 2,
//  "projectName": "eplassma1 | TestDRA",
//  "rules": [
//    {
//      "name": "Test Completed",
//      "mode": "advisory",
//      "conditions": [
//        {
//          "eval": "eventType",
//          "op": "=",
//          "value": "testComplete"
//        }
//      ],
//      "failures": [],
//      "functionResponse": [
//        {
//          "eval": "eventType",
//          "actualValue": "testComplete"
//        }
//      ],
//      "matchedDocs": [
//        "55fc2bc3fa794d1d0003e5ae"
//      ],
//      "reportMode": "Basic",
//      "outcome": "Success"
//    },
//    {
//      "name": "Code Coverage (Istanbul)",
//      "conditions": [
//        {
//          "eval": "eventType",
//          "op": "=",
//          "value": "istanbulCoverage"
//        },
//        {
//          "eval": "filecontents.total.lines.pct",
//          "op": ">=",
//          "value": "40"
//        },
//        {
//          "eval": "filecontents.(routes/criteria.js).lines.pct",
//          "op": ">=",
//          "value": "40"
//        }
//      ],
//      "failures": [],
//      "functionResponse": [
//        {
//          "eval": "eventType",
//          "actualValue": "istanbulCoverage"
//        },
//        {
//          "eval": "filecontents.total.lines.pct",
//          "actualValue": 65.14
//        },
//        {
//          "eval": "filecontents.(routes/criteria.js).lines.pct",
//          "actualValue": 92.11
//        }
//      ],
//      "matchedDocs": [
//        "55fc2bc0fa794d1d0003e5ac"
//      ],
//      "reportMode": "Basic",
//      "outcome": "Success"
//    },
//    {
//      "name": "Unit Test Success (Mocha)",
//      "conditions": [
//        {
//          "eval": "_mochaTestSuccessPercentage",
//          "op": "=",
//          "value": 100
//        }
//      ],
//      "failures": [
//        {
//          "failed": "_mochaTestSuccessPercentage evaluated as: [75], expected: [100], operation: [=]"
//        }
//      ],
//      "functionResponse": [
//        {
//          "functionname": "mochaTestSuccessPercentage",
//          "reportType": "UTSuccess",
//          "tests": 28,
//          "passes": 21,
//          "percentage": 75
//        }
//      ],
//      "matchedDocs": [
//        "55fc2bc1fa794d1d0003e5ad"
//      ],
//      "reportMode": "Function",
//      "outcome": "Failed"
//    },
//    {
//      "name": "Unit Test Regression (Mocha)",
//      "conditions": [
//        {
//          "eval": "_hasMochaTestRegressed",
//          "op": "=",
//          "value": false
//        }
//      ],
//      "failures": [
//        {
//          "failed": "_hasMochaTestRegressed evaluated as: [true], expected: [false], operation: [=]"
//        }
//      ],
//      "functionResponse": [
//        {
//          "functionname": "hasMochaTestRegressed",
//          "reportType": "UTRegression",
//          "returnValue": true,
//          "pipelinePast": {
//            "id": "eplassma1_TestDRA_18",
//            "timestamp": "2015-09-17T22:06:55.478Z"
//          },
//          "pipelineCurrent": {
//            "id": "eplassma1_TestDRA_34",
//            "timestamp": "2015-09-18T15:20:33.998Z"
//          },
//          "regressionOccured": true,
//          "regression": [
//            "test rules engine with advisory criteria",
//            "test rules engine with decision criteria",
//            "test rules engine with decision criteria - test all conditions",
//            "test rules engine with decision criteria - test all conditions, with one failure",
//            "test rules engine with decision criteria - test all conditions, with one failure (advisory)",
//            "test rules engine test boolean true",
//            "test rules engine Predefinedfunctions - hasMochaTestRegressed (run once)"
//          ]
//        }
//      ],
//      "matchedDocs": [
//        "55fc2bc1fa794d1d0003e5ad",
//        "55fb397fa932c51d00e6cc4f"
//      ],
//      "reportMode": "Function",
//      "outcome": "Failed"
//    }
//  ],
//  "score": "50%",
//  "decision": "Stop",
//  "eventType": "_decision",
//  "pipelineRunId": "eplassma1_TestDRA_34",
//  "timestamp": "2015-09-25T21:08:53.074Z",
//  "timestampsec": 1443215333075
//}
