const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('441f35b53e10426abc974365f73ef254');

const getNewsResults = (preferences) => {
    return Promise.all(preferences.map(preference => {
        return newsapi.v2.topHeadlines({
            category: preference,
            language: 'en',
            country: 'us'
        })
    }))
}


const getNewsArticles = async (preferences) => { 
    const newsResults = await getNewsResults(preferences);
    const articles = newsResults.map(newsResult => newsResult.articles).flat(1);
    return Promise.resolve(articles);
}

module.exports = getNewsArticles
