const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


// All Images
router.get('/', async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (err) {
        res.status(404).json({ message: err});
    }
});


// Add Image
router.post('/', async (req, res) => {
    const type = req.body.type
    function getFileSize(url) {
        var fileSize = '';
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);

        http.send(null); 
        if (http.status === 200) {
            fileSize = http.getResponseHeader('Content-length');
            // console.log('fileSize = ' + fileSize);
        }
        return fileSize;
}
    const size = getFileSize(req.body.url)
    const image = new Image({
        url: req.body.url,
        name: req.body.name,
        type: req.body.type,
        metaData: { 
            Size: size + " bytes",
            extType: type.substr(-3)}
    });

    try {
        const saveImage = await image.save();
        res.json(saveImage);
    } catch (err) {
        res.status(404).json({ message: err});
    }
});

// Specific Image with image Id
router.get('/:imageId', async (req, res) => {
    try {
        const image = await Image.findById(req.params.imageId);
        res.json(image);
    } catch (err) {
        res.status(404).json({ message: err});
    }
})


module.exports = router;