const validator = require("validator");

const validateSignupData = (data) => {
    const {firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid ");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid ");
    } 
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong ");
    }
};

module.exports = { validateSignupData };