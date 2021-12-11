const GetUserIP = require("get-user-ip");

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const IP = GetUserIP(req);
  res.end(JSON.stringify({ IP }));
};
