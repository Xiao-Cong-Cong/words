const Word = require('./db');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/addNewWord', (req, res) => {
    Word.find().sort({"id": -1}).limit(1).exec((err, doc) => {
        if(err) console.log(err);
        // console.log(doc);
        // console.log(doc[0].id);
        if(doc[0]) {
            var nextId = doc[0].id + 1;
        } else {
            var nextId = 1;
        }
        console.log(nextId);
        var newWord = new Word({
            id: nextId,
            word: req.body.word,
            count: 1
        });
        newWord.save((err) => {
            if(err) console.log(err);
            res.json({
                success: true
            })
        })
    })
});

app.post('/api/addWordCount', (req, res) => {
    Word.updateOne({id: req.body.id}, {$inc: { count: 1 }}, (err, doc) => {
        if(err) console.log(err);
        res.json({
            success: true
        })
    })
});

app.get('/api/words', (req, res) => {
    Word.find({}, (err, docs) => {
        if(err) console.log(err);
        res.json({
            success: true,
            words: docs
        })
    })
});

app.get('/api/clearAll', (req, res) => {
    Word.deleteMany({}, (err) => {
        if(err) console.log(err);
        res.json({
            success: true
        })
    })
})

app.listen(3030, () => {console.log('Server is running at 3030 ...')});