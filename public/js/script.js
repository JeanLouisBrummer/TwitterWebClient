$(function()
{
	$("#search-submit").click(function()
	{
		loadTweet();
	});
	$('input[type=text]').on('keydown', function(e)
	{
		if (e.key == 'Enter')
		{
			e.preventDefault();
			loadTweet();
		}
	});
});
function loadTweet()
{
		var search_text = $('#search-query').val();
		if (search_text != '')
		{
			$('#tweets').html('Loading ...');
			$.post('http://localhost:8000/list', {search_query: search_text}, function(response)
			{
				var tweet_list = '';
				for (var i = 0; i < response.length; i++)
				{
					var tweet = response[i];
					tweet_list += '<div class="tweet">' +
							'<span class="tweet_user">' + tweet.user.name + '</span>' +
							'<span class="tweet_screen_name">@' + tweet.user.screen_name + '</span>' +
							'<span class="tweet_created"> . ' + parseDate(tweet.created_at) + '</span>' +
							'<div>' + tweet.text +'</div>' +
					'</div>';
				}
				$('#tweets').html(tweet_list);
			}, 'json');
		}
}
function parseDate(_d)
{
	var _date = _d.split(' ');
	return _date[1] + ' ' + _date[2] + ' ' + _date[_date.length - 1];
}
