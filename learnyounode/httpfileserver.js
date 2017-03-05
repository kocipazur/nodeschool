var http = require('http'),
    fs = require('fs'),
    port = process.argv[2],
    file = process.argv[3],
    server = {};


server = http.createServer(function (req, res) {
    var src = fs.createReadStream(file);
    src.pipe(res);
});
server.listen(port, '127.0.0.1');
