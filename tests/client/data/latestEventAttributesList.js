var latestEventAttributesList = {
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
        criteriaName: 'DynamicCriteria_5d0975fb-b7d1-4c3d-b41e-70eef67eef08',
        mode: 'decision',
        projectName: 'JAIMEwasHERE',
        score: '40%',
        decision: 'Stop',
        "rules": [{
            "matchedDocs": [],
            "outcome": "Failed",
            "drilldownUrl": "https://www.ibm.com",
            "drilldownEventLogId": "56269834dcf3fb1d0080f695",
            "name": "compliance",
            "conditions": [{
                "eval": "filecontents.compliance.hits.hits.*._source.compliant",
                "op": "=",
                "value": "true",
                "reportType": "Attributes",
                "reportAttributes": [
                    "filecontents.compliance.hits.hits.*._source.description",
                    "filecontents.compliance.hits.hits.*._source.reason"
                ]
            }, {
                "eval": "filecontents.compliance.timed_out",
                "op": "=",
                "value": false
            }, {
                "eval": "eventType",
                "op": "=",
                "value": "SecurityScan"
            }],
            "failures": [{
                "failed": "Could not find matching filecontents.compliance.hits.hits.*._source.compliant: [true] by itself or along with other conditions"
            }],
            "functionResponse": [{
                "list": [
                    [{
                        "eval": "filecontents.compliance.hits.hits.3._source.description",
                        "actualValue": "Overall compliance verdict"
                    }, {
                        "eval": "filecontents.compliance.hits.hits.3._source.reason",
                        "actualValue": "Compliant count is 22 and noncompliant count is 1"
                    }],
                    [{
                        "eval": "filecontents.compliance.hits.hits.6._source.description",
                        "actualValue": "checking if ssh server is installed"
                    }, {
                        "actualValue": "SSH server package, openssh-server of version 1:6.6p1-2ubuntu2, found. SSH server package, openssh-sftp-server of version 1:6.6p1-2ubuntu2, found. ",
                        "eval": "filecontents.compliance.hits.hits.6._source.reason"
                    }],
                    [{
                        "eval": "filecontents.compliance.hits.hits.21._source.description",
                        "actualValue": "Overall compliance verdict"
                    }, {
                        "eval": "filecontents.compliance.hits.hits.21._source.reason",
                        "actualValue": "Compliant count is 22 and noncompliant count is 1"
                    }],
                    [{
                        "eval": "filecontents.compliance.hits.hits.52._source.description",
                        "actualValue": "Overall compliance verdict"
                    }, {
                        "eval": "filecontents.compliance.hits.hits.52._source.reason",
                        "actualValue": "Compliant count is 22 and noncompliant count is 1"
                    }],
                    [{
                        "eval": "filecontents.compliance.hits.hits.60._source.description",
                        "actualValue": "checking if ssh server is installed"
                    }, {
                        "eval": "filecontents.compliance.hits.hits.60._source.reason",
                        "actualValue": "Dup 1 SSH server package, openssh-server of version 1:6.6p1-2ubuntu2, found. SSH server package, openssh-sftp-server of version 1:6.6p1-2ubuntu2, found. "
                    }],
                    [{
                        "eval": "filecontents.compliance.hits.hits.69._source.description",
                        "actualValue": "checking if ssh server is installed"
                    }, {
                        "eval": "filecontents.compliance.hits.hits.69._source.reason",
                        "actualValue": "Dup SSH server package, openssh-server of version 1:6.6p1-2ubuntu2, found. SSH server package, openssh-sftp-server of version 1:6.6p1-2ubuntu2, found. "
                    }]
                ],
                "evaluation": "Failed",
                "reportType": "Attributes"
            }, {
                "actualValue": false,
                "evaluation": "Success",
                "reportType": "Basic",
                "eval": "filecontents.compliance.timed_out"
            }, {
                "evaluation": "Success",
                "reportType": "Basic",
                "eval": "eventType",
                "actualValue": "SecurityScan"
            }]
        }, {
            "matchedDocs": [
                "56269834dcf3fb1d0080f695"
            ],
            "outcome": "Success",
            "drilldownUrl": "https://www.ibm.com",
            "drilldownEventLogId": "56269834dcf3fb1d0080f695",
            "name": "vulnerability",
            "conditions": [{
                "eval": "eventType",
                "op": "=",
                "value": "SecurityScan"
            }, {
                "eval": "filecontents.vulnerability.hits.hits.*._source.vulnerable",
                "op": "=",
                "value": false,
                "reportType": "Attributes",
                "reportAttributes": [
                    "filecontents.vulnerability.hits.hits.*._source.namespace"
                ]
            }, {
                "eval": "filecontents.vulnerability.timed_out",
                "op": "=",
                "value": false
            }],
            "failures": [],
            "functionResponse": [{
                "eval": "eventType",
                "actualValue": "SecurityScan",
                "evaluation": "Success",
                "reportType": "Basic"
            }, {
                "eval": "filecontents.vulnerability.hits.hits.*._source.vulnerable",
                "actualValue": false,
                "evaluation": "Success",
                "reportType": "Basic"
            }, {
                "eval": "filecontents.vulnerability.timed_out",
                "actualValue": false,
                "evaluation": "Success",
                "reportType": "Basic"
            }]
        }]
    },

    "timestampsec": 1445520081185
};
