var http = require('http'),
    url = require('url'),
    port = process.argv[2],
    server = {},
    date = {};


server = http.createServer(function (req, res) {
    if (url.parse(req.url).pathname === '/api/parsetime') {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        var reqDate = new Date(url.parse(req.url, true).query.iso);
        res.end(JSON.stringify({
            "hour": reqDate.getHours(),
            "minute": reqDate.getMinutes(),
            "second": reqDate.getSeconds()
        }));
    }
    else if (url.parse(req.url).pathname === '/api/unixtime') {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        var reqDate = new Date(url.parse(req.url, true).query.iso);
        res.end(JSON.stringify({
            "unixtime": reqDate.getTime()
        }));
    }
    else {
        res.end('Endpoint not found');
    };
});
server.listen(port, '127.0.0.1');
