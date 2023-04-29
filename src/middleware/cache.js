const mcache = require("memory-cache");
const handleJWTError = require("../controllers/authenticationHelper");

var cache = (duration) => {
  return (req, res, next) => {
    const isJWTValid = handleJWTError(req, res);
    if (isJWTValid === false) return;
    let key = "__express__" + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = cache;
