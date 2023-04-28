const handleJWTError = (req, res) => {
    if (!req.user && req.message == null) {
        res.status(403).send({
            message: "Invalid JWT token"
        });
        return false;
    } else if (!req.user && req.message) {
        res.status(403).send({
            message: req.message
        });
        return false;
    } else {
        return true;
    }
}

module.exports = handleJWTError