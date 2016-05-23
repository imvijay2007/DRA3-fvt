# FVT for DRA3 (JSON report format)
This directory containts test files (all files ending with .speces.js) & canned data under data folder. Canned data comprises the criteria & sample test results using which decisions are made and validated.
### STEPS:
* Navigate to project directory.
* Make sure Gruntfile.js has a grunt task 'dev-fvttest' which runs all the tests in /tests/fvt directory.
* Export 4 environment variables: DLMS_SERVER, DRA_SERVER, CF_USER, CF_PASS. While the first 2 variables are respective servers, last 2 variables are used to generate oauth-token which is used to post criteria, post results and make a decision. Without any one of these variables assigned, process will fail.
* Type 'grunt dev-fvttestfile' and view mocha running the FVTs.