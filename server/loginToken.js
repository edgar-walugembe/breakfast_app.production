const { Token } = require("./database/models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function loginToken(req, res, next) {
  try {
    const userId = req.user.userId;
    const tokenData = await Token.findOne({ where: { userId } });

    if (!tokenData) {
      return res.status(401).json({ error: "Token not found in the database" });
    }

    const token = tokenData.token;

    const decoded = jwt.decode(token);
    const userRole = decoded.userRole;

    let jwtSecret;
    switch (userRole) {
      case "User":
        jwtSecret = process.env.JWT_SECRET_USER;
        break;
      case "Admin":
        jwtSecret = process.env.JWT_SECRET_ADMIN;
        break;
      case "SuperAdmin":
        jwtSecret = process.env.JWT_SECRET_SUPER;
        break;
      default:
        return res.status(500).json({ error: "Invalid user role" });
    }

    const verifiedToken = jwt.verify(token, jwtSecret);

    req.user = verifiedToken;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token or database error" });
  }
}

module.exports = {
  loginToken,
};
