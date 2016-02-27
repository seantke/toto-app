'use strict';

let express = require('express');
let app = express();
let PORT = 3000;

app.use('/node',express.static( __dirname+'/../node_modules'));
app.use(express.static(__dirname+ '/../public'));

app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
});
