var http = require('http'),
    map = require('through2-map'),
    port = process.argv[2],
    server = {};


server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        req.pipe(map(function (chunk) {
            return chunk.toString().toUpperCase();
        })).pipe(res);
    };
});
server.listen(port, '127.0.0.1');
