require("dotenv").config();
var request = require("request")
var fs = require("fs")
var keys = require("./keys.js");
var moment = require("moment")
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var name = process.argv[3];
if (process.argv.length>4){
    for (i=4; i<process.argv.length; i++){
        name += " "+process.argv[i]
    }
}
if (command == "concert-this"){
    concertThis(name);
} else if (command == "spotify-this-song") {
    spotifyThisSong(name);
} else if (command == "movie-this") {
    movieThis(name);
} else if (command == "do-what-it-says") {
    doWhatItSays();
} else {
    console.log("please submit a valid command: concert-this/spotify-this-song/movie-this/do-what-it-says")
}

function concertThis(arg){
    if (arg == null) {
        return console.log("please enter a band name")
    }
    arg = "https://rest.bandsintown.com/artists/" + arg + "/events?app_id=codingbootcamp"
    request(arg, function(error, response, body){
        if (!JSON.parse(body)[0]){
            return console.log("no results found");
        }
        for (i = 0; i<JSON.parse(body).length && i < 5; i++){
            console.log("\nVenue: "+JSON.parse(body)[i].venue.name)
            console.log("City: "+JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[i].venue.country)
            console.log("Date: "+moment(JSON.parse(body)[i].datetime).format("MM/DD/YYYY"))
        }
    })
}

function spotifyThisSong(arg){
    if (arg == null){
        arg = "The Sign"
    }
    spotify.search({type: 'track', query: arg}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        console.log("\nArtist: "+data.tracks.items[0].artists[0].name)
        console.log("Song: "+data.tracks.items[0].name)
        console.log("URL: "+data.tracks.items[0].external_urls.spotify)
        console.log("Album: "+data.tracks.items[0].album.name)
    })
}

function movieThis(arg){
    if (arg == null){
        arg = "Mr.Nobody"
    }
    request("http://www.omdbapi.com/?t="+arg+"&y=&plot=short&apikey=trilogy", function(error, response, body) {        
        if (!error && response.statusCode === 200) {
            console.log("\nMovie: "+JSON.parse(body).Title);
            console.log("Year released:" +JSON.parse(body).Year);
            console.log("imdb Rating: "+JSON.parse(body).imdbRating);
            console.log("Rotten Tomato score: "+JSON.parse(body).Ratings[1].Value);
            console.log("Countries: "+JSON.parse(body).Country);
            console.log("Language(s): "+JSON.parse(body).Language);
            console.log("Plot: "+JSON.parse(body).Plot);
            console.log("Actors: "+JSON.parse(body).Actors);
        }
    });
}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }      
        
        var output = data.split(";");
        var random = output[Math.floor(Math.random()*output.length)]
        random = random.split(",")
        console.log(random)
        if (random[0] == "concert-this"){
            concertThis(random[1]);
        } else if (random[0] == "spotify-this-song") {
            spotifyThisSong(random[1]);
        } else if (random[0] == "movie-this") {
            movieThis(random[1]);
        }
      });
}