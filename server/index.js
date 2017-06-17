var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var _ = require('underscore');
var repo = require('./data/index.js')

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));


app.post('/repos/import', function (req, res, next) {
  // TODO
  // let username = req.body.username;

  // let options = {
  // 	url: 'https://api.github.com/users/' + username + '/repos',
  // 	headers: {
  // 		'User-Agent': 'request'
  // 	}
  // };

  // request(options, function(err, response, body) {
  // 	if (err) {
  // 		throw err;
  // 	} else {
  // 		console.log('this is the body', body);
  // 	}
  // });
  	let username = req.body.username;
  	let options = {
  		url : 'https://api.github.com/users/' + username + '/repos',
  		headers : {
  			'User-Agent': 'request'
  		}
  	};

  	request(options, (err, response, body) => {
  		if (err) {
  			throw err;
  		} else {
  			let result = JSON.parse(body).slice(-25);
  			let data = _.pluck(result, 'name');
  			// console.log(result);
  			// console.log(_.pluck(result, 'name'));

  		}
  	});

});

app.get('/repos', function (req, res) {

});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

