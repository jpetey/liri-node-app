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
		screen_name: 'themontymonster'
		};

//SPOTIFY COMPONENTS
	// Incorporate the "spotify" npm package
	var spotify = require('spotify');

//REQUEST(OMDB) COMPONENTS
	// Incorporate the "request" npm package
	var request = require('request');

//DO WHAT IT SAYS COMPONENTS
	// Incorporate the fs package to read and write files
	var fs = require ('fs');

// BEGIN USER CHOICES


// What happens when the user types "do-what-it-says"
if (userInput === "do-what-it-says") {

	// Read from the "random.txt" file
	fs.readFile("random.txt", "utf8", function(error, data) {
		// Log contents of random.txt
  		// console.log(data);
  		// Split data by commas (create an array) to make it more readable
  		var dataArray = data.split(",");
		// Log the new array
	  	// console.log(dataArray);

	  	// Set a variable equal to index[0] of array in order to pull "command" (spotify-this-song)
	  	userCommandViaTxt = dataArray[0];
	  	// console.log(userCommandViaTxt); 

	  	// Set a variable equal to index[1] of array in order to pull song 
	  	userCommand2ViaTxt = dataArray[1];
	  	// console.log(userCommand2ViaTxt);

	  	if (userCommandViaTxt === "my-tweets") {

			// Get Tweet data from twitter based on params	
			client.get('statuses/user_timeline.json', params, function(error, tweets, response) {
			  // If no error occurs, log user (who's screen_name is specified in params) last 7 tweets
			  if (!error) {
			  	// Intro message to tweet list
			  	console.log("\nJP's Last Tweets!\nDisclaimer: I just created my Twitter so these are all the Tweets I have")
			  	console.log("-------------------------");	  	
			  	// Create a loop to loop through last 7 tweets
			  	for (var i = 0; i < 6; i++) {
			        // Log tweet texts
			    	console.log((i + 1) + ". " + tweets[i].text);
			    	// Log tweet creation dates
			    	console.log("Tweeted at: " + tweets[i].created_at + "\n\n");			
				// If error occurs, log error message
				} 
			} else if (error) {
				console.log("An error occured: " + error)
			}
		});

		// What happens when the user types 'spotify-this-song'
		} else if (userCommandViaTxt === "spotify-this-song") {
			
			// If the user doesn't type a song in...	
			if (userCommand2ViaTxt === "") {
				// Request info for The Sign by Ace of Basing (using song ID) from Spotify API
				spotify.lookup({ type: 'track', id: "0hrBpAOgrt8RXigk83LLNE" }, function(err, data) {
				    // If error occurs, log error message
				    if ( err ) {
				        console.log('Error occurred: ' + err);
				        return;
				    // If no errors occur, log data for the song...
				    } else {
				    	console.log("-------------------------");
				    	// Log intro message
				    	console.log("You didn't choose a song... Ace of Base it is!:\n");
				    	// Log artist info
				    	console.log("Artist: " + data.artists[0].name);
				    	// Log track name
				    	console.log("Song Name: " + data.name);
				    	// Log album info of track
				    	console.log("Album: " + data.album.name);
				    	// Provide a link to song clip
				    	console.log("Listen to your song here: " + data.preview_url);
				    }
				});
			
			// If the user types a song in...
			} else {
				
				spotify.search({ type: 'track', query: userCommand2ViaTxt }, function(err, data) {
				    // If error occurs, log error message
				    if ( err ) {
				        console.log('Error occurred: ' + err);
				        return;
				    // If no errors occur, log data for the song...
				    } else {
				    	console.log("-------------------------");
				    	// Log intro message
				    	console.log("Great song choice! Here are more details:\n");
				    	// Log artist info
				    	console.log("Artist: " + data.tracks.items[0].artists[0].name);
				    	// Log track name
				    	console.log("Song Name: " + data.tracks.items[0].name);
				    	// Log album info of track
				    	console.log("Album: " + data.tracks.items[0].album.name);
				    	// Provide a link to song clip
				    	console.log("Listen to your song here: " + data.tracks.items[0].preview_url);
				    }
				});
			}

		// What happens when the user types 'movie-this'
		} else if (userCommandViaTxt === "movie-this") {

			// If the user doesn't type a movie in...	
			if (userCommand2ViaTxt === "") {
				// Request info for Mr. Nobody from OMDB API
				request('http://www.omdbapi.com?t=mr+nobody', function (error, response, body) {
				 	// If error occurs, log error message
				 	if (error) {
						console.log('Error occurred: ' + error);
						return;
				  	// If not errors occur...
				  	} else if (body) {
				  		// Print the HTML for the page. 
					  	var omdbObject = JSON.parse(body); 
					  	// console.log(omdbObject)

					  	console.log("-------------------------");

					  	// Log Intro messages
					  	console.log("You didn't choose a movie... Mr. Nobody it is!")
					  	console.log("If you haven't watched it, you should. It's on Netflix! Here are more deets:\n")
					  	// Log the title of the movie.
						console.log("Movie Title: " + omdbObject.Title);
						// Log the Year the movie came out.
						console.log("Year Released: " + omdbObject.Year);
						// Log the IMDB Rating of the movie.
						console.log("IMDB Rating: " + omdbObject.imdbRating);
						// Log the Country where the movie was produced.
						console.log("Country Produced: " + omdbObject.Country);
						// Log the Language of the movie.
						console.log("Language: " + omdbObject.Language);
						// Log the Plot of the movie.
						console.log("Plot: " + omdbObject.Plot);
						// Log the Actors in the movie.
						console.log("Cast: " + omdbObject.Actors);
						// Log the Rotten Tomatoes Rating.
						console.log("Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value);
						// Log the movie URL.
						console.log("Website: " + omdbObject.Website);

						console.log("-------------------------");
					}
				});
			// If the user types a movie in...	
			} else {
				
				// Request info for that user-input from Spotify API
				request('http://www.omdbapi.com?t=' + userCommand2ViaTxt, function (error, response, body) {
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
							console.log("Language: " + omdbObject.Language);
							// Plot of the movie.
							console.log("Plot: " + omdbObject.Plot);
							// Actors in the movie.
							console.log("Cast: " + omdbObject.Actors);
							// Rotten Tomatoes Rating.
							if (omdbObject.Ratings[1] === undefined) {
								console.log("Rotten Tomatoes Rating: None");
							} else {
								console.log("Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value);
							}
							// Rotten Tomatoes URL.
							console.log("Website: " + omdbObject.Website);

							console.log("-------------------------");
					}
				});
			}
		} 

	});

// What happens when the user types 'my-tweets'
} else if (userInput === "my-tweets") {

	// Get Tweet data from twitter based on params	
	client.get('statuses/user_timeline.json', params, function(error, tweets, response) {
	  // If no error occurs, log user (who's screen_name is specified in params) last 7 tweets
	  if (!error) {
	  	// Intro message to tweet list
	  	console.log("\nJP's Last Tweets!\nDisclaimer: I just created my Twitter so these are all the Tweets I have")
	  	console.log("-------------------------");	  	
	  	// Create a loop to loop through last 7 tweets
	  	for (var i = 0; i < 6; i++) {
	        // Log tweet texts
	    	console.log((i + 1) + ". " + tweets[i].text);
	    	// Log tweet creation dates
	    	console.log("Tweeted at: " + tweets[i].created_at + "\n\n");			
		// If error occurs, log error message
		} 
	} else if (error) {
		console.log("An error occured: " + error)
	}
});

// What happens when the user types 'spotify-this-song'
} else if (userInput === "spotify-this-song") {
	// Define a variable equal to Command Prompt user song input
	var userSong = process.argv;
	// Define a variable to store user input into a string
	var processSong = "";
	// set processSong variable to take in & join together all user input data after process.argv[2] position
	processSong = userSong.slice(3).join(' ');
	
	// If the user doesn't type a song in...	
	if (processSong === "") {
		// Request info for The Sign by Ace of Basing (using song ID) from Spotify API
		spotify.lookup({ type: 'track', id: "0hrBpAOgrt8RXigk83LLNE" }, function(err, data) {
		    // If error occurs, log error message
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    // If no errors occur, log data for the song...
		    } else {
		    	console.log("-------------------------");
		    	// Log intro message
		    	console.log("You didn't choose a song... Ace of Base it is!:\n");
		    	// Log artist info
		    	console.log("Artist: " + data.artists[0].name);
		    	// Log track name
		    	console.log("Song Name: " + data.name);
		    	// Log album info of track
		    	console.log("Album: " + data.album.name);
		    	// Provide a link to song clip
		    	console.log("Listen to your song here: " + data.preview_url);
		    }
		});
	
	// If the user types a song in...
	} else {
		
		spotify.search({ type: 'track', query: processSong }, function(err, data) {
		    // If error occurs, log error message
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    // If no errors occur, log data for the song...
		    } else {
		    	console.log("-------------------------");
		    	// Log intro message
		    	console.log("Great song choice! Here are more details:\n");
		    	// Log artist info
		    	console.log("Artist: " + data.tracks.items[0].artists[0].name);
		    	// Log track name
		    	console.log("Song Name: " + data.tracks.items[0].name);
		    	// Log album info of track
		    	console.log("Album: " + data.tracks.items[0].album.name);
		    	// Provide a link to song clip
		    	console.log("Listen to your song here: " + data.tracks.items[0].preview_url);
		    }
		});
	}

