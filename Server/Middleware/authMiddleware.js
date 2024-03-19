const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  console.log(req.headers)
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const JwtRespone = jwt.verify(token, process.env.SECRET_KEY);
    req.payload = JwtRespone.userId;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Authentication error", error: error.message });
  }
};

module.exports = jwtMiddleware;
