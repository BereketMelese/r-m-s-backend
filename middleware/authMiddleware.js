const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // const token = req.header("Authorization")?.replace("Bearer ", "");

  // if (!token) {
  //   return res.status(401).json({ message: "No token, authorization denied" });
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded;
  //   next();
  // } catch (error) {
  //   res.status(401).json({ message: error.message });
  // }

  req.user = {
    id: "testUserId",
    role: "admin",
  };
  req.food = {
    id: "",
  };
  next();
};

const rollCheck = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = { auth, rollCheck };
