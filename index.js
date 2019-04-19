var express = require('express');
var mercury = require('@postlight/mercury-parser');
var port = process.env.PORT || 3000;

var app = express();

app.get('/', function (req, res) {
  var url = req.query.url;

  if(url) {
    console.log(`Fetching '${url}'`);
    mercury.parse(req.query.url).then(result => res.send(result));
  } else {
    console.log(`URL can't be empty!`);
  }
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
