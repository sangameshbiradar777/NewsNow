const NEWSAPIKEY = `bcc447f10d124229935dceeae5858aad`;
const trendingNewsURL = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${NEWSAPIKEY}`;
const topNewsURL = `https://newsapi.org/v2/top-headlines?country=in&language=en&apiKey=${NEWSAPIKEY}`;
const technologyNewsURL = `https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${NEWSAPIKEY}`;
const sportsNewsURL = `https://newsapi.org/v2/top-headlines?category=sports&language=en&apiKey=${NEWSAPIKEY}`;
const entertainmentNewsURL = `https://newsapi.org/v2/top-headlines?category=entertainment&language=en&apiKey=${NEWSAPIKEY}`;

export {
  trendingNewsURL,
  topNewsURL,
  technologyNewsURL,
  sportsNewsURL,
  entertainmentNewsURL,
};
