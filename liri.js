// Incorporate the fs package to read and write files
var fs = require ('fs');

// create a variable that allows LIRI to take in a command from terminal
var userInput = process.argv[2];
// Log userInput to log.txt
fs.appendFile("log.txt", "-----------------------------------\nUser Command Logged: " +  userInput + "\n");

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
			  	// Intro message to tweet list / log.txt
			  	console.log("\nJP's Last Tweets!\nDisclaimer: I just created my Twitter so these are all the Tweets I have")
			  	console.log("-------------------------");	 
			  	fs.appendFile("log.txt", "Command Output Logged:\n"); 	
			  	// Create a loop to loop through last 7 tweets
			  	for (var i = 0; i < 6; i++) {
			        // Log tweet texts to console & log.txt
			    	console.log((i + 1) + ". " + tweets[i].text);
			    	fs.appendFile("log.txt", (i + 1) + ". " + tweets[i].text + "\n");
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
				    	// Log intro message to console & log.txt
				    	console.log("You didn't choose a song... Ace of Base it is!:\n");
				    	fs.appendFile("log.txt", "Command Output Logged:\n"); 
				    	// Log artist info to console & log.txt
				    	console.log("Artist: " + data.artists[0].name);
				    	fs.appendFile("log.txt", "Artist: " + data.artists[0].name + "\n");
				    	// Log track name to console & log.txt
				    	console.log("Song Name: " + data.name);
				    	fs.appendFile("log.txt", "Song Name: " + data.name + "\n");
				    	// Log album info of track to console & log.txt
				    	console.log("Album: " + data.album.name);
				    	fs.appendFile("log.txt", "Album: " + data.album.name + "\n");
				    	// Provide a link to song clip to console & log.txt
				    	console.log("Listen to your song here: " + data.preview_url);
				    	fs.appendFile("log.txt", "Listen to your song here: " + data.preview_url + "\n");
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
				    	// Log intro message to console & log.txt
				    	console.log("Great song choice! Here are more details:\n");
				    	fs.appendFile("log.txt", "Command Output Logged:\n");
				    	// Log artist info to console & log.txt
				    	console.log("Artist: " + data.tracks.items[0].artists[0].name);
				    	fs.appendFile("log.txt", "Artist: " + data.tracks.items[0].artists[0].name + "\n");
				    	// Log track name to console & log.txt
				    	console.log("Song Name: " + data.tracks.items[0].name);
				    	fs.appendFile("log.txt", "Song Name: " + data.tracks.items[0].name + "\n");
				    	// Log album info of track to console & log.txt
				    	console.log("Album: " + data.tracks.items[0].album.name);
				    	fs.appendFile("log.txt", "Album: " + data.tracks.items[0].album.name + "\n");
				    	// Provide a link to song clip to console & log.txt
				    	console.log("Listen to your song here: " + data.tracks.items[0].preview_url);
				    	fs.appendFile("log.txt", "Listen to your song here: " + data.tracks.items[0].preview_url + "\n");
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
					  	// Log Intro messages to console & log.txt
					  	console.log("You didn't choose a movie... Mr. Nobody it is!")
					  	console.log("If you haven't watched it, you should. It's on Netflix! Here are more deets:\n")
					  	fs.appendFile("log.txt", "Command Output Logged:\n"); 
					  	// Log the title of the movie. to console & log.txt
						console.log("Movie Title: " + omdbObject.Title);
						fs.appendFile("log.txt", "Movie Title: " + omdbObject.Title + "\n");
						// Log the Year the movie came out. to console & log.txt
						console.log("Year Released: " + omdbObject.Year);
						fs.appendFile("log.txt", "Year Released: " + omdbObject.Year + "\n");
						// Log the IMDB Rating of the movie. to console & log.txt
						console.log("IMDB Rating: " + omdbObject.imdbRating);
						fs.appendFile("log.txt", "IMDB Rating: " + omdbObject.imdbRating + "\n");
						// Log the Country where the movie was produced. to console & log.txt
						console.log("Country Produced: " + omdbObject.Country);
						fs.appendFile("log.txt", "Country Produced: " + omdbObject.Country + "\n");
						// Log the Language of the movie. to console & log.txt
						console.log("Language: " + omdbObject.Language);
						fs.appendFile("log.txt", "Language: " + omdbObject.Language + "\n");
						// Log the Plot of the movie. to console & log.txt
						console.log("Plot: " + omdbObject.Plot);
						fs.appendFile("log.txt", "Plot: " + omdbObject.Plot + "\n");
						// Log the Actors in the movie. to console & log.txt
						console.log("Cast: " + omdbObject.Actors);
						fs.appendFile("log.txt", "Cast: " + omdbObject.Actors + "\n");
						// Log the Rotten Tomatoes Rating. to console & log.txt
						console.log("Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value);
						fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value + "\n");
						// Log the movie URL. to console & log.txt
						console.log("Website: " + omdbObject.Website);
						fs.appendFile("log.txt", "Website: " + omdbObject.Website + "\n");

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
					  	// Log Intro messages to console & log.txt
					  	console.log("Great Movie Choice! Here are more details.\n")
					  	fs.appendFile("log.txt", "Command Output Logged:\n"); 
					  	//LOG DETAILS:
							// Title of the movie console & log.txt
							console.log("Movie Title: " + omdbObject.Title);
							fs.appendFile("log.txt", "Movie Title: " + omdbObject.Title + "\n");
							// Year the movie came out console & log.txt
							console.log("Year Released: " + omdbObject.Year);
							fs.appendFile("log.txt", "Year Released: " + omdbObject.Year + "\n");
							// IMDB Rating of the movie console & log.txt
							console.log("IMDB Rating: " + omdbObject.imdbRating);
							fs.appendFile("log.txt", "IMDB Rating: " + omdbObject.imdbRating + "\n");
							// Country where the movie was produced console & log.txt
							console.log("Country Produced: " + omdbObject.Country);
							fs.appendFile("log.txt", "Country Produced: " + omdbObject.Country + "\n");
							// Language of the movie console & log.txt
							console.log("Language: " + omdbObject.Language);
							fs.appendFile("log.txt", "Language: " + omdbObject.Language + "\n");
							// Plot of the movie console & log.txt
							console.log("Plot: " + omdbObject.Plot);
							fs.appendFile("log.txt", "Plot: " + omdbObject.Plot + "\n");
							// Actors in the movie. console & log.txt
							console.log("Cast: " + omdbObject.Actors);
							fs.appendFile("log.txt", "Cast: " + omdbObject.Actors + "\n");
							// Rotten Tomatoes Rating. console & log.txt
							if (omdbObject.Ratings[1] === undefined) {
								console.log("Rotten Tomatoes Rating: None");
							} else {
								console.log("Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value);
								fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value + "\n");
							}
							
							// Website URL. console & log.txt
							console.log("Website: " + omdbObject.Website);
							fs.appendFile("log.txt", "Website: " + omdbObject.Website + "\n"); 	

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
	  	// Intro message to tweet list & log.txt
	  	console.log("\nJP's Last Tweets!\nDisclaimer: I just created my Twitter so these are all the Tweets I have")
	  	console.log("-------------------------");	
	  	fs.appendFile("log.txt", "Command Output Logged:\n");   	
	  	// Create a loop to loop through last 7 tweets
	  	for (var i = 0; i < 6; i++) {
	        // Log tweet texts to console & log.txt
	    	console.log((i + 1) + ". " + tweets[i].text);
	    	fs.appendFile("log.txt", (i + 1) + ". " + tweets[i].text + "\n");
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
		    	// Log intro message to console & log.txt
		    	console.log("You didn't choose a song... Ace of Base it is!:\n");
		    	fs.appendFile("log.txt", "Command Output Logged:\n"); 
		    	// Log artist info to console & log.txt
		    	console.log("Artist: " + data.artists[0].name);
		    	fs.appendFile("log.txt", "Artist: " + data.artists[0].name + "\n");
		    	// Log track name to console & log.txt
		    	console.log("Song Name: " + data.name);
		    	fs.appendFile("log.txt", "Song Name: " + data.name + "\n");
		    	// Log album info of track to console & log.txt
		    	console.log("Album: " + data.album.name);
		    	fs.appendFile("log.txt", "Album: " + data.album.name + "\n");
		    	// Provide a link to song clip to console & log.txt
		    	console.log("Listen to your song here: " + data.preview_url);
		    	fs.appendFile("log.txt", "Listen to your song here: " + data.preview_url + "\n");
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
		    	// Log intro message to console & log.txt
		    	console.log("Great song choice! Here are more details:\n");
		    	fs.appendFile("log.txt", "Command Output Logged:\n");
		    	// Log artist info to console & log.txt
		    	console.log("Artist: " + data.tracks.items[0].artists[0].name);
		    	fs.appendFile("log.txt", "Artist: " + data.tracks.items[0].artists[0].name + "\n");
		    	// Log track name to console & log.txt
		    	console.log("Song Name: " + data.tracks.items[0].name);
		    	fs.appendFile("log.txt", "Song Name: " + data.tracks.items[0].name + "\n");
		    	// Log album info of track to console & log.txt
		    	console.log("Album: " + data.tracks.items[0].album.name);
		    	fs.appendFile("log.txt", "Album: " + data.tracks.items[0].album.name + "\n");
		    	// Provide a link to song clip to console & log.txt
		    	console.log("Listen to your song here: " + data.tracks.items[0].preview_url);
		    	fs.appendFile("log.txt", "Listen to your song here: " + data.tracks.items[0].preview_url + "\n");
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
			  	// Log Intro messages to console & log.txt
			  	console.log("You didn't choose a movie... Mr. Nobody it is!")
			  	console.log("If you haven't watched it, you should. It's on Netflix! Here are more deets:\n")
			  	fs.appendFile("log.txt", "Command Output Logged:\n"); 
			  	// Log the title of the movie. to console & log.txt
				console.log("Movie Title: " + omdbObject.Title);
				fs.appendFile("log.txt", "Movie Title: " + omdbObject.Title + "\n");
				// Log the Year the movie came out. to console & log.txt
				console.log("Year Released: " + omdbObject.Year);
				fs.appendFile("log.txt", "Year Released: " + omdbObject.Year + "\n");
				// Log the IMDB Rating of the movie. to console & log.txt
				console.log("IMDB Rating: " + omdbObject.imdbRating);
				fs.appendFile("log.txt", "IMDB Rating: " + omdbObject.imdbRating + "\n");
				// Log the Country where the movie was produced. to console & log.txt
				console.log("Country Produced: " + omdbObject.Country);
				fs.appendFile("log.txt", "Country Produced: " + omdbObject.Country + "\n");
				// Log the Language of the movie. to console & log.txt
				console.log("Language: " + omdbObject.Language);
				fs.appendFile("log.txt", "Language: " + omdbObject.Language + "\n");
				// Log the Plot of the movie. to console & log.txt
				console.log("Plot: " + omdbObject.Plot);
				fs.appendFile("log.txt", "Plot: " + omdbObject.Plot + "\n");
				// Log the Actors in the movie. to console & log.txt
				console.log("Cast: " + omdbObject.Actors);
				fs.appendFile("log.txt", "Cast: " + omdbObject.Actors + "\n");
				// Log the Rotten Tomatoes Rating. to console & log.txt
				console.log("Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value);
				fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value + "\n");
				// Log the movie URL. to console & log.txt
				console.log("Website: " + omdbObject.Website);
				fs.appendFile("log.txt", "Website: " + omdbObject.Website + "\n");

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
			  	// Log Intro messages to console & log.txt
			  	console.log("Great Movie Choice! Here are more details.\n")
			  	fs.appendFile("log.txt", "Command Output Logged:\n"); 
			  	//LOG DETAILS:
					// Title of the movie console & log.txt
					console.log("Movie Title: " + omdbObject.Title);
					fs.appendFile("log.txt", "Movie Title: " + omdbObject.Title + "\n");
					// Year the movie came out console & log.txt
					console.log("Year Released: " + omdbObject.Year);
					fs.appendFile("log.txt", "Year Released: " + omdbObject.Year + "\n");
					// IMDB Rating of the movie console & log.txt
					console.log("IMDB Rating: " + omdbObject.imdbRating);
					fs.appendFile("log.txt", "IMDB Rating: " + omdbObject.imdbRating + "\n");
					// Country where the movie was produced console & log.txt
					console.log("Country Produced: " + omdbObject.Country);
					fs.appendFile("log.txt", "Country Produced: " + omdbObject.Country + "\n");
					// Language of the movie console & log.txt
					console.log("Language: " + omdbObject.Language);
					fs.appendFile("log.txt", "Language: " + omdbObject.Language + "\n");
					// Plot of the movie console & log.txt
					console.log("Plot: " + omdbObject.Plot);
					fs.appendFile("log.txt", "Plot: " + omdbObject.Plot + "\n");
					// Actors in the movie. console & log.txt
					console.log("Cast: " + omdbObject.Actors);
					fs.appendFile("log.txt", "Cast: " + omdbObject.Actors + "\n");
					// Rotten Tomatoes Rating. console & log.txt
					if (omdbObject.Ratings[1] === undefined) {
						console.log("Rotten Tomatoes Rating: None");
					} else {
						console.log("Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value);
						fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + omdbObject.Ratings[1].Value + "\n");
					}
					// Website URL. console & log.txt
					console.log("Website: " + omdbObject.Website);
					fs.appendFile("log.txt", "Website: " + omdbObject.Website + "\n"); 

					console.log("-------------------------");
			}
		});
	}
}




