const jwt = require("jsonwebtoken");
User = require("../data/user");

const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      function (err, decode) {
        if (err) {
          req.user = undefined;
          return res.status(401).send({
            message: err,
          });
        }
        User.findOne({
          id: decode.id,
        })
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => {
            return res.status(500).send({
              message: err,
            });
          });
      }
    );
  } else {
    return res.status(400).send({
      message: "Authorization header not found",
    });
  }
};
module.exports = verifyToken;
