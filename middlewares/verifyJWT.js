const jwt = require("jsonwebtoken");
const { sendAuthError } = require("../utils/utilities");

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      return sendAuthError(res, "Login to use this service!");
    }

    // Ensure the token format is correct
    if (!token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Invalid authorization header format" });
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Malformed token!" });
      }

      req.user = {
        username: decoded.username,
        userId: decoded.userId,
      };
      console.log(req.user);

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { verifyToken };
