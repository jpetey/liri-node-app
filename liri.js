// Incorporate the "twitter" npm package
var Twitter = require('twitter');

// create a variable that allows LIRI to take in a command from terminal
var userInput = process.argv[2];

// requiring our twitterKeys exported from keys.js
var twitKeys = require("./keys.js");

var client = new Twitter(twitKeys.twitterKeys);

// Create a way to show your last 20 tweets and when they were created in your terminal/bash window.
var params = {
	screen_name: 'themontymonster',
	};

client.get('statuses/user_timeline.json', params, function(error, tweets, response) {
  if (!error) {

  	console.log("\nJP's Last 20 Tweets!\n")
  	
  	for (var i = 0; i < 5; i++) {
        
    	console.log((i + 1) + ". " + tweets[i].text + "\n");
    	console.log("Tweeted at: " + tweets[i].created_at + "\n\n");
	
	}
  }
});

