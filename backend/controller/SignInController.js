const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async (req, res) => {
    try{
        const {email, password, rememberMe} = req.body;
        
        // Check email input
        if(String(email) !== "ctv@uts.edu.au" && String(email) !== "ctvadmin"){
            console.log("Invalid email address/username!");
            return res.status(400).json({
                status: false,
                message: "Invalid email address and/or password!"
            });
        }

        // Check password input
        if(String(password) !== "password"){
            console.log("Invalid password");
            return res.status(400).json({
                status: false,
                message: "Invalid email address and/or password!"
            });
        }

        // Generate token and save the token
        const userID = "A0000000";
        let loginToken;
        if(rememberMe)
            loginToken = jwt.sign(JSON.parse(`{"userID":"${userID}"}`), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
        else
            loginToken = jwt.sign(JSON.parse(`{"userID":"${userID}"}`), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            console.log(`${userID} successfully login to his/her account!`);
        return res.status(200).json({
            status: true,
            message: "Log In Successfull!",
            loginToken: loginToken
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            status: false,
            message: error
        });
    }
});
module.exports = router;