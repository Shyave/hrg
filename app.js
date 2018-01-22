var http = require('http');

http.createServer(function(req, res){
    res.end("Hello end\n");
}).listen(3000);

console.log('Server is running on http://localhost:3000/')
