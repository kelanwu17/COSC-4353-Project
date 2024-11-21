const express = require('express');
const router = express.Router();
const db = require("../config/dj");

router.get('/',  (req, res)=> {
    const sql = "SELECT * FROM Admin";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error getting admin", err);
            return res.status(500).send("Error getting admins from db.")
        }
        res.status(200).json(result);
    })
})
const bcrypt = require('bcrypt');

router.post('/createAdmin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as desired

        const sql = "INSERT INTO Admin (email, password) VALUES (?, ?)";
        db.query(sql, [email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error inserting admin", err);
                return res.status(500).send("Error inserting admin into the database.");
            }
            res.status(200).json({ message: "Success" });
        });
    } catch (err) {
        console.error("Encryption error", err);
        res.status(500).send("Error encrypting password.");
    }
});

router.put('/updateAdmin/:id', (req, res) => {
    const id = req.params.id;
    const { email, password } = req.body;

    // Hash the password before updating
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error("Error hashing password", err);
            return res.status(500).send("Error hashing password.");
        }

        const sql = "UPDATE Admin SET email = ?, password = ? WHERE adminId = ?";
        db.query(sql, [email, hashedPassword, id], (err, result) => {
            if (err) {
                console.error("Error updating admin", err);
                return res.status(500).send("Error updating admins in db.");
            }
            res.status(200).json({ message: "UPDATED" });
        });
    });
});
router.delete('/deleteAdmin/:id',  (req, res)=> {
    const sql = "DELETE FROM Admin WHERE adminId = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error getting admin", err);
            return res.status(500).send("Error getting admins from db.")
        }
        res.status(200).json({message: "Deleted"});
    })
})


module.exports = router;