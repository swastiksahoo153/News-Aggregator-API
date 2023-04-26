const routes = require('express').Router();
const bodyParser = require('body-parser');
const verifyToken = require('../middleware/authJWT')

const { signup, signin } = require("../controllers/authController");
const { getUserPreferences, updateUserPreferences, getNewsForUser } = require("../controllers/newsController");

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

// Authentication Routes
routes.post('/register', signup);
routes.post('/login', signin);


// User Preference Routes
routes.get('/preferences', verifyToken, getUserPreferences)
routes.put('/preferences', verifyToken, updateUserPreferences)

// News Articles
routes.get('/news', verifyToken, getNewsForUser)


module.exports = routes;