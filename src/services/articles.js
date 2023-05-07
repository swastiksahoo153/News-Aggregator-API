const store = require("../data/dataStore");

const markArticleRead = (userId, id) => {
  store[userId].readArticleIds.push(id);
  return Promise.resolve({ status: true });
};

const markArticleFavorite = (userId, id) => {
  store[userId].favoriteArticleIds.push(id);
  return Promise.resolve({ status: true });
};

const getReadArticles = (userId, articles) => {
  const readArticles = articles.filter((article) =>
    store[userId].readArticleIds.includes(article.publishedAt)
  );
  return Promise.resolve(readArticles);
};

const getFavoriteArticles = (userId, articles) => {
  const favoriteArticles = articles.filter((article) =>
    store[userId].favoriteArticleIds.includes(article.publishedAt)
  );
  return Promise.resolve(favoriteArticles);
};

module.exports = {
  markArticleRead,
  markArticleFavorite,
  getReadArticles,
  getFavoriteArticles,
};
