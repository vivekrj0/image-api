const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');

const postImage = require('./routes/products');
app.use(bodyParser.json());

app.use('/product', postImage);

app.get('/', (req, res) => {
    res.send('We are on home');
})

mongoose.connect('mongodb+srv://vivekraj234:vivekraj234@cluster0-ekrlt.mongodb.net/vivekraj234?retryWrites=true&w=majority', 
    {useNewUrlParser: true },
    () => {
        console.log('Database Connected');
});

app.listen(3001);