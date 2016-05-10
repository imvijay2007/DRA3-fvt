module.exports = function(config) {

    'use strict';

    config.set({

        basePath: '../',

        frameworks: ['mocha', 'chai'],

        files: [

            '../../static/bower_components/angular/angular.js',
            '../../static/bower_components/angular-route/angular-route.js',
            '../../static/bower_components/angular-mocks/angular-mocks.js',
            '../../static/bower_components/angular-base64/angular-base64.js',
            '../../static/bower_components/d3/d3.min.js',
            '../../static/js/controllers.js',
            '../../static/js/report.js',
            '../../static/bower_components/d3-tip/index.js',


            'data/decision.js',
            'data/latestEventStopDecision.js',
            'data/latestEventStopAdvisoryDecision.js',
            'data/latestEventProceedDecision.js',
            'data/latestEventCoverageResult.js',
            'data/latestEventTestResult.js',
            'data/latestEventTestRegression.js',
            'data/latestEventCoverageRegression.js',
            'data/latestEventAttributesList.js',


            '../../static/partials/*.html',


            '*.spec.js'
        ],

        reporters: ['mocha', 'coverage', 'specjson'],

        preprocessors: {

            '../../static/js/*.js': ['coverage'],
            //'../../static/js/controllers.js': ['coverage'],
            //'../../static/js/report.js': ['coverage'],

            //location of templates
            '../../static/partials/*.html': 'ng-html2js'
                //'../../static/partials/coverageRegressionDrillDownGraph.html': 'ng-html2js'
        },

        ngHtml2JsPreprocessor: {
            // strip app from the file path
            stripPrefix: '.+/static',
            prependPrefix: ".."
        },

        // optionally, configure the reporter
        coverageReporter: {
            ///type: 'text',
            dir: 'coverage/',
            reporters: [
                // reporters not supporting the `file` property
                {
                    type: 'json-summary',
                    subdir: '.',
                    file: 'coverage.json'
                }, {
                    type: 'html',
                    subdir: 'report-html'
                }
            ]
        },

        specjsonReporter: {
            outputFile: "tests/client/results.json"
        },


        port: 9876,
        colors: true,
        autoWatch: false,
        //singleRun: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        browsers: ['PhantomJS'],

        // list of karma plugins
        plugins: [
            'karma-mocha',
            'karma-chai',
            //'karma-requirejs',
            //'karma-safari-launcher',
            'karma-coverage',
            'karma-mocha-reporter',
            'karma-ng-html2js-preprocessor',
            'karma-spec-json-reporter',
            'karma-phantomjs-launcher'
        ]

    });
};
