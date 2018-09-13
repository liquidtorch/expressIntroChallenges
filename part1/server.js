var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.get('/hello', function(req, res) {
  res.send("Hello");
})

app.post('/create/:name', function(req, res) {
  var name = `Your name is: ${req.params.name}`;
  res.send(name);
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
})



app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
