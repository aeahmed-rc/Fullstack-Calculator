const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://demo:demo@cluster0-9qbbz.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "PalindromeAssignment";

app.listen(3000, () => {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, {
    useUnifiedTopology: true
  }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('math').find().toArray((err, result) => {

    if (err) return console.log(err)
    // console.log(result)
    res.render('index.ejs', {
      Response: result
    })

  })
})

app.post('/path', (req, res) => {
console.log(req.body.numone)
  let numone = req.body.numone
  let numtwo= req.body.numtwo
  let division= Math.round(numone/numtwo).toFixed(2)
  let add= Number(numone) + Number(numtwo)
  console.log(add)
  db.collection('math').save({
    numone: numone,
    numtwo: numtwo,
    division:division,
    add:add
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')

  })

})

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

app.delete('/path', (req, res) => {
  console.log('work')
  db.collection('math').findOneAndDelete({
    numone:req.body.numone,
    numtwo:req.body.numtwo,
    division:req.body.division,
    add:req.body.add
  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
