const express = require('express');
const router = express.Router(); // Initialize the router
const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Specify the directory for storing images
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);  // Add timestamp to avoid name collisions
        cb(null, uniqueName);
    }
});

// Initialize multer with the defined storage
const upload = multer({ storage });

// Image upload endpoint
router.post('/uploadImage', upload.single('file'), (req, res) => {
    console.log('Image upload endpoint hit');
    console.log('File received:', req.file);

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create a URL for accessing the uploaded image
    const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;

    // Return the image URL to the client
    res.status(200).json({ imageUrl, message: 'Image uploaded successfully' });
});

module.exports = router;



