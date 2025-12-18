const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const requestRoter = express.Router();

requestRoter.post("/sendConncetionRequest", userAuth, async (req,res) => {
    const user = req.user;
    console.log("sending connction request");

    res.send(user.firstName + "sent the connect request! ");

});

module.exports = requestRoter;