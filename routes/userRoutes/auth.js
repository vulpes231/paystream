const express = require("express");
const router = express.Router();
const {
  signinUser,
  signupUser,
  signoutUser,
} = require("../../handlers/userHandlers/userAuth");
const { verifyToken } = require("../../middlewares/verifyJWT");

router.route("/login").post(signinUser);
router.route("/register").post(signupUser);
router.route("/logout").put(verifyToken, signoutUser);

module.exports = router;
