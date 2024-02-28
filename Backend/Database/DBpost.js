const jwt = require("jsonwebtoken");
const { PostModel, UserModel } = require("./Schema"); // Import UserModel
require("dotenv").config();
const { tokenVerification } = require("./Vaildation"); // Correct the path to Validation file
const sharp = require("sharp");

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

      // Process and reduce image quality using sharp
      const processedImageBuffer = await sharp(req.file.buffer)
        .jpeg({ quality: 50 }) // You can adjust the quality as per your requirement
        .toBuffer();

      // Create post data object
      const postData = {
        userID: data.id,
        captions,
        hashTag,
        postImage: {
          data: processedImageBuffer,
          contentType: req.file.mimetype,
        },
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

const updatingPost = async (token, req) => {
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
      console.log(req.body);
      // Extract form fields
      const { id, captions, hashTag } = req.body;

      // Find the post by ID
      const post = await PostModel.findById(id);
      if (!post) {
        throw new Error("Post not found");
      }

      // Check if the user owns the post
      if (post.userID.toString() !== user.id) {
        throw new Error("Unauthorized");
      }

      // Update the post
      post.captions = captions;
      post.hashTag = hashTag;
      await post.save();

      return { success: true, message: "Post updated successfully" };
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.error("Error updating post:", error.message);
    throw error; // Re-throw the error to be caught by the caller
  }
};

const deletingPost = async (token, req) => {
  try {
    // Verify token
    const verifiedToken = await tokenVerification(token);
    if (!verifiedToken) {
      throw new Error("Unauthorized");
    }

    const data = jwt.verify(token, process.env.ACCESS_TOKEN);

    // Find user by ID
    const user = await UserModel.findById(data.id);
    if (!user) {
      throw new Error("User not found");
    }

    // Extract postId from req.body
    const { postId } = req.body;

    // Find and delete the post
    const deletedPost = await PostModel.deleteOne({ _id: postId });
    if (deletedPost.deletedCount === 0) {
      throw new Error("Post not found or could not be deleted");
    }

    return { success: true, message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error.message);
    throw error; // Re-throw the error to be caught by the caller
  }
};

module.exports = {
  postingPost,
  updatingPost,
  deletingPost,
};
