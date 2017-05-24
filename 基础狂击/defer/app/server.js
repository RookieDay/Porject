var http = require('http');
var fs = require('fs');

var typeMaping = {
    'html':'text/html',
    'js':'text/javascript',
    'css':'text/css',
    'ico':'image/x-icon'
}

var getResourceExtension = function(req){
    var url = req.url;
    var lastIndexOfDot = url.lastIndexOf('.');
    if(lastIndexOfDot === -1) return 'text/plain';
    return url.substring(lastIndexOfDot + 1);
}

var responseResourceToClient = function(req,res){
    fs.createReadStream(req.url.replace(/^\//,'')).pipe(res);
}

var server = http.createServer(function(req,res){
    console.log('request url: ' + req.url);

    var extension = getResourceExtension(req);
    res.writeHead(200,{'Content-Type':typeMaping[extension]});
    var delay = function(time){
        setTimeout(function(){
            responseResourceToClient(req,res);
        },time || 0)
    }
     if (extension === 'html' || extension === 'css') {
        delay(0);
    } else if (extension === 'js') {
        delay(1000);
    } else {
        res.end('');
    }
});

server.listen(3000, () => {
    console.log('server is listening at port' + 3000);
});