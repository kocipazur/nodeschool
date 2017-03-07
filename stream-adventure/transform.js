var through = require('through2');
var stream = through(function (buffer, encoding, next) {
    var tempString = buffer.toString();
    this.push(tempString.toUpperCase());
    next();
}, function (done) {
    done();
});

process.stdin.pipe(stream).pipe(process.stdout);