// What happens when the user types 'movie-this'
} else if (userInput === "movie-this") {
	// Define a variable equal to Command Prompt user movie inputs
	var userMovie = process.argv;
	// Define a variable to store user input into a string
	var processMovie = "";
	// set processMovie variable to take in & join together all user input data after process.argv[2] position
	processMovie = userMovie.slice(3).join(' ');

	// If the user doesn't type a movie in...	
	if (processMovie === "") {
		// Request info for Mr. Nobody from OMDB API
		request('http://www.omdbapi.com?t=mr+nobody', function (error, response, body) {
		 	// If error occurs, log error message
		 	if (error) {
				console.log('Error occurred: ' + error);
				return;
		  	// If not errors occur...
		  	} else if (body) {
		  		// Print the HTML for the page. 
			  	var omdbObject = JSON.parse(body); 
			  	// console.log(omdbObject)

			  	console.log("-------------------------");

			  	// Log Intro messages
			  	console.log("You didn't choose a movie... Mr. Nobody it is!")
			  	console.log("If you haven't watched it, you should. It's on Netflix! Here are more deets:\n")
			  	// Log the title of the movie.
				console.log("Movie Title: " + omdbObject.Title);
				// Log the Year the movie came out.
				console.log("Year Released: " + omdbObject.Year);
				// Log the IMDB Rating of the movie.
				console.log("IMDB Rating: " + omdbObject.imdbRating);
				// Log the Country where the movie was produced.
				console.log("Country Produced: " + omdbObject.Country);
				// Log the Language of the movie.
				console.log("Language: " + omdbObject.Language);
				// Log the Plot of the movie.
				console.log("Plot: " + omdbObject.Plot);
				// Log the Actors in the movie.
				console.log("Cast: " + omdbObject.Actors);
				// Log the Rotten Tomatoes Rating.
				console.log("Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value);
				// Log the movie URL.
				console.log("Website: " + omdbObject.Website);

				console.log("-------------------------");
			}
		});
	// If the user types a movie in...	
	} else {
		
		// Request info for that user-input from Spotify API
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
					console.log("Language: " + omdbObject.Language);
					// Plot of the movie.
					console.log("Plot: " + omdbObject.Plot);
					// Actors in the movie.
					console.log("Cast: " + omdbObject.Actors);
					// Rotten Tomatoes Rating.
					if (omdbObject.Ratings[1] === undefined) {
						console.log("Rotten Tomatoes Rating: None");
					} else {
						console.log("Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value);
					}
					// Rotten Tomatoes URL.
					console.log("Website: " + omdbObject.Website);

					console.log("-------------------------");
			}
		});
	}
}



