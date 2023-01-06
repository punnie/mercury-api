#!/usr/bin/env node

const express = require('express');
const mercury = require('@postlight/mercury-parser');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.post('/content', function (req, res) {
  const body = req.body;
  const url = body.url;
  const userAgent = body.user_agent || 'GoogleBot';

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

const server = app.listen(port, function () {
  console.log(`Mercury API listening on port ${port}!`);
});

process.on('SIGTERM', function() {
  console.log("SIGTERM received! Mercury API shutting down...")
  server.close();
});
