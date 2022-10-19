const NEWSAPIKEY = `bcc447f10d124229935dceeae5858aad`;
const trendingNewsURL = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${NEWSAPIKEY}`;
const topNewsURL = `https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=${NEWSAPIKEY}`;

export { trendingNewsURL, topNewsURL };
