require('dotenv').config()

let express = require('express');
let app = express();

console.log('Hello World');

app.use('/public', express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const output = `${req.method} ${req.path} - ${req.ip}`;
  console.log(output);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;
  const message = 'Hello json';
  res.json({ message: messageStyle === 'uppercase' ? message.toUpperCase() : message });
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time });
});

app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

app.route('/name')
  .get((req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}`});
  });

module.exports = app;
