const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    url: String,
    name: String,
    type: String,
    metaData: {
        Size: String,
        extType: String
    }},
    {
        versionKey: false
});

module.exports = mongoose.model('Images', PostSchema);