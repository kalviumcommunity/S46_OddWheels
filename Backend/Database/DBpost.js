const jwt = require("jsonwebtoken");
const { PostModel, UserModel } = require("./Schema"); // Import UserModel
require("dotenv").config();
const { tokenVerification } = require("./Vaildation"); // Correct the path to Validation file

const postingPost = async (token, req) => {
  try {
    // Verify token
    const verifiedToken = await tokenVerification(token);
    if (verifiedToken) {
      const data = jwt.verify(token, process.env.ACCESS_TOKEN);

      // Find user by ID
      const user = await UserModel.findById(data.id);
      if (!user) {
        throw new Error("User not found");
      }

      // Extract form fields
      const { captions, hashTag } = req.body;

      // Create post data object
      const postData = {
        userID: data.id,
        captions,
        hashTag,
        postImage: { data: req.file.buffer, contentType: req.file.mimetype },
      };

      // Save post data to database
      const newPost = new PostModel(postData);
      await newPost.save();

      // Update user's posts
      user.post.push(newPost.id);
      await user.save();

      console.log("Post saved successfully");
    }
  } catch (error) {
    console.error("Error posting post:", error.message);
    // Handle error appropriately, maybe return an error response
  }
};

module.exports = {
  postingPost,
};
