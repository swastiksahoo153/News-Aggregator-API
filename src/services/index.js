const {
  createUser,
  findUserByEmail,
  comparePassword,
  createToken,
} = require("./auth");

const {
  updateUserPreferences,
  getUserPreferences,
  deleteAllUsers,
} = require("./user");

const {
  markArticleRead,
  markArticleFavorite,
  getReadArticles,
  getFavoriteArticles,
} = require("./articles");

const getNewsArticles = require("./newsAPI");

module.exports = {
  createUser,
  findUserByEmail,
  comparePassword,
  createToken,
  updateUserPreferences,
  getUserPreferences,
  deleteAllUsers,
  markArticleRead,
  markArticleFavorite,
  getReadArticles,
  getFavoriteArticles,
  getNewsArticles,
};
