'user strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const parseTweet = require('./server/parseTweet');
const Ddos = require('ddos');

const app = express();
const router = express.Router();
const ddos = new Ddos({burst:3, limit:5});

let port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'API Initialized' });
});

router.route('/trumpthat')
  .post((req, res) => {
    let phrase = req.body.phrase;
    let tweet = parseTweet.trumpThat(phrase);

    return res.json({ message: tweet });
  });

app.use('/api', router);

app.use(ddos.express);

app.listen(port, () => {
  console.log(`api running on port ${port}`);
});

