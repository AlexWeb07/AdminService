const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchAdmin = (req, res, next) => {
  // GET the user from the jwt tocken and add id to req object
  const token = req.header("adminAuthToken");
  if (!token) {
    res.status(401).json({msg: "Please authenticate using a valid token" });
  }
  else{
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.admin=data.admin
        next()
      } catch (error) {
        res.status(401).send({msg: "Please authenticate using a valid token" });
      }
  }
};

module.exports = fetchAdmin;
