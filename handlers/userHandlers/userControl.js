const User = require("../../models/User");

const getUser = async (req, res) => {
  const { userId } = req.user;
  if (!userId) return res.status(400).json({ message: "ID required!" });
  try {
    const user = await User.getUser(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.error("get user error:", error);
    res.status(500).json({ error: "An error occurred while fethcing user" });
  }
};

module.exports = { getUser };
