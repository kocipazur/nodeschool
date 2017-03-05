var fs = require('fs'),
    path = require('path'),
    dir = process.argv[2],
    filter = process.argv[3],
    i = 0;

filter = '.' + filter;

fs.readdir(dir, function (err, list) {
    for (i of list) {
        if (path.extname(i) === filter) {
            console.log(i.toString());
        }
    }
});
