const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      index: true,
      minlength: 4,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: true,
    },
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

    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong password" + value);
        }
      },
    },
    age: { type: Number, required: true, min: 18 },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
      // validate(value) {
      //   // this validate function only run when we create new object but not when we update existing object we have enable using tunValidators
      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL : " + value);
        }
      },
    },
    about: { type: String, default: "defult info" },
    skills: { type: [String] },
  },
  {
    timestamps: true,
  } // this will add createdAt and updatedAt fields automatically
);


userSchema.methods.getJWT = async function () {
  // dont use arrow function here otherwise it break things up beacuse we use this over there
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

// always write first letter of model name in capital letter
module.exports = mongoose.model("User", userSchema);
