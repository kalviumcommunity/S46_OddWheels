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

const fetchingPost = async (token) => {
  try {
    if (await tokenVerification(token)) {
      const post = await PostModel.find({});
      console.log(post[0].userId);
      return post;
    }
  } catch {}
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
};
