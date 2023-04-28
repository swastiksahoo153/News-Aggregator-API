const routes = require('express').Router();
const bodyParser = require('body-parser');
const verifyToken = require('../middleware/authJWT')

const { signup, signin } = require("../controllers/authController");
const {getUserPreferences, updateUserPreferences, getNewsForUser, markArticleAsReadController, getReadArticlesController, markArticleAsFavoriteController, getFavoriteArticlesController, getArticlesByKeywordController} = require("../controllers");

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

routes.post('/news/:id/read', verifyToken, markArticleAsReadController)
routes.post('/news/:id/favorite', verifyToken, markArticleAsFavoriteController)

routes.get('/news/read', verifyToken, getReadArticlesController)
routes.get('/news/favorites', verifyToken, getFavoriteArticlesController)

routes.get('/news/search/:keyword', verifyToken, getArticlesByKeywordController)

module.exports = routes;