const jwt = require("jsonwebtoken");
const { UserModel } = require("./Schema");

require("dotenv").config(); // Loading environment variables from .env file
const { tokenVerification } = require("./Vaildation");

const fetchingProfile = async (token) => {
  try {
    console.log(await tokenVerification(token));
    if (await tokenVerification(token)) {
      const data = await jwt.verify(token, process.env.ACCESS_TOKEN);
      const user = await UserModel.findById(data.id);
      console.log("DBfetching profile", user);
      return user;
    }
  } catch {}
};

// Exporting functions and router for use in other modules
module.exports = {
  fetchingProfile,
};
