var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected!');
});
var repoSchema = mongoose.Schema({
	id: {type: Number, unipue: true},
	login: {type: String},
	html_url: {type :String}
});


var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;