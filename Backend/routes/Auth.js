// Importing required modules
const express = require("express"); // Express framework for handling routes
const { validateEmail, validatePassword } = require("../Database/Vaildation");
const { joiPasswordExtendCore } = require("joi-password");
const multer = require("multer"); // Multer for handling file uploads
const Joi = require("joi"); // Joi for validation
const joiPassword = Joi.extend(joiPasswordExtendCore);
const bcrypt = require("bcrypt");

const { UserModel } = require("../Database/Schema"); // Importing Mongoose UserModel

// Creating a router instance
const Auth = express.Router();

// Configuring multer storage for storing files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to validate user input using Joi schema
function validateUserInput(input) {
  // Defining Joi schema for user input
  const SignupSchema = Joi.object({
    username: Joi.string().min(4).max(15).required().messages({
      "string.min": "Username should have a minimum length of {#limit}",
      "string.max": "Username should have a maximum length of {#limit}",
      "any.required": "Username is required",
    }), // Username validation
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .messages({
        "password.minOfUppercase":
          "{#label} should contain at least {#min} uppercase character",
        "password.minOfSpecialCharacters":
          "{#label} should contain at least {#min} special character",
        "password.minOfLowercase":
          "{#label} should contain at least {#min} lowercase character",
        "password.minOfNumeric":
          "{#label} should contain at least {#min} numeric character",
        "password.noWhiteSpaces": "{#label} should not contain white spaces",
      }), // Password validation
    email: Joi.string().email().required(), // Email validation
    firstName: Joi.string().required(), // First name validation
    lastName: Joi.string().required(), // Last name validation
    location: Joi.string().min(4).max(15).required(), // Location validation
    // profileImage: Joi.string().uri().required(), // Uncomment if using URI for profile image
  });

  // Validating input against the schema
  return SignupSchema.validate(input);
}

// Route for checkemail endpoint, handels email validation
Auth.post("/checkemail", async (req, res) => {
  // Validating email
  const emailExists = await validateEmail(req.body.email);
  if (emailExists) {
    return res.status(200).json({ emailExists: true });
  } else {
    return res.status(200).json({ emailExists: false });
  }
});

// Route for signin endpoint
Auth.post("/signin", async (req, res) => {
  try {
    const passwordStatus = await validatePassword(
      req.body.password,
      req.body.email,
    );
    if (passwordStatus.match) {
      res.status(200).json({ vaildate: true, message: "Welcome",accessToken: passwordStatus.accessToken, refreshToken: passwordStatus.refreshToken });
    } else {
      res
        .status(200)
        .json({ vaildate: false, message: "Email/Password not matching" });
    }
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Route for signup endpoint, handles file upload
Auth.post("/signup", upload.single("profileImage"), async (req, res) => {
  try {
    // Validating user input
    const validationResult = validateUserInput(req.body);
    if (validationResult.error) {
      // If validation fails, return error response with field name
      const errors = validationResult.error.details.map((detail) => ({
        field: detail.context.label,
        error: detail.message,
      }));
      return res.status(200).json({
        signup: false,
        success: false,
        message: errors,
      });
    }
    // Destructuring required data from request body
    const { username, password, email, firstName, lastName, location } =
      req.body;
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, salt);
    // Constructing user data object
    const userData = {
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      location,
      profileImage: { data: req.file.buffer, contentType: req.file.mimetype },
    };
    // Saving user data to database
    const newUser = new UserModel(userData);
    await newUser.save();
    // Sending success response
    res.status(201).json({
      signup: true,
      success: true,
      message: "User signed up successfully",
    });
  } catch (error) {
    // Handling errors
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Exporting the router for use in other modules
module.exports = Auth;
