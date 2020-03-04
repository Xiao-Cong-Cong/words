const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/wordsList';
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

connect.then((db) => {
    console.log("Connected correctly to the db server");
}, (err) => {console.log(err);});

const Schema = mongoose.Schema;

const wordSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    word: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    }
});

var Word = mongoose.model('Word', wordSchema);

module.exports = Word;

