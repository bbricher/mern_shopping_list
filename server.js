const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://briana_bricher:noPAIN123@cluster0-shard-00-00-mzd5a.gcp.mongodb.net:27017,cluster0-shard-00-01-mzd5a.gcp.mongodb.net:27017,cluster0-shard-00-02-mzd5a.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Connect to Mongo
mongoose
.connect(process.env.MONGODB_URI || "mongodb+srv://briana_bricher:noPAIN123@cluster0-mzd5a.gcp.mongodb.net/test?retryWrites=true&w=majority")
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

MongoClient.connect(process.env.MONGODB_URI || uri, function(err, client) {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// Use Routes
app.use('/api/items', items);

// Serve static assest if we're in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`))
