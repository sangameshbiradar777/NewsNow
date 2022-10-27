const NEWSAPIKEY = `6169a0562daf403786c4abdd9b472973`;
const baseURL = `https://newsapi.org/v2/everything?`;
const trendingNewsURL = `https://newsapi.org/v2/top-headlines?language=en&apiKey=${NEWSAPIKEY}`;
const topNewsURL = `https://newsapi.org/v2/top-headlines?country=in&language=en&apiKey=${NEWSAPIKEY}`;
const technologyNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=technology&apiKey=${NEWSAPIKEY}`;
const sportsNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=sports&apiKey=${NEWSAPIKEY}`;
const entertainmentNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=entertainment&apiKey=${NEWSAPIKEY}`;
const businessNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=business&apiKey=${NEWSAPIKEY}`;
const healthNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=health&apiKey=${NEWSAPIKEY}`;
const scienceNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=science&apiKey=${NEWSAPIKEY}`;
const sourcesURL = `https://newsapi.org/v2/top-headlines/sources?language=en&apiKey=${NEWSAPIKEY}`;
const CONTENTCHARACTERLIMIT = 150;
const AUTHORCHARACHTERLIMIT = 20;
const MAXCHARACTERLIMIT = 200;

const newsImageFallbackURL = `https://images.pexels.com/photos/10464454/pexels-photo-10464454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`;

export {
  trendingNewsURL,
  topNewsURL,
  technologyNewsURL,
  sportsNewsURL,
  entertainmentNewsURL,
  businessNewsURL,
  healthNewsURL,
  scienceNewsURL,
  sourcesURL,
  CONTENTCHARACTERLIMIT,
  AUTHORCHARACHTERLIMIT,
  MAXCHARACTERLIMIT,
  newsImageFallbackURL,
  NEWSAPIKEY,
  baseURL,
};
