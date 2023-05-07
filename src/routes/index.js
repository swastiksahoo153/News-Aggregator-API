const routes = require("express").Router();
const bodyParser = require("body-parser");
const { verifyToken } = require("../middleware/authJWT");
const mcache = require("../middleware/cache");

const { signup, signin } = require("../controllers/authController");
const {
  getUserPreferencesController,
  updateUserPreferencesController,
  getNewsForUserController,
  markArticleAsReadController,
  getReadArticlesController,
  markArticleAsFavoriteController,
  getFavoriteArticlesController,
  getArticlesByKeywordController,
} = require("../controllers");

const CACHE_TIMEOUT = 60 * 5; // 5 minutes

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

// ----------Authentication Routes----------
routes.post("/register", signup);
routes.post("/login", signin);

// ----------User Preference Routes----------
routes.get("/preferences", verifyToken, getUserPreferencesController);
routes.put("/preferences", verifyToken, updateUserPreferencesController);

// ----------News Articles----------
routes.get(
  "/news",
  verifyToken,
  mcache(CACHE_TIMEOUT),
  getNewsForUserController
);

routes.post("/news/:id/read", verifyToken, markArticleAsReadController);
routes.post("/news/:id/favorite", verifyToken, markArticleAsFavoriteController);

routes.get(
  "/news/read",
  verifyToken,
  mcache(CACHE_TIMEOUT),
  getReadArticlesController
);
routes.get(
  "/news/favorites",
  verifyToken,
  mcache(CACHE_TIMEOUT),
  getFavoriteArticlesController
);

routes.get(
  "/news/search/:keyword",
  verifyToken,
  mcache(CACHE_TIMEOUT),
  getArticlesByKeywordController
);

module.exports = routes;
