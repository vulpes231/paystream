import User from "../../models/User";

const signinUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const loginData = { username, password };
    const auth = await User.loginUser(loginData);

    // Set the refresh token in the cookie
    res.cookie("jwt", auth.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Logged in successfully.",
      accessToken: auth.accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login." });
  }
};

const signoutUser = async (req, res) => {
  const userId = req.user.userId;
  try {
    await User.logoutUser(userId);

    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
    });

    res.status(204).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "An error occurred during logout." });
  }
};

const signupUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const enrollData = { username, email, password };
    await User.registerUser(enrollData);
    res.status(201).json({ message: `new user ${username} created.` });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "An error occurred during signup." });
  }
};

module.exports = { signinUser, signoutUser, signupUser };
