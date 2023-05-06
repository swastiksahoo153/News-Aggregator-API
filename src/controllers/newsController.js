const {
  markArticleRead,
  markArticleFavorite,
  getReadArticles,
  getFavoriteArticles,
  getUserPreferences,
  getNewsArticles,
} = require("../services");

const getNewsForUserController = async (req, res) => {
  try {
    const preferences = await getUserPreferences(req.user.id);
    const articles = await getNewsArticles({ preferences });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const markArticleAsReadController = async (req, res) => {
  try {
    const { status } = await markArticleRead(req.user.id, req.params.id);
    res
      .status(200)
      .json({ message: `Article ${req.params.id} marked as read` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReadArticlesController = async (req, res) => {
  try {
    const preferences = await getUserPreferences(req.user.id);
    const articles = await getNewsArticles({ preferences });
    const readArticles = await getReadArticles(req.user.id, articles);
    res.status(200).json(readArticles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const markArticleAsFavoriteController = async (req, res) => {
  try {
    const { status } = await markArticleFavorite(req.user.id, req.params.id);
    res
      .status(200)
      .json({ message: `Article ${req.params.id} marked as favorite` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFavoriteArticlesController = async (req, res) => {
  try {
    const preferences = await getUserPreferences(req.user.id);
    const articles = await getNewsArticles({ preferences });
    const favoriteArticles = await getFavoriteArticles(req.user.id, articles);
    res.status(200).json(favoriteArticles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getArticlesByKeywordController = async (req, res) => {
  try {
    const articles = await getNewsArticles({ keyword: req.params.keyword });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getNewsForUserController,
  markArticleAsReadController,
  getReadArticlesController,
  markArticleAsFavoriteController,
  getFavoriteArticlesController,
  getArticlesByKeywordController,
};
