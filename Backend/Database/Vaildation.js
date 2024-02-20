const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./Schema");
require("dotenv").config(); // Loading environment variables from .env file

function generateAccessToken(id) {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
    expiresIn: 3 * 24 * 60 * 60,
  });
}

const validateEmail = async (email) => {
  try {
    // Check if there is a user with the provided email
    const user = await UserModel.findOne({ email: email });
    // If user exists, return true; otherwise, return false

    return !!user;
  } catch (error) {
    // Handle error
    console.error("Error validating email:", error.message);
    // Return false in case of error
    return false;
  }
};

const validateLogin = async (pass, email) => {
  try {
    // Check if there is a user with the provided email
    const user = await UserModel.findOne({ email: email });
    // Use bcrypt's compare function to compare the plain password with the hashed password
    const match = await bcrypt.compare(pass, user.password);
    // const accessToken = generateAccessToken(email);
    // Generating JWT token
    const token = generateAccessToken(user._id);
    // Return true if the password matches the hashed password, false otherwise
    return {
      match: match,
      accessToken: token,
    };
  } catch (error) {
    console.error(error);
    // Handle any errors gracefully
    return false;
  }
};

const tokenVerification = async (token) => {
  try {
    const data = await jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await UserModel.findById(data.id);

    if (user) {
      return {
        verification: true,
        user: user.username,
        message: "Welcome",
      };
    } else {
      return { verification: false };
    }
  } catch (err) {
    console.error("Error occurred during token verification:", err);
    return { verification: false };
  }
};

// Exporting functions and router for use in other modules
module.exports = {
  validateEmail,
  validateLogin,
  generateAccessToken,
  tokenVerification,
};
