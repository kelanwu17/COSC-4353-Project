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
router.post('/createAdmin',  (req, res)=> {
    const { email, password} = req.body;
    const sql = "INSERT INTO Admin (email, password) VALUES (?, ?";
    db.query(sql, [email,password] ,(err, result) => {
        if (err) {
            console.error("Error insert admin", err);
            return res.status(500).send("Error insert admins to db.")
        }
        res.status(200).json({message: "Success"});
    })
})
router.put('/updateAdmin/:id',  (req, res)=> {
    const id = req.params.id;
    const {email, password} = req.body;
    const sql = "UPDATE Admin SET email = ?, password= ? WHERE adminId = ?";
    db.query(sql, [email,password,id], (err, result) => {
        if (err) {
            console.error("Error updating admin", err);
            return res.status(500).send("Error updating admins in db.")
        }
        res.status(200).json({message: "UPDATED"});
    })
})
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