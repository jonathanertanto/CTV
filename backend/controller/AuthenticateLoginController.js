const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require ("dotenv").config();

router.post("/", async (req, res) => {
    try{
        const token = req.body.token;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
            if(err){
                return res.status(403).json({
                    userID: "none"
                });
            }
            if(String(data.userID) !== "A0000000"){
                return res.status(403).json({
                    userID: "none"
                });
            }
            return res.status(200).json({
                userID: data.userID
            });
        });
    }catch(error){
        console.log(error);
        return res.status(403).json({
            userID: "none"
        });
    }
});
module.exports = router;