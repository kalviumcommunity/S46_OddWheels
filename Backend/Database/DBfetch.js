const jwt = require("jsonwebtoken");
const { UserModel, PostModel } = require("./Schema");

require("dotenv").config(); // Loading environment variables from .env file
const { tokenVerification } = require("./Vaildation");

const fetchingProfile = async (token) => {
  try {
    if (await tokenVerification(token)) {
      const data = await jwt.verify(token, process.env.ACCESS_TOKEN);
      const user = await UserModel.findById(data.id);
      return user;
    }
  } catch {}
};

const fetchingUserPost = async (token) => {
  try {
    if (await tokenVerification(token)) {
      const data = await jwt.verify(token, process.env.ACCESS_TOKEN);
      const user = await UserModel.findById(data.id).select("post");

      const postData = [];

      // Sequentially fetch each post
      for (const postId of user.post) {
        const post = await PostModel.findById(postId);
        if (post) {
          postData.push(post);
        } else {
          console.log(`Post with ID ${postId} not found`);
          const index = user.post.indexOf(postId);
          if (index !== -1) {
            user.post.splice(index, 1); // Remove post ID from user's post array
          }
        }
      }

      await user.save(); // Save changes to user's post array

      // Log or do something with postData if needed
      // console.log(postData);

      return postData;
    }
  } catch (error) {
    console.error("Error fetching user posts:", error.message);
    throw error;
  }
};

const fetchingPost = async (token) => {
  try {
    if (await tokenVerification(token)) {
      // Fetch all documents
      const posts = await PostModel.find({});

      // Shuffle the posts array randomly
      const shuffledPosts = shuffleArray(posts);

      return shuffledPosts;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Function to shuffle an array randomly
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const fetchPostUser = async (token, id) => {
  try {
    if (await tokenVerification(token)) {
      // Modify the projection to fetch only specific fields (e.g., username and profileImage)
      return await UserModel.findById(id, "username profileImage");
    }
  } catch (error) {
    console.error("Error fetching post user:", error);
  }
};

// Exporting functions and router for use in other modules
module.exports = {
  fetchingProfile,
  fetchingPost,
  fetchPostUser,
  fetchingUserPost,
};
