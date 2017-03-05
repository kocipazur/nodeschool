var http = require('http'),
    resultdata = '',
    number = 0;

http.get(process.argv[2],
    function (response) {
        response.on("data", function (data) {
            resultdata = resultdata + data.toString();
        });
        response.on("end", function () {
            console.log(resultdata.length);
            console.log(resultdata);
        })
    });
