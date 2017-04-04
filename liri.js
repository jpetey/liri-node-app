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

//REQUEST(OMDB) COMPONENTS
	// Incorporate the "request" npm package
	var request = require('request');


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

} else if (userInput === "spotify-my-song") {

	var userSong = process.argv;

	var processSong = "";

	processSong = userSong.slice(3).join(' ');

	if (processSong === "") {

		spotify.lookup({ type: 'track', id: "0hrBpAOgrt8RXigk83LLNE" }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    } else {
		    	// console.log(data)
		    	console.log("-------------------------");
		    	console.log("You didn't choose a song... Ace of Base it is!:\n");
		    	console.log("Artist: " + data.artists[0].name);
		    	console.log("Song Name: " + data.name);
		    	console.log("Album: " + data.album.name);
		    	console.log("Listen to your song here: " + data.preview_url);
		    }
		});

	} else {

		spotify.search({ type: 'track', query: processSong }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    } else {
		    	console.log("-------------------------");
		    	console.log("Great song choice! Here are more details?:\n");
		    	console.log("Artist: " + data.tracks.items[0].artists[0].name);
		    	console.log("Song Name: " + data.tracks.items[0].name);
		    	console.log("Album: " + data.tracks.items[0].album.name);
		    	console.log("Listen to your song here: " + data.tracks.items[0].preview_url);
		    }
		});
	}
} else if (userInput === "movie-this") {

	var userMovie = process.argv;

	var processMovie = "";

	processMovie = userMovie.slice(3).join(' ');

	request('http://www.omdbapi.com?t=' + processMovie, function (error, response, body) {
	  if (error) {
		console.log('Error occurred: ' + error);
		return;
	  
	  } else if (body) {
	  	// Print the HTML for the page. 
	  	var omdbObject = JSON.parse(body); 
	  	// console.log(omdbObject)
	  	console.log("-------------------------");
	  	console.log("Great Movie Choice! Here are more details.\n")
	  	//LOG DETAILS:
			// Title of the movie.
			console.log("Movie Title: " + omdbObject.Title);
			// Year the movie came out.
			console.log("Year Released: " + omdbObject.Year);
			// IMDB Rating of the movie.
			console.log("IMDB Rating: " + omdbObject.imdbRating);
			// Country where the movie was produced.
			console.log("Country Produced: " + omdbObject.Country);
			// Language of the movie.
			console.log("Lamguage: " + omdbObject.Language);
			// Plot of the movie.
			console.log("Plot: " + omdbObject.Plot);
			// Actors in the movie.
			console.log("Cast: " + omdbObject.Actors);
			// Rotten Tomatoes Rating.
			console.log("Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value);
			// Rotten Tomatoes URL.
			console.log("Website: " + omdbObject.Website);

			console.log("-------------------------");
	  }
	});

}

