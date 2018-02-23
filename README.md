# liri-node-app

Liri-node-app provides information from twitter, spotify and OMDB the following ways:

1.  You can request information from the command line like so:

To get a set of tweets from my account, type in:
node liri.js my-tweets

To get some information about a song, type in:
node liri.js spotify-this-song <"song name in quotes">

To get information on a movie, type in:
node liri.js movie-this <"movie name in quotes">

In addition, you can put the specific command you're looking for in a file and liri.js will read the file
and execute the command.  To call liri with a file, type in:
node liri.js do-what-is-says <file name, no quotes>

Here's some fun enhancements I made:
1.  If the song returned by Spotify has a preview, then I give you the option to play the preview in your browser.  
2.  If there is no preview returned, I let you chose to see all of the other records returned by spotify.
3.  If you don't type in a file name when calling "do-what-it-says", it will prompt the user for the file name.