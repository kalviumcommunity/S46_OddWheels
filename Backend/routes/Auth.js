// Importing required modules
const express = require("express"); // Express framework for handling routes
const Joi = require("joi"); // Joi for validation
const multer = require("multer"); // Multer for handling file uploads
const { validateEmail } = require("../Database/ds");

const { UserModel } = require("../modules/MDSchema"); // Importing Mongoose UserModel

// Creating a router instance
const Auth = express.Router();

// Configuring multer storage for storing files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to validate user input using Joi schema
function validateUserInput(input) {
  // Defining Joi schema for user input
  const SignupSchema = Joi.object({
    username: Joi.string().min(4).max(15).required(), // Username validation
    password: Joi.string().min(4).max(15).required(), // Password validation
    email: Joi.string().email().required(), // Email validation
    firstName: Joi.string().required(), // First name validation
    lastName: Joi.string().required(), // Last name validation
    location: Joi.string().min(4).max(15).required(), // Location validation
    // profileImage: Joi.string().uri().required(), // Uncomment if using URI for profile image
  });

  // Validating input against the schema
  return SignupSchema.validate(input);
}

// Route for testing endpoint
Auth.get("/test", (req, res) => {
  res.status(200).send("GET request succeeded");
});

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

// Route for signup endpoint, handles file upload
Auth.post("/signup", upload.single("profileImage"), async (req, res) => {
  try {
    // Validating user input
    const validationResult = validateUserInput(req.body);
    if (validationResult.error) {
      // If validation fails, return error response
      return res.status(400).json({
        success: false,
        message: validationResult.error.details[0].message,
      });
    }

    // Destructuring required data from request body
    const { username, password, email, firstName, lastName, location } =
      req.body;
    // Check if email already exists

    // Constructing user data object
    const userData = {
      username,
      password,
      email,
      firstName,
      lastName,
      location,
      profileImage: { data: req.file.buffer, contentType: req.file.mimetype },
    };
    // console.log(userData);

    // Saving user data to database
    const newUser = new UserModel(userData);
    await newUser.save();

    // Sending success response
    res
      .status(201)
      .json({ success: true, message: "User signed up successfully" });
  } catch (error) {
    // Handling errors
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Exporting the router for use in other modules
module.exports = Auth;
