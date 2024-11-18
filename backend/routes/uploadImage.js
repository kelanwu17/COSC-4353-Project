const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/dj');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/uploadImage', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageBuffer = req.file.buffer;
    res.status(201).json({ message: 'Image uploaded successfully', imageUrl: imageBuffer });
});

module.exports = router;




