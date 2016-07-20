$(document).ready(function() {
	//pull instagram photos
	var userFeed = new Instafeed({
		get: 'user',
		userId: 5041998,
		accessToken: '5041998.1677ed0.89dcf49f9361456888b1ff7e61e6ddee',
		limit: 28, 
		resolution: 'standard_resolution',
		clientId: '	7f76641c81e04ddd9262aa9a083af8e9'
	});

	userFeed.run();

	// $.ajax({
	// 	type: 'GET', 
	// 	url: 'https://api.twitter.com/1.1/statuses/user_timeline.json', 
	// 	dataType: 'jsonp', 
	// 	data: {
	// 		'screen_name': 'medhirb', 
	// 		count: 15, 
	// 	}, 
	// 	success: function(data) {
	// 		$('.twitter-box').append(data.toString());
	// 	}
	// });
});

