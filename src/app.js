
const express = require("express");
const connectDB = require("./config/database"); // to connect to database
const app = express();
const { validateSignupData } = require("./utils/validation");
const User = require("./models/user"); // User model
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = requrie("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");


app.use(express.json()); // middleware to read json data we just define once it will work for all routes
// If i give app.use(()=>) it will work for all the routes
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // validate of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrpt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    //  creating user instance using above data
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    }); 
    await user.save(); // saving user to database
    res.send("User signed up successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});



//login
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId : emailId });
    if (!user) {
        throw new Error ("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //create a JWT Token 

    const token = await  jwt.sign({ _id: user._id }, "DEV@Tinder");
    console.log(token);


      //Add the token to cookie and send the response back to user 

      res.cookie("token", token);
        res.send("User logged in successfully");
    } else {
        throw new Error ("Invalid password ");
    }

  }catch (err) {   
    res.status(400).send("ERROR: " + err.message);
    }
});



app.get("/profile",userAuth, async (req, res) => {
try{
  const user = req.user;
  if(!user){
    throw new Error ("User does not exist");
  }
  res.send(user);
} catch (err){
  res.status(400).send("ERROR "+ err.message);
}
});



// Feed API - Get all the users from database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// in this case i dont define userID so it will delete first user that it find in database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // const user = await User.findByIdAndDelete({ _id: userId }); we can also write like this below is a shorthand version of this
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
});

//update data of user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  // allowed updates

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpateAllowed) {
      throw new Error(" updates not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User data updated successfully");
  } catch (err) {
    res.status(400).send("Error updating user data");
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
