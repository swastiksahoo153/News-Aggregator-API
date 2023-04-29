const store = require("./dataStore");

const markArticleRead = (id) => {
  store.readArticleIds.push(id);
  return Promise.resolve({ status: true });
};
const markArticleFavorite = (id) => {
  store.favoriteArticleIds.push(id);
  return Promise.resolve({ status: true });
};

const getReadArticles = (articles) => {
  const readArticles = articles.filter((article) =>
    store.readArticleIds.includes(article.publishedAt)
  );
  return Promise.resolve(readArticles);
};

const getFavoriteArticles = (articles) => {
  const favoriteArticles = articles.filter((article) =>
    store.favoriteArticleIds.includes(article.publishedAt)
  );
  return Promise.resolve(favoriteArticles);
};

module.exports = {
  markArticleRead,
  markArticleFavorite,
  getReadArticles,
  getFavoriteArticles,
};
