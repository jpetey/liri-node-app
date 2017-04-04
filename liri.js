// create a variable that allows LIRI to take in a command from terminal
var userInput = process.argv[2];

//TWITTER COMPONDENTS
	// Incorporate the "twitter" npm package
	var Twitter = require('twitter');

	// requiring our twitterKeys exported from keys.js
	var twitKeys = require("./keys.js");

	var client = new Twitter(twitKeys.twitterKeys);

	// Create a way to show your last 20 tweets and when they were created in your terminal/bash window.
	var params = {
		screen_name: 'themontymonster',
		};

//SPOTIFY COMPONENTS
	// Incorporate the "spotify" npm package
	var spotify = require('spotify');


if (userInput === "my-tweets") {

	client.get('statuses/user_timeline.json', params, function(error, tweets, response) {
	  if (!error) {

	  	console.log("\nJP's Last Tweets!\nDisclaimer: I just created my Twitter so these are all the Tweets I have")
	  	console.log("-------------------------");
	  	
	  	for (var i = 0; i < 6; i++) {
	        
	    	console.log((i + 1) + ". " + tweets[i].text);
	    	console.log("Tweeted at: " + tweets[i].created_at + "\n\n");		
		}	
	  }
	});

} else if (userInput === "spotify-this-song") {

	var userSong = process.argv;

	var processSong = "";

	processSong = userSong.slice(3).join(' ');

	spotify.search({ type: 'track', query: processSong }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    } else {
	    	console.log("-------------------------");
	    	console.log("Great song choice! Want more info?:\n");
	    	console.log("Artist: " + data.tracks.items[0].artists[0].name);
	    	console.log("Song Name: " + data.tracks.items[0].name);
	    	console.log("Album: " + data.tracks.items[0].album.name);
	    	console.log("Listen to you song here: " + data.tracks.items[0].preview_url);
	    }
	});

}

