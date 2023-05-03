const { User, updateUserPreferences, getUserPreferences } = require("./user");
const {
  markArticleRead,
  markArticleFavorite,
  getReadArticles,
  getFavoriteArticles,
} = require("./articles");

module.exports = {
  User,
  markArticleRead,
  markArticleFavorite,
  getReadArticles,
  getFavoriteArticles,
  updateUserPreferences,
  getUserPreferences,
};
