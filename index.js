const express = require('express');
const mercury = require('@postlight/mercury-parser');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.post('/content', function (req, res) {
  const body = req.body;
  const url = body.url;
  const userAgent = body.user_agent ||  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0';

  if(url) {
    console.log(`Fetching '${url}'`);
    console.log(`Using user-agent '${userAgent}'`);

    mercury.parse(url, {
      headers: {
        'User-Agent': userAgent
      }
    }).then(result => res.send(result));
  } else {
    console.log(`URL can't be empty!`);
    res.send({error: "URL can't be empty!"});
  }
});

app.listen(port, function () {
  console.log(`Mercury API listening on port ${port}!`);
});
