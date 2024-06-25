const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/phishing_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Schema and Model
const visitorSchema = new mongoose.Schema({
    ip: String,
    userAgent: String,
    timestamp: { type: Date, default: Date.now }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

// Route to record visitor info
app.get('/', (req, res) => {
    const visitor = new Visitor({
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });

    visitor.save((err) => {
        if (err) return console.error(err);
        console.log('Visitor info saved.');
    });

    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
