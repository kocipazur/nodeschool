var http = require('http'),
    async = require('async'),
    res1 = '',
    res2 = '',
    res3 = '';

async.parallel([
    function (callback) {
        http.get(process.argv[2],
        function (response) {
            response.on("data", function (data) {
                res1 = res1 + data.toString();
            });
            response.on("end", function () {
                callback(null, res1);
            })
        })},
    function (callback) {
        http.get(process.argv[3],
        function (response) {
            response.on("data", function (data) {
                res2 = res2 + data.toString();
            });
            response.on("end", function () {
                callback(null, res2);
            })
        })
    },
    function (callback) {
        http.get(process.argv[4],
        function (response) {
            response.on("data", function (data) {
                res3 = res3 + data.toString();
            });
            response.on("end", function () {
                callback(null, res3);
            })
        })
    }
], function (err, results) {
    for (i of results) console.log(i.toString());
});
