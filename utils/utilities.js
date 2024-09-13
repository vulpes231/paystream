const sendServerError = (res, msg) => {
  res.status(500).json({ message: msg });
};

const sendClientError = (res, msg) => {
  res.status(400).json({ message: msg });
};

const sendAuthError = (res, msg) => {
  res.status(401).json({ message: msg });
};

const sendAccessError = (res) => {
  res.status(403).json({ message: "Access forbidden" });
};

module.exports = {
  sendClientError,
  sendServerError,
  sendAuthError,
  sendAccessError,
};
