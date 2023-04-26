const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('441f35b53e10426abc974365f73ef254');

const getNewsArticles = (preferences) => {
    return Promise.all(preferences.map(preference => {
        return newsapi.v2.topHeadlines({
            category: preference,
            language: 'en',
            country: 'us'
        })
    }))
}

module.exports = getNewsArticles
