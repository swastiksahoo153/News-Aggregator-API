const {
  getUserPreferencesController,
  updateUserPreferencesController,
} = require("./userController");
const {
  getNewsForUserController,
  markArticleAsReadController,
  getReadArticlesController,
  markArticleAsFavoriteController,
  getFavoriteArticlesController,
  getArticlesByKeywordController,
} = require("./newsController");

module.exports = {
  getUserPreferencesController,
  updateUserPreferencesController,
  getNewsForUserController,
  markArticleAsReadController,
  getReadArticlesController,
  markArticleAsFavoriteController,
  getFavoriteArticlesController,
  getArticlesByKeywordController,
};
