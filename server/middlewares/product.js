const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const { User } = require("../database/models");

const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// authenticate
const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
  const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
  const JWT_SECRET_SUPERADMIN = process.env.JWT_SECRET_SUPERADMIN;

  if (!JWT_SECRET_USER || !JWT_SECRET_ADMIN || !JWT_SECRET_SUPERADMIN) {
    return res.status(500).json({ error: "JWT secret keys are not provided" });
  }

  let jwtSecret;

  jwt.verify(token, JWT_SECRET_USER, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      const userRole = decodedToken.userRole;
      switch (userRole) {
        case "User":
          jwtSecret = JWT_SECRET_USER;
          break;
        case "Admin":
          jwtSecret = JWT_SECRET_ADMIN;
          break;
        case "SuperAdmin":
          jwtSecret = JWT_SECRET_SUPERADMIN;
          break;
        default:
          return res.status(500).json({ error: "Invalid user role" });
      }
      req.user = decodedToken;
      next();
    }
  });
};

// authorization
const authorizeUser = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.userRole;
    if (allowedRoles.includes(userRole)) {
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports = {
  upload,
  authenticateUser,
  authorizeUser,
};
