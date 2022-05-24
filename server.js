require('dotenv').config()

// Dependencies
const express = require('express');

const app = express();

const methodOverride = require('method-override');

const mongoose = require('mongoose'); //new

const db = mongoose.connection;  // new

// Port
const PORT = process.env.PORT || 3000; // Allow Heroku port on local port

// Database 
const MONGODB_URI = process.env.MONGODB_URI;  // Connect to database locally / heroku

// Connect to Mongo & fix deprecation issues depends on version
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});


// Error / Success
db.on('error', (err) => console.log(err.message + 'is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

// Middleware
app.use(express.static('public')); // Use public folder for static assets
app.use(express.urlencoded({extended: false})); // Not allow nested obj in query strings
app.use(express.json()); // Only parses JSON - Not always needed depends on work
app.use(methodOverride('_method')); // Allow POST / PUT / DELETE from a form

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})



// Listener
app.listen(PORT, () => {
    console.log('express is listening on:', PORT)
})