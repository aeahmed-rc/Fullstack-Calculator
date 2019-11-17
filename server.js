var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var db

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db);
}); // connect to our database

//app.listen(port, () => {
    // MongoClient.connect(configDB.url, { useNewUrlParser: true }, (error, client) => {
    //     if(error) {
    //         throw error;
    //     }
    //     db = client.db(configDB.dbName);
    //     console.log("Connected to `" + configDB.dbName + "`!");
    //     require('./app/routes.js')(app, passport, db);
    // });
//});

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2019a', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
//require('./app/routes.js')(app, passport, db); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(8080);
console.log('The magic happens on port ' + port);






// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// const MongoClient = require('mongodb').MongoClient
//
// var db, collection;



// app.listen(3000, () => {
//   MongoClient.connect(url, {
//     useNewUrlParser: true
//   }, {
//     useUnifiedTopology: true
//   }, (error, client) => {
//     if (error) {
//       throw error;
//     }
//     db = client.db(dbName);
//     console.log("Connected to `" + dbName + "`!");
//   });
// });
//
// app.set('view engine', 'ejs')
// app.use(bodyParser.urlencoded({
//   extended: true
// }))
// app.use(bodyParser.json())
// app.use(express.static('public'))
//
// app.get('/', (req, res) => {
//   //console.log(db)
//   db.collection('math').find().toArray((err, result) => {
//
//     if (err) return console.log(err)
//     // console.log(result)
//     res.render('index.ejs', {
//       Response: result
//     })
//
//   })
// })

// app.post('/path', (req, res) => {
// console.log(req.body.numone)
//   let numone = req.body.numone
//   let numtwo= req.body.numtwo
//   let division= Math.round(numone/numtwo).toFixed(2)
//   let add= Number(numone) + Number(numtwo)
//   console.log(add)
//   db.collection('math').save({
//     numone: numone,
//     numtwo: numtwo,
//     division:division,
//     add:add
//   }, (err, result) => {
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/profile')
//
//   })
//
// })

// app.put('/path', (req, res) => {
//   db.collection('Palindrome')
//     .findOneAndUpdate({
//       pal: 'narth'
//     }, {
//       $set: {
//         pal: req.body.pal
//       }
//     }, {
//       sort: {
//         _id: -1
//       },
//       upsert: true
//     }, (err, result) => {
//       if (err) return res.send(err)
//       res.send(result)
//     })
// })

// app.delete('/path', (req, res) => {
//   console.log('work')
//   db.collection('math').findOneAndDelete({
//     numone:req.body.numone,
//     numtwo:req.body.numtwo,
//     division:req.body.division,
//     add:req.body.add
//   }, (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('Message deleted!')
//   })
// })
