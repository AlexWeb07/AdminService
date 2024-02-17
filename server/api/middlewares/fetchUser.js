const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
  // GET the user from the jwt tocken and add id to req object
  const token = req.header("userAuthToken");
  if (!token) {
    res.status(401).json({error: "Please authenticate using a valid token" });
  }
  else{
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user=data.user
        next()
      } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token" });
      }
  }
};

module.exports = fetchUser;
