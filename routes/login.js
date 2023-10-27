const express = require("express");
const { AuthenticateUser } = require("../controller/login");
const client = require("../redis");
var router = express.Router();

client
    .connect()
    .then(() => {
        console.log("connected to the redis");
    })
    .catch((error) => {
        console.log(error);
    });

router.post("/", async(req,res) => {
    try {
        const {email, password} = await req.body;
        const loginCredentials = await AuthenticateUser(email, password);
        console.log(loginCredentials);
        if(loginCredentials === "Invalid User name or Password") {
            res.status(200).send("Invalid User name or Password");
        } else if (loginCredentials === "Server Busy") {
            res.status(200).send("Server Busy");
        } else {
            res.status(200).json({token: loginCredentials.token});
        }
    }
    catch (error) {
        console.log(error);
    }

})

module.exports = router;