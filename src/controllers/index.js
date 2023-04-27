const { getUserPreferences, updateUserPreferences } = require("./userController");
const { getNewsForUser, markArticleAsReadController, getReadArticlesController, markArticleAsFavoriteController, getFavoriteArticlesController } = require("./newsController");

module.exports = {getUserPreferences, updateUserPreferences, getNewsForUser, markArticleAsReadController, getReadArticlesController, markArticleAsFavoriteController, getFavoriteArticlesController}