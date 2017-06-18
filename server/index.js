var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var _ = require('underscore');
var db = require('../database/index.js');
// var data = require('../data.json');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.post('/repos/import', function (req, res, next) {
  	let username = req.body.username;
  	let options = {
  		url : 'https://api.github.com/users/' + username + '/repos',
		//   url: 'https://api.github.com/search/repositories?q=user:' + username,
  		headers : {
  			'User-Agent': 'request'
  		}
  	};

  	request(options, (err, response, body) => {
  		if (err) {
  			console.log(err);
  		} else {

  			let result = JSON.parse(body).slice(-25);
			//   let result = data;
				
				result.forEach( (each) => {
					let id = each['owner']['id'];
					let login = each['owner']['login'];
					let url = each['owner']['html_url'];
					let user = new db({id: id, login: login, html_url: url});
					console.log('this is the user data',user);
					user.save();
					console.log('saved');
				});
			
				
  		}
		});
		// var test = db.find((err, dbs) => {
		// 	if (err) return console.log(err);
		// 	console.log(dbs);
		// });
		// var test = db.find({'login': 'betterkenly'});
		// console.log('this is the database result:' , test);

});

app.get('/repos', (req, res) => {
	console.log('this is the req------' , req.url.substring(16));
	var username = req.url.substring(16);

	Promise.resolve(db.find({'login': username}))
	.then(res.send(JSON.stringify(data)));

});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

