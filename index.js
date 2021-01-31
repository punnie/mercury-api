var express = require('express');
var mercury = require('@postlight/mercury-parser');
var port = process.env.PORT || 3000;

var app = express();

app.get('/', function (req, res) {
  var url = req.query.url;

  if(url) {
    console.log(`Fetching '${url}'`);

    mercury.parse(req.query.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0'
      }
    }).then(result => res.send(result));
  } else {
    console.log(`URL can't be empty!`);
  }
});

app.listen(port, function () {
  console.log(`Mercury API listening on port ${port}!`);
});
