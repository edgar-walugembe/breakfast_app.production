const { Token } = require("./database/models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const retrieveToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Token not found in the cookie" });
    }

    const decoded = jwt.decode(token);
    const userId = decoded.userId;

    const tokenData = await Token.findOne({ where: { userId } });

    if (!tokenData) {
      return res.status(404).json({ error: "Token not found for the user" });
    }

    // const token = tokenData.token;
    req.token = token;
    next();
  } catch (error) {
    console.error("Error retrieving token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// async function authenticateUser(req, res, next) {
//   try {
//     const userId = parseInt(req.query.userId);

//     const tokenData = await Token.findOne({ where: { userId } });

//     if (!tokenData) {
//       return res.status(401).json({ error: "Token not found in the database" });
//     }

//     const token = tokenData.token;

//     const decoded = jwt.decode(token);
//     const userRole = decoded.userRole;

//     let jwtSecret;

//     switch (userRole) {
//       case "User":
//         jwtSecret = process.env.JWT_SECRET_USER;
//         break;
//       case "Admin":
//         jwtSecret = process.env.JWT_SECRET_ADMIN;
//         break;
//       case "SuperAdmin":
//         jwtSecret = process.env.JWT_SECRET_SUPER;
//         break;
//       default:
//         return res.status(500).json({ error: "Invalid user role" });
//     }

//     const verifiedToken = jwt.verify(token, jwtSecret);

//     req.user = verifiedToken;

//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid token or database error" });
//   }
// }

module.exports = {
  authenticateUser,
  retrieveToken,
};

// const { Token } = require("./database/models");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const retrieveToken = async (req, res, next) => {
//   try {
//     // Extract token from the request cookie
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ error: "Token not found in the cookie" });
//     }

//     const decoded = jwt.decode(token);
//     const userId = decoded.userId;

//     const tokenData = await Token.findOne({ where: { userId } });

//     if (!tokenData) {
//       return res.status(404).json({ error: "Token not found for the user" });
//     }

//     // Optionally, you can check if the retrieved token matches the one stored in the database
//     // const storedToken = tokenData.token;
//     // if (storedToken !== token) {
//     //   return res.status(401).json({ error: "Invalid token" });
//     // }

//     req.token = token;
//     next();
//   } catch (error) {
//     console.error("Error retrieving token:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

async function authenticateUser(req, res, next) {
  try {
    // Extract token from the request
    const token = req.token;

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
        jwtSecret = process.env.JWT_SECRET_SUPERADMIN;
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

// module.exports = {
//   authenticateUser,
//   retrieveToken,
// };
