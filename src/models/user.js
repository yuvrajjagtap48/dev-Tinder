const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 4, maxlength: 30 },
    lastName: { type: String, required: true },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address : " + value);
        }
      },
    },

    password: { type: String, required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong password" + value);
            }   
        }

     },
    age: { type: Number, required: true, min: 18 },
    gender: {
      type: String,
      validate(value) {
        // this validate function only run when we create new object but not when we update existing object we have enable using tunValidators
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL : " + value);
            }
        }   
    },
    about: { type: String, default: "defult info" },
    skills: { type: [String] },
  },
  { timestamps: true } // this will add createdAt and updatedAt fields automatically
);

// always write first letter of model name in capital letter
module.exports = mongoose.model("User", userSchema);
