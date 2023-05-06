const {
  createUser,
  findUserByEmail,
  comparePassword,
  createToken,
} = require("./auth");

const { updateUserPreferences, getUserPreferences } = require("./user");

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
  markArticleRead,
  markArticleFavorite,
  getReadArticles,
  getFavoriteArticles,
  getNewsArticles,
};
