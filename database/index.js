var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected!');
});
var repoSchema = mongoose.Schema({
	id: Number,
	username: String,
	url: Array
});


var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;