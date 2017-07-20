var express = require('express');
var app = express();
var Twitter = require('twitter');
var bodyParser  = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(request, response)
{
		response.render('index');
});
app.post('/list', function(request, response)
{
	var query_string = request.body.search_query;
	getTweetList(query_string, function(tweets)
	{
		response.send(JSON.stringify(tweets));
	});
});
var server = app.listen(8000, 'localhost', function()
{
	var host = server.address().address;
	var port = server.address().port;
	console.log("App listening at http://%s:%s", host, port);
});
var client = new Twitter({
	consumer_key: 'xxxxx',
	consumer_secret: 'xxxxx',
	access_token_key: 'xxxxx',
	access_token_secret: 'xxxxx',
});
function getTweetList(search_query, callback)
{
	client.get('/search/tweets.json', {q: search_query, count: 30}, function(error, params, response)
	{
		callback(params.statuses);
	});
}
