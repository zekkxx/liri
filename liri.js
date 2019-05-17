//Instantiate Dependencies
require("dotenv").config();
var keys = require("./keys.js");
//var Spotify = require("node-spotify-api");
//var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

//Instantiate Global Variables
var cmdParam = process.argv[3];

function runCommand(cmdType){
    var dateTime = "[" + moment().format("YYYYMMDD-HH:mm::ss") + "] "; //Get current dateTime
    if(cmdParam != undefined){ //If parameter exists
        var logInfo = dateTime + cmdType + ":" + cmdParam; //Log command with parameter
    } else { //If no parameter
        var logInfo = dateTime + cmdType; //log command
    }
    //Log the actual command
    fs.appendFile("programLog.txt", logInfo + "\r\n", function(err){
        if(err){
            console.log(err);
        }
    })

    switch(cmdType){ //For the following:
        case "spotify-this-song":
            if(cmdParam == undefined){
                cmdParam = "The Sign";
            }
            break;
        case "concert-this":
            if(cmdParam == undefined){
                cmdParam = "Nickleback";
            }
            var queryUrl = "https://rest.bandsintown.com/artists/" + cmdParam + "/events?app_id=codingbootcamp";
            axios.get(queryUrl).then(function(response){
                for(let i=0; i<response.data.length; i++){
                    console.log("Concert #" + (i + 1));
                    console.log("Venue: " + response.data[i].venue.name)
                    console.log("Location: " + response.data[i].venue.city
                    + ", " + response.data[i].venue.region);
                    console.log(moment(response.data[i].datetime).format("MMM, Do YYYY, HH:mm"));
                    console.log(" ");
                }
            });
            break;
        case "movie-this":
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
            break;
        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function(err, data){
                if(err){
                    console.log(err);
                } else {
                    var dataArr = data.split(",");
                    cmdParam = dataArr[1]; //Because each case can take undefined
                    runCommand(dataArr[0]); //We can pass undefined along in recursion
                }
            });
            break;
        default:
            console.log("Input command not recognized.");
    }
}

runCommand(process.argv[2]); //run the command
