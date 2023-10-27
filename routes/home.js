const express = require("express");
const { AuthorizeUser } = require("../controller/login");
var router = express.Router();

router.get("/", async(req,res) => {
    try {
        const auth_token = await req.headers.authorization;
        const userCredentials = await AuthorizeUser(auth_token);
       
        if(userCredentials === false) {
            res.status(200).send("Invalid Token");
        } else {
            res.json(userCredentials);
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send("Server Busy");
    }

})

module.exports = router;