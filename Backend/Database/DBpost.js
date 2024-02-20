const jwt = require("jsonwebtoken");
const { PostModel } = require("./Schema");
require("dotenv").config();
const { tokenVerification } = require("../Database/Vaildation");

const postingPost = async (token, req) => {
  try {
    // Verify token
    const verifiedToken = await tokenVerification(token);
    if (verifiedToken) {
      const data = jwt.verify(token, process.env.ACCESS_TOKEN);
      // Extracting form fields
      const { captions, hashTag } = req.body;

      // Create post data object
      const postData = {
        userID: data.id,
        captions,
        hashTag,
        postImage: { data: req.file.buffer, contentType: req.file.mimetype },
      };

      // Saving post data to database
      const newPost = new PostModel(postData);
      await newPost.save();

      console.log("Post saved successfully");
    }
  } catch (error) {
    console.error("Error posting post:", error);
    // Handle error appropriately, maybe return an error response
  }
};

// Exporting functions and router for use in other modules
module.exports = {
  postingPost,
};
