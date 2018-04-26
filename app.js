var express = require('express');
var request = require('request');
var async = require('async');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
  host     : '10.20.14.82',
  user     : 'root',
  password : 'root',
  database : 'loandb'
});
app.use(bodyParser.json());

app.get('/', function (req, res) {
  console.log("reached - ")
  res.send('Well! "Hello World"., </br> This is credit score check service. Please redirect your calls to /creditscore with appropriate arguments.');
});

app.post('/creditscore', function(req, res){
  console.log("req.body - ", req.body);
  var param = '';
  for(i=0;i<=req.body.ssn.length;i++){
    if(param==''){
        param = param + '"' +req.body.ssn[i] + '"';
    }else if(req.body.ssn[i]){
      param = param + ',"' +req.body.ssn[i] + '"';
    }

    if(i==req.body.ssn.length){
      var query = 'SELECT * from creditscore WHERE ssn IN (' + param + ')';
      console.log("param - ",param);
      console.log("query - ",query);
      console.log("Credit qurey - ", query);
    	connection.query(query, function (err, rows, fields) {
    	if (err) throw err
    	  res.json(rows)
    	})
    }
  }
});




app.listen(3000, function () {
  console.log("I'm listening to you on port 3000!");
});
