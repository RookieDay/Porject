var fs = require('fs');
var begin = +new Date();

fs.readFile('./喜欢你.lrc', function(err, data) {
    if (err) {
        throw err;
    }
    data = data.toString();
    var lines = data.split('\n');
    var regex = /\[(\d{2})\:(\d{2})\.(\d{2})\](.+)/;
    lines.forEach(function(line, index) {
        var matches = regex.exec(line)
        if (matches) {
            var m = matches[1];
            var s = matches[2];
            var ms = matches[3];
            var content = matches[4];
            var offset = +new Date() - begin;
            var time = parseInt(m) * 60 * 1000 + parseInt(s) * 1000 + parseInt(ms) - offset;
            setTimeout(function() {
                console.log(content);
            }, time)
        }
    })
})


// function parseJsonStrToObj(str, callback) {
//     process.nextTick(function() {
//         try {
//             var jsonObj = JSON.parse(str);
//             callback(null, jsonObj);
//         } catch (e) {
//             callback(e, null);
//         }
//     });
// }
// parseJsonStrToObj('{"foo":"bar"}', function(err, obj) {
//     if (err) {
//         return console.log('error');
//     }
//     console.log('correct:' + obj)
// })