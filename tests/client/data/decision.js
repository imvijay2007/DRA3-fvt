var decision = {
    _id: "5703ee9033cc4bcd0f712e71",
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
        rules: [{
            name: 'At least 100% success in unit tests (mocha)',
            conditions: [{
                eval: '_mochaTestSuccessPercentage',
                op: '>=',
                value: 100
            }],
            failures: [{
                failed: '_mochaTestSuccessPercentage evaluated as: [95], expected: [100], operation: [>=]'
            }],
            functionResponse: [{
                functionname: 'mochaTestSuccessPercentage',
                reportType: 'TestResult',
                tests: 21,
                passes: 20,
                percentage: 95
            }],
            matchedDocs: ['50979c81b280bb36564f7308d5f6def0'],
            outcome: 'Failed'
        }, {
            name: 'At least 80% code coverage in unit tests (istanbul)',
            conditions: [{
                eval: 'contents.total.lines.pct',
                op: '>=',
                value: '35',
                reportType: 'CoverageResult',
                forTool: 'istanbul'
            }],
            failures: [{
                failed: 'Could not find a document matching rule: At least 80% code coverage in unit tests (istanbul) and condition: undefined'
            }],
            functionResponse: [{
                eval: 'contents.total.lines.pct',
                actualValue: 32.54,
                evaluation: 'Failed',
                reportType: 'Basic'
            }],
            matchedDocs: [],
            outcome: 'Failed'
        }, {
            name: 'Did critical test cases pass (mocha)?',
            conditions: [{
                eval: '_hasMochaCriticalTestsPassed(\'security scan analysis\')',
                op: '=',
                value: true
            }],
            failures: [{
                failed: '_hasMochaCriticalTestsPassed(\'security scan analysis\') evaluated as: [false], expected: [true], operation: [=]'
            }],
            functionResponse: [{
                functionname: 'hasMochaCriticalTestsPassed',
                reportType: 'TestRegression',
                list: ['security scan analysis']
            }],
            matchedDocs: ['50979c81b280bb36564f7308d5f6def0'],
            returnval: false,
            outcome: 'Failed'
        }, {
            name: 'No Regression in Unit Tests (mocha)',
            conditions: [{
                eval: '_hasMochaTestRegressed',
                op: '=',
                value: false
            }],
            failures: [],
            functionResponse: [{
                functionname: 'hasMochaTestRegressed',
                reportType: 'TestRegression',
                returnValue: false
            }],
            matchedDocs: ['50979c81b280bb36564f7308d5f6def0'],
            outcome: 'Success'
        }, {
            name: 'No coverage regression in unit tests (istanbul)',
            conditions: [{
                eval: '_hasIstanbulCoverageRegressed(-2)',
                op: '=',
                value: false
            }],
            failures: [],
            functionResponse: [{
                functionname: 'hasIstanbulCoverageRegressed',
                reportType: 'CoverageRegression',
                returnValue: false
            }],
            matchedDocs: ['495dd7061655f4cbd5d7a130d746abbc'],
            outcome: 'Success'
        }],
        score: '40%',
        decision: 'Stop'
    }
};
