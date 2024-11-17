const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);  
        cb(null, uniqueName);
    }
});


const upload = multer({ storage });

// Image upload endpoint
router.post('/uploadImage', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports = router;
