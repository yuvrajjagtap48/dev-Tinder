const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRoter = express.Router();

requestRoter.post(
  "/request/send/:status/:toUsedId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUsedId;
      const status = req.paramas.status;

      const allowedStatus = ["ignored", "interested"];
      if (allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      const toUser = await User.findById(yoUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found !" });
      }

      // IF there is an existing ConnectionRequest
      const existingConnectionRequest = await connectionRequest.findOne({
        $or: [
          // express function to write OR condition
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection request already exists! " });
      }

      const connectionRequest = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message:
          req.user.firstName + "is" + status + "in" + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(500).send("ERROR:" + err.message);
    }
  }
);

requestRoter.get("/request/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const loggedUser = req.user;
        const { status, requestId } = req.params;

        // validate status
        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({message: "Statu not allowed " + status});
        }

        const connectionRequest = await connectionRequest.findOne({
            _id: requestId,
            toUserId: loggedUser._id,
            status: "interested",
        });
        if(!connectionRequest) {
            return res.status(404).json({message: "Connection request not found !"});
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({ message: "Connection request " + status , data});
        // 

    }catch (err) {
        res.status(400).send("ERROR:" + err.message);
    }
});


module.exports = requestRoter;
