$(document).ready(function() {
	//pull instagram photos
	var userFeed = new Instafeed({
		get: 'user',
		userId: 5041998,
		accessToken: '5041998.467ede5.eda9b77bc7064a8db7088a9c2f774337',
		limit: 9, 
		resolution: 'low_resolution',
		clientId: 'e5905a0b63414b93b329c5222bc5d114'
	});

	userFeed.run();
});