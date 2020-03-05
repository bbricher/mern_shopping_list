const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://briana_bricher:noPAIN123@cluster0-mzd5a.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Connect to Mongo
mongoose
    .connect(process.env.MONGODB_URI || "mongodb+srv://briana_bricher:noPAIN123@cluster0-mzd5a.gcp.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

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
