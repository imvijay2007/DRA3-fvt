exports.decision = function getdecision(server, query, callback) {
    //console.log("server:",server);console.log("result:",result);
    request({
        method: 'POST',
        url: server + '/api/v3/decision?org_name=' + query.org_name,
        json: true,
        body: query,
        headers: {
            Authorization: 'bearer ' + bmtoken
        }
    }, function(err, resp, body) {
        if (err) {
            if((typeof(process.env.FVT_DEBUG) !== 'undefined') && (process.env.FVT_DEBUG === "true"))
            console.log("Aborted- ", err);
            assert_response = 1; // Just to flag the response anything else than success (200)
        } else {
            if (resp.statusCode === 200) {
                assert_response = resp.statusCode;
                assert_proceed = body.contents.proceed;
                assert_score = body.contents.score;
                decision_rules = body.contents.rules;
                if((typeof(process.env.FVT_DEBUG) !== 'undefined') && (process.env.FVT_DEBUG === "true"))
                console.log(JSON.stringify(body));
            } else {
                if((typeof(process.env.FVT_DEBUG) !== 'undefined') && (process.env.FVT_DEBUG === "true"))
                console.log("Get decision failed:", body);
                assert_response = 1; // Just to flag the response anything else than success (200)
            }
        }
        callback();
    });
};
