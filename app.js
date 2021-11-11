var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    var filePath = '.' + request.url;
    filePath = filePath.toLowerCase();
    if (filePath == './')
        filePath = './index.html';
    if (filePath == './about')
        filePath = './about.html';
    if (filePath == './img/gallery/graduation')
        filePath = './img/gallery/graduation.jpg';
    if (filePath == './img/gallery/study')
        filePath = './img/gallery/study.jpg';
    if (filePath == './video/memes')
        filePath = './video/memes.mp4';
    
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.mp4':
            contentType = 'video/mp4';
            break;
    }

    fs.readFile(path.join(__dirname, filePath), function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile(path.join(__dirname, 'error.html'), function(error, content) {
                    response.writeHead(404, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('500 - Internal error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(3000);

console.log("Server started on localhost:3000; press Ctrl+C to terminate");