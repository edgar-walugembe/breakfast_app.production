// const { User, Token } = require("./database/models");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const insertToken = async (userId, token, expiresAt) => {
//   try {
//     await Token.create({
//       userId,
//       token,
//       expiresAt,
//     });
//     console.log("Token inserted successfully");
//   } catch (error) {
//     console.error("Error inserting token:", error);
//   }
// };

// async function loginUser(req, res, next) {
//   const { name, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { name } });

//     if (!user) {
//       return res.status(404).json({ error: "Invalid username or password" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     const userRole = user.userType;
//     const userId = user.userId;

//     req.user = {
//       name: user.name,
//       userRole: user.userType,
//       userId: userId,
//     };

//     let jwtSecret;

//     const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
//     const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
//     const JWT_SECRET_SUPER = process.env.JWT_SECRET_SUPER;

//     if (!JWT_SECRET_USER || !JWT_SECRET_ADMIN || !JWT_SECRET_SUPER) {
//       return res.status(500).json({ error: "Invalid user role" });
//     }

//     switch (userRole) {
//       case "User":
//         jwtSecret = JWT_SECRET_USER;
//         redirectUrl = "/User/home";
//         break;
//       case "Admin":
//       case "SuperAdmin":
//         jwtSecret = userRole === "Admin" ? JWT_SECRET_ADMIN : JWT_SECRET_SUPER;
//         redirectUrl = "/Admin/Dashboard";
//         break;
//       default:
//         return res.status(500).json({ error: "Invalid user role" });
//     }

//     const jwtToken = jwt.sign(
//       {
//         name: user.name,
//         userRole: user.userType,
//         userId: userId,
//       },
//       jwtSecret
//     );

//     await insertToken(user.userId, jwtToken, null);

//     res.cookie("token", jwtToken, { httpOnly: true });

//     res.json({
//       message: "Authentication successful",
//       token: jwtToken,
//       redirectUrl,
//       userId,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// module.exports = {
//   loginUser,
// };

// // switch (userRole) {
// //   case "User":
// //     jwtSecret = JWT_SECRET_USER;
// //     break;
// //   case "Admin":
// //     jwtSecret = JWT_SECRET_ADMIN;
// //     break;
// //   case "SuperAdmin":
// //     jwtSecret = JWT_SECRET_SUPER;
// //     break;
// //   default:
// //     return res.status(500).json({ error: "Invalid user role" });
// // }

// const { User, Token } = require("./database/models");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const insertToken = async (userId, token, expiresAt) => {
//   try {
//     await Token.create({
//       userId,
//       token,
//       expiresAt,
//     });
//     console.log("Token inserted successfully");
//   } catch (error) {
//     console.error("Error inserting token:", error);
//   }
// };

// async function loginUser(req, res, next) {
//   const { name, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { name } });

//     if (!user) {
//       return res.status(404).json({ error: "Invalid username or password" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Invalid username or password" });
//     }

//     const userRole = user.userType;
//     const userId = user.userId;
//     const username = user.name;

//     const jwtSecret = process.env[`JWT_SECRET_${userRole.toUpperCase()}`];

//     if (!jwtSecret) {
//       return res.status(500).json({ error: "Invalid user role" });
//     }

//     const jwtToken = jwt.sign(
//       {
//         name: user.name,
//         userRole: user.userType,
//         userId: userId,
//       },
//       jwtSecret
//     );

//     await insertToken(user.userId, jwtToken, null);

//     res.cookie("token", jwtToken, { httpOnly: true });

//     const redirectUrl = userRole === "User" ? "/User/home" : "/Admin/Dashboard";

//     res.json({
//       message: "Authentication successful",
//       token: jwtToken,
//       redirectUrl,
//       userId,
//       userRole,
//       username,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// async function authenticateUser(req, res, next) {
//   try {
//     // Extract token from the request
//     const token = req.token;

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
//         jwtSecret = process.env.JWT_SECRET_SUPERADMIN;
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

// module.exports = {
//   loginUser,
//   authenticateUser,
// };

// back home
const { User, Token } = require("./database/models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const insertToken = async (userId, token, expiresAt) => {
  try {
    await Token.create({
      userId,
      token,
      expiresAt,
    });
    console.log("Token inserted successfully");
  } catch (error) {
    console.error("Error inserting token:", error);
  }
};

async function authenticateToken(req, res, next) {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ where: { name } });

    if (!user) {
      return res.status(404).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userRole = user.userType;
    const userId = user.userId;
    const username = user.name;

    let jwtSecret;

    const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
    const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
    const JWT_SECRET_SUPERADMIN = process.env.JWT_SECRET_SUPERADMIN;

    if (!JWT_SECRET_USER || !JWT_SECRET_ADMIN || !JWT_SECRET_SUPERADMIN) {
      return res
        .status(500)
        .json({ error: "JWT secret keys are not provided" });
    }

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

    switch (userRole) {
      case "User":
        jwtSecret = JWT_SECRET_USER;
        redirectUrl = "/User/home";
        break;
      case "Admin":
      case "SuperAdmin":
        jwtSecret =
          userRole === "Admin" ? JWT_SECRET_ADMIN : JWT_SECRET_SUPERADMIN;
        redirectUrl = "/Admin/Dashboard";
        break;
      default:
        return res.status(500).json({ error: "Invalid user role" });
    }

    const jwtToken = jwt.sign(
      { name: user.name, password: user.password, userRole: user.userType },
      jwtSecret
    );

    await insertToken(user.userId, jwtToken, null);

    res.cookie("token", jwtToken, { httpOnly: true });

    res.json({
      message: "Authentication successful",
      token: jwtToken,
      redirectUrl,
      userId,
      userRole,
      username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function loginUser(req, res, next) {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "Incorrect name or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect name or password" });
    }

    return res.status(200).json({ user });
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  authenticateToken,
  loginUser,
};

// const { User } = require("./database/models");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// async function authenticateToken(req, res, next) {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: "Token not provided" });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Retrieve user information based on the decoded token
//     const user = await User.findOne({ where: { name: decoded.name } });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Optionally, you can also verify the user's password or any other checks here

//     // Attach the user object to the request for further processing
//     req.user = user;

//     // Proceed to the next middleware
//     next();
//   } catch (error) {
//     return res.status(403).json({ error: "Invalid token" });
//   }
// }

// module.exports = {
//   authenticateToken,
// };
