var express = require('express');
var bodyParser = require('body-parser');

var app = express()

// parse application/x-www-form-urlencoded
.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
.use(bodyParser.json())

.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

.listen(3000,()=>{
    console.clear();
    console.log("Here we go");
})
