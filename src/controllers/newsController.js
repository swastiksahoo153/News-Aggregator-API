const handleJWTError = require("./authenticationHelper");
const getNewsArticles = require("../newsAPI");
const {
  markArticleRead,
  markArticleFavorite,
  getReadArticles,
  getFavoriteArticles,
} = require("../data");

const getNewsForUser = async (req, res) => {
  try {
    handleJWTError(req, res);
    const preferences = await req.user.getUserPreferences();
    const articles = await getNewsArticles({ preferences });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const markArticleAsReadController = async (req, res) => {
  try {
    handleJWTError(req, res);
    const { status } = await markArticleRead(req.params.id);
    res
      .status(200)
      .json({ message: `Article ${req.params.id} marked as read` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReadArticlesController = async (req, res) => {
  try {
    handleJWTError(req, res);
    const preferences = await req.user.getUserPreferences();
    const articles = await getNewsArticles({ preferences });
    const readArticles = await getReadArticles(articles);
    res.status(200).json(readArticles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const markArticleAsFavoriteController = async (req, res) => {
  try {
    handleJWTError(req, res);
    const { status } = await markArticleFavorite(req.params.id);
    res
      .status(200)
      .json({ message: `Article ${req.params.id} marked as favorite` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFavoriteArticlesController = async (req, res) => {
  try {
    handleJWTError(req, res);
    const preferences = await req.user.getUserPreferences();
    const articles = await getNewsArticles({ preferences });
    const favoriteArticles = await getFavoriteArticles(articles);
    res.status(200).json(favoriteArticles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getArticlesByKeywordController = async (req, res) => {
  try {
    handleJWTError(req, res);
    const articles = await getNewsArticles({ keyword: req.params.keyword });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getNewsForUser,
  markArticleAsReadController,
  getReadArticlesController,
  markArticleAsFavoriteController,
  getFavoriteArticlesController,
  getArticlesByKeywordController,
};
