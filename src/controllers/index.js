const { getUserPreferences, updateUserPreferences } = require("./userController");
const { getNewsForUser, markArticleAsReadController, getReadArticlesController, markArticleAsFavoriteController, getFavoriteArticlesController, getArticlesByKeywordController } = require("./newsController");

module.exports = {getUserPreferences, updateUserPreferences, getNewsForUser, markArticleAsReadController, getReadArticlesController, markArticleAsFavoriteController, getFavoriteArticlesController, getArticlesByKeywordController}