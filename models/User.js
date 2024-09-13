const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
require("dotenv").config();

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    apiKey: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    kycVerified: {
      type: Boolean,
      default: false,
    },
    storeCount: {
      type: Number,
      default: 0,
    },
    merchantID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  } else {
    return next();
  }
});

userSchema.statics.loginUser = async function (loginData) {
  try {
    const user = await this.findOne({ username: loginData?.username });
    if (!user) {
      throw new Error("User does not exist!");
    }
    // console.log(user);
    const passwordMatch = await bcrypt.compare(
      loginData?.password,
      user.password
    );
    if (!passwordMatch) {
      throw new Error("Invalid username or password!");
    }

    const accessToken = jwt.sign(
      { username: user.username, userId: user._id, isAdmin: user.isAdmin },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { username: user.username, userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error("An error occurred while logging in.");
  }
};

userSchema.statics.registerUser = async function (enrollData) {
  try {
    const { username, password, email } = enrollData;
    if (!username || !password || !email) {
      throw new Error("Username and password and email are required!");
    }

    const existingUser = await this.findOne({ username });
    if (existingUser) {
      throw new Error("User already exists!");
    }

    const user = new this({
      username,
      email,
      password,
    });
    await user.save();

    return { user };
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("An error occurred while registering the user.");
  }
};

userSchema.statics.logoutUser = async function (userId) {
  try {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }

    user.refreshToken = null;
    await user.save();

    return {};
  } catch (error) {
    console.error("Error logging out user:", error);
    throw new Error("An error occurred while logging out.");
  }
};

userSchema.statics.getUser = async function (userId) {
  try {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("An error occurred while fetching user.");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
