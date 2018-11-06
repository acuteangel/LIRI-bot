# LIRI-bot
## How to use
The application follows the following format:
$node /directory/liri.js [command] [parameters]

The available commands are:
1. concert-this
2. spotify-this-song
3. movie-this
4. do-what-it-says

## Previews
concert-this:

Displays up to 5 upcoming concerts for the specified artist

![](./screenshots/concert-this-kkb.PNG)

spotify-this-song:

Displays the artist, song name, spotify URL, and album of the given song name

![](./screenshots/spotify-this-song-simple-and-clean.PNG)

movie-this:

Displays the title, year, imdb rating, rotten tomatoes rating, country, languages, plot, and actors of the given movie

![](./screenshots/movie-this-the-dark-knight.PNG)

do-what-it-says:

Performs a random command with a random parameter from a list of options

![](./screenshots/do-what-it-says1.PNG)
![](./screenshots/do-what-it-says2.PNG)

## How it works
concert-this:

Uses the request package and the Bands in Town API

spotify-this-song:

Uses the request package and the Spotify API 

movie-this:

Uses the request package and the omdb API

do-what-it-says:

Uses the fs package to read the random.txt file. Splices based off of ";" for a pair of commands and arguments. Reads the command and performs the function with the paired parameter.