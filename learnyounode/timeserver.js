var net = require('net'),
    date = new Date();
    port = process.argv[2],
    server = {},
    stringToReturn = '';

function getFullDate() {
    return date.getFullYear().toString() + '-' +
    pad((date.getMonth()+1).toString(), 2) + '-' +
    pad(date.getDate().toString(), 2) + ' ' +
    date.getHours().toString() + ':' +
    pad(date.getMinutes().toString(), 2);
};

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


server = net.createServer(function (socket) {
    stringToReturn = getFullDate();
    socket.end(stringToReturn + '\n');
});
server.listen(port);
