var express = require('express');
var fs = require('fs');


// the usage below is deprecated, replaced as shown
var app = express.createServer(express.logger());
// var app = express();

app.get('/', function(request, response) {

    var buf = new Buffer(5000);

    buf = fs.readFileSync("index.html");
    var output = buf.toString();

    response.send(output);
    });
var port = process.env.PORT || 8080;
  app.listen(port, function() {
  console.log("Listening on " + port);
});
