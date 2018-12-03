const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const twitter = require('twitter');
const config = require("./config");
const streamHandler = require('./utils/streamHandler');
const PORT = process.env.PORT || 3001;
// Create a new ntwitter instance
var twit = new twitter(config.twitter);

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Disable etag headers on responses
app.disable('etag');


// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/react-tweets"
);

// Add routes, both API and view
app.use(routes);


// Start the API server
var server = app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// Initialize socket.io
var io = require('socket.io').listen(server);


// Set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter',{ track: 'SOSNicaragua'}, function(stream){
  streamHandler(stream,io);
});

//, GritoPorNicaragua, OEA, FreeNica, NicaLibre, nicaragua