'use strict';

var express = require('express');
var app = express();
var router = require('./routes')
var PORT = process.env.PORT || 3000;

app.use(router);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
