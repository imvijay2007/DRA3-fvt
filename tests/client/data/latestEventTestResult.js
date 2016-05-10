var latestEventTestResult = {
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
        "projectName": "oneibmcloud | deploy-analytics-ci",
        "score": "100%",
        "decision": "Proceed",
        "rules": [{
            "name": "Unit Test Success (Mocha)",
            "conditions": [{
                "eval": "_mochaTestSuccessPercentage",
                "op": "=",
                "value": 38
            }],
            "failures": [],
            "functionResponse": [{
                "functionname": "mochaTestSuccessPercentage",
                "reportType": "TestResult",
                "tests": 63,
                "passes": 63,
                "percentage": 98
            }],
            "matchedDocs": [
                "56180099e0eecb1d001e4c40"
            ],
            "reportMode": "Function",
            "outcome": "Success"
        }]
    },

    "timestampsec": 1444413623671
};
