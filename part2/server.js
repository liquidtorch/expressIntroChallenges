var express = require('express');
var app = express();
var fs = require("fs");
var port = process.env.PORT || 8000;
// var bodyParser = require('bodyParser');

app.get('/yourroute', (req, res) => {
  res.send("stuff");
});

app.post('/create/:name/:age', (req, res) => {
  var user = {
    name: req.params.name,
    age: parseInt(req.params.age)
  }
  let rawContent = fs.readFileSync('./storage.json', 'utf8');
  let content = JSON.parse(rawContent)
  content.push(user);
  console.log(content);
  fs.writeFileSync('./storage.json', JSON.stringify(content));
  res.send("HEY!!");
})

app.get('/', (req,res) => {
  let rawContent = fs.readFileSync('./storage.json', 'utf8');
  res.json(JSON.parse(rawContent));
})

app.get('/:name', (req,res) => {
  let rawContent = fs.readFileSync('./storage.json', 'utf8');
  let content = JSON.parse(rawContent)
  let result = content.filter(item => item.name === req.params.name)[0];
  if(result) {
    res.json(result);
  }else{
    res.sendStatus(400);
  }
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
