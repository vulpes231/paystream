const express = require("express");
const router = express.Router();

const { verifyToken } = require("../../middlewares/verifyJWT");
const { getUser } = require("../../handlers/userHandlers/userControl");

router.route("/").get(verifyToken, getUser);

module.exports = router;
