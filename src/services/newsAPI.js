const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("441f35b53e10426abc974365f73ef254");

const getNewsResults = ({ preferences, keyword }) => {
  if (!keyword) keyword = "";
  if (!preferences) preferences = [];

  return Promise.all(
    preferences.map((preference) => {
      return newsapi.v2.topHeadlines({
        q: keyword,
        category: preference,
        language: "en",
      });
    })
  );
};

const getNewsArticles = async ({ preferences, keyword }) => {
  try {
    const newsResults = await getNewsResults({ preferences, keyword });
    const articles = newsResults
      .map((newsResult) => newsResult.articles)
      .flat(1);
    return Promise.resolve(articles);
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = getNewsArticles;
