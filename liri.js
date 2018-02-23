
//this package includes our .env data
require("dotenv").config();

//this package. is used to get from an API
var request = require("request");

//twitters require and credentials
var Twitter = require('twitter');

//this package allows for read and write
var fs = require("fs");

//inquirer to get user input
var inquirer = require("inquirer");

//opn allows me to open the browser from the node
const opn = require('opn')

//spotify package
var Spotify = require('node-spotify-api');

var socialKeys = require('./keys.js');

var command = process.argv[2];
var arg = process.argv[3];


var spotifyApi = new Spotify(socialKeys.spotify);

var client = new Twitter(socialKeys.twitter);

// console.log("spotify: " + spotify);
// console.log("client: " + client);
 
switch (command) {
	case "my-tweets":
		getTweets();
		break;
	case "movie-this":
		showMovie(arg);
		break;
	case "do-what-it-says":
		readFile(arg);
		break;
	case "spotify-this-song":
		getSpotify(arg);
		break;
}


function getTweets() {

	var params = {screen_name: 'EmacNH'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
    		for (i=0; i<tweets.length; i++) {
    			var j = i + 1;
    			console.log("                Tweet #" + j + "  " + tweets[i].created_at);
  				console.log("-----------------------------------------------------------------------------------");
    			console.log(tweets[i].text);
    			console.log("-----------------------------------------------------------------------------------");
    			console.log("");
    			console.log("");
    			console.log("");
    		}
    		
  		} else {
  			console.log("got an error");
  		}
	});
}

function showMovie(movie) {
	if (movie == undefined) {
		movie = "Mr. Nobody";
	}

	var movieURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

	request(movieURL, function(error, response, body) {
  		if (!error && response.statusCode === 200) {
  			console.log("");
			console.log("");
			console.log("");
  			console.log("           " + JSON.parse(body).Title);
  			console.log("-----------------------------------------------------------------------------------");
    		console.log("Year Released: " + JSON.parse(body).Year);
    		console.log("IMDB Rating: " + JSON.parse(body).Rated);
    		console.log("Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    		console.log("Produced in: " + JSON.parse(body).Country);
    		console.log("Language: " + JSON.parse(body).Language);
    		console.log("Plot Summary: " + JSON.parse(body).Plot);
    		console.log("Actors: " + JSON.parse(body).Actors);
    		console.log("-----------------------------------------------------------------------------------");
    		console.log("");
			console.log("");
			console.log("");
  }
});
}

function readFile(fileName) {
	if (fileName == undefined) {
		inquirer.prompt([
			{
				type: "input",
				name: "file",
				message: "Input file Name --> "
			}]).then(function(userAnswer) {
				fileName = userAnswer.file;
				fs.readFile(fileName, "utf8", function(err, data) {
    				if (err) {
      					return console.log(err);
    				}

    				data = data.split(", ");

    				switch (data[0]) {
    					case "my-tweets":
						getTweets();
						break;
					case "movie-this":
						showMovie(data[1]);
						break;
					case "spotify-this-song":
						getSpotify(data[1]);
						break;
    			}
  			});
		});
	}
	
	else {

  		fs.readFile(fileName, "utf8", function(err, data) {
    		if (err) {
      			return console.log(err);
    		}

    		data = data.split(", ");

    		switch (data[0]) {
    			case "my-tweets":
				getTweets();
				break;
			case "movie-this":
				showMovie(data[1]);
				break;
			case "spotify-this-song":
				getSpotify(data[1]);
				break;
    		}
  		});
  	}

}

function getSpotify(song) {
	
	spotifyApi.search({ type: 'track', query: song }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
 
 		console.log("Number of records found: " + data.tracks.items.length);
 		console.log("First Record");
 		console.log("-----------------------------------------------------------------------------------");
		console.log("Song Name:    " + data.tracks.items[0].name);
		console.log("Artist Name:  " + data.tracks.items[0].album.artists[0].name); 
		console.log("Album:        " + data.tracks.items[0].album.name); 
		console.log("Preview Link: " + data.tracks.items[0].preview_url); 
		console.log("-----------------------------------------------------------------------------------");
		console.log("");
		console.log("");
		console.log("");


		if (data.tracks.items[0].preview_url != null) {
			inquirer.prompt([
				{
					type: "confirm",
					name: "playPreview",
					message: "Want to hear a preview?"
				}]).then(function(answer) {
				if (answer.playPreview) {
					opn(data.tracks.items[0].preview_url);
					process.exit();
				}
			})
		} else {
			inquirer.prompt([
  				{
    				type: "confirm",
    				name: "fullList",
    				message: "Would you like to see all records?"
  				}
  			]).then(function(answer) {
  				if (answer.fullList) {
  					for (i=0; i<data.tracks.items.length; i++) {
  						var j = i + 1;
  						console.log("                Record #" + j);
  						console.log("-----------------------------------------------------------------------------------");
						console.log("Song Name:    " + data.tracks.items[i].name);
						console.log("Artist Name:  " + data.tracks.items[i].album.artists[0].name); 
						console.log("Album:        " + data.tracks.items[i].album.name); 
						console.log("Preview Link: " + data.tracks.items[i].preview_url); 
						console.log("-----------------------------------------------------------------------------------");
						console.log("");
						console.log("");
						console.log("");
  					}
  				
  				}
			});
  		}
		
	});
}

