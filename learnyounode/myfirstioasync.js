var fs = require('fs'),
    filepath = process.argv[2],
    result = 0;
fs.readFile(filepath, 'utf8', function (err, data) {
    if (err != undefined) {
        console.log(err)
    }
    var result = data.split('\n').length - 1;
    console.log(result.toString());
});
