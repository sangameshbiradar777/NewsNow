const NEWSAPIKEY = `bcc447f10d124229935dceeae5858aad`;
const trendingNewsURL = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${NEWSAPIKEY}`;
const topNewsURL = `https://newsapi.org/v2/top-headlines?country=in&language=en&apiKey=${NEWSAPIKEY}`;
const technologyNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=technology&apiKey=${NEWSAPIKEY}`;
const sportsNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=sports&apiKey=${NEWSAPIKEY}`;
const entertainmentNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=entertainment&apiKey=${NEWSAPIKEY}`;

const CONTENTCHARACTERLIMIT = 150;
const AUTHORCHARACHTERLIMIT = 20;
const MAXCHARACTERLIMIT = 200; 

export {
  trendingNewsURL,
  topNewsURL,
  technologyNewsURL,
  sportsNewsURL,
  entertainmentNewsURL,
  CONTENTCHARACTERLIMIT,
  AUTHORCHARACHTERLIMIT,
  MAXCHARACTERLIMIT
};
