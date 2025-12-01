const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
"mongodb+srv://yuvrajjagtap48:blHZc99IoEPCLII1@namastenode.vibqjia.mongodb.net/devTinder"
);
};


 
module.exports = connectDB;




