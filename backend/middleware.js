const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

export async function authMiddleware(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    return res.status(403).json({
      messsage: "No bearer token provided",
    });
  }
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  try {
    const decoded = jwt.verify(bearerToken, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId; // Attach the userId to the request object
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
}
module.exports = { authMiddleware };
