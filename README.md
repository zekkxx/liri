# liri-node-app
A Language Interpretation and Recognition Interface utilizing Node.js

# Specifications:
LIRI will search Spotify, Bands in Town, and OMDB using Axios for these APIs.  
Use Node for: Node-Spotify-API, Axios (OMDB, Bands In Town), Moment, DotEnv  
Record video, screenshots, etc and provide links proving this project works in README.md  
Screenshots/README will be the source of this content, utilize this to teach people how to use the application  

# Instructions:
1. Utilize `npm init -y` to initialize your pacakge.json  
2. Make a .gitignore and add:  
  ```
    node_modules
    .DS_Store
    .env
  ```  
3. Make a javascript file keys.js  
  ```
    console.log('this is loaded');
    exports.spotify = {
      id: process.env.SPOTIFY_ID,
      secret: process.env.SPOTIFY_SECRET
    };
  ```  
4. Make a .env and add:  
  ```
    # Spotify API keys
    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret
  ```  
//If someone wants to clone and run the app themselves they will need to supply their own .env file  
5. Make a file random.txt and write the following `spotify-this-song,"I want it That Way"`  
6. Make a javascript file liri.js and add:  
  ```
    require("dotenv").config();
    var keys = require("./keys.js");
    var spotify = new Spotify(keys.spotify);
  ```  
7. Allow liri to take the following commands:  
  `concert-this`  
    -`node liri.js concert-this <artist/band name>`  
    searches: Band in Town Artist Events API 
    `"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`  
    render: Name of Venue, Location, Date of Event (MM/DD/YYYY)  
  `spotify-this-song`  
    Utilize node-spotify-api (requires sign up as developer)
    -`node lirie.js spotify-this-song <song name here>`  
    render: Artist(s), Song Name, preview link from Spotify, album  
    If nothing found: default to "The Sign" by Ace of Base  
  `movie-this`
    -`node liri.js movie-this <movie name here>`
    render: Title, Release Year, IMDB Rating, Rotten Tomatoes, Country, Language, Plot, Actors
    If nothing found: Mr. Nobody
  `do-what-it-says`
    -`node liri.js do-what-it-says`
    Using fs node pacakage, take text of random.txt and use it to call LIRI's commands
8. create dynamic log.txt (Optional)


# Spotify Developer Process:
1. https://developer.spotify.com/my-applications/#!/
2. Log in or create new account
3. https://developer.spotify.com/my-applications/#!/applications/create
4. Get client id and client secret, necessary for SPotify API
