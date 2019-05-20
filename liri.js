//Instantiate Dependencies
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//Instantiate Global Variables
var cmdParam = process.argv[3];

function logFile(cmdType){
    var dateTime = "[" + moment().format("YYYYMMDD-HH:mm::ss") + "] "; //Get current dateTime
    if(cmdParam != undefined){ //If parameter exists
        var logInfo = dateTime + cmdType + ":" + cmdParam; //Log command with parameter
    } else { //If no parameter
        var logInfo = dateTime + cmdType; //log command
    }
    //Log the actual command
    fs.appendFile("programLog.txt", logInfo + "\r\n", function(err){
        if(err){
            console.log(err); //if error received, give error
        }
    })
}

function spotSong(){
    if(cmdParam == undefined){
        cmdParam = "The Sign"; //if no parameter, parameter is The Sign
    }
    spotify.search({ type: 'track', query: cmdParam, limit: 1 }) //Get one track from spotify
    .then(function(response) {
        for(let i=0; i<response.tracks.items.length; i++){ // for each track in spotify response
            var artistString = ""; //clear the artists available
            console.log("Song Title: " + response.tracks.items[i].name);
            for(let artist = 0; artist<response.tracks.items[i].artists.length; artist++){
                artistString += " " + response.tracks.items[i].artists[artist].name + ","; //for each artist on track, add them to artist string
            }
            console.log("Artists:" + artistString);
            console.log("Album: " + response.tracks.items[i].album.name);
            console.log("Preview URL: " + response.tracks.items[i].preview_url);
        }
    }).catch(function(err) {
        console.log(err); //If error received, give error
    });
}

function concertBand(){
    if(cmdParam == undefined){
        cmdParam = "Nickleback"; //if no parameter, parameter is Nickleback
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + cmdParam + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function(response){ //get response from bandsintown
        for(let i=0; i<response.data.length; i++){ //for each item in response
            console.log("Concert #" + (i + 1)); //Title as a concert #
            console.log("Venue: " + response.data[i].venue.name) //Give the venue name
            console.log("Location: " + response.data[i].venue.city //Give the venue city
            + ", " + response.data[i].venue.region); //and its state
            console.log(moment(response.data[i].datetime).format("MMM, Do YYYY, HH:mm")); //Give the time
            console.log(" "); //Make a blank line
        }
    });
}

function postMovie(){
    if(cmdParam == undefined){
        cmdParam = "Mr. Nobody" //If no parameter, parameter is Mr. Nobody
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + cmdParam + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(function(response){ //get response from omdbapi
        console.log("Movie Title: "+response.data.Title);
        console.log("Release Year: "+response.data.Year);
        console.log("OMDB Rating: "+response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes: "+response.data.Ratings[1].Value);
        console.log("Country of Filming: "+response.data.Country);
        console.log("Languages: "+response.data.Language);
        console.log("Plot: "+response.data.Plot);
        console.log("Actors: "+response.data.Actors);
    });
}

fs.readFile("random.txt", "utf8", function(err, data){ //read random.txt
    if(err){ //if error occurs
        console.log(err); //show error
    } else {
        var dataArr = data.split(","); //creat an array split on the ','
        cmdParam = dataArr[1]; //Because each case can take undefined
        runCommand(dataArr[0]); //We can pass undefined along in recursion
    }
});

function runCommand(cmdType){
    logFile(cmdType);

    switch(cmdType){ //For the following:
        case "spotify-this-song":
            spotSong();
            break;
        case "concert-this":
            concertBand();
            break;
        case "movie-this":
            postMovie();
            break;
        case "do-what-it-says":
            doWhatRandomSays();
            break;
        default: //If command not recognized, give information on what commands are available
            console.log("Input command not recognized. Available functions:");
            console.log("do-what-it-says");
            console.log("movie-this '<Movie Title>'");
            console.log("concert-this '<Band Name>'");
            console.log("sportify-this-song '<Song Title>'");
    }
}

runCommand(process.argv[2]); //run the switch statement
