const newsAPIKeys = [
  "bcc447f10d124229935dceeae5858aad",
  "6169a0562daf403786c4abdd9b472973",
  "f8020bac276b4c698fc5282bb4e2b702",
  "b720fe057ca34e46809d9e53a42ac6bd",
  "0a12b844bada4c988fc8f5e6a96e0a29",
  "97ea63ec57424d11b739e08c2851e2a1",
  "9db544a55f824effa9d8c198caba01ee",
];
const baseURL = `https://newsapi.org/v2/everything?`;
const serverURL = "https://newsnow-api.herokuapp.com/getnews/";
const trendingNewsURL = `https://newsapi.org/v2/top-headlines?language=en`;
const topNewsURL = `https://newsapi.org/v2/top-headlines?country=in&language=en`;
const technologyNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=technology`;
const sportsNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=sports`;
const entertainmentNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=entertainment`;
const businessNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=business`;
const healthNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=health`;
const scienceNewsURL = `https://newsapi.org/v2/top-headlines?language=en&category=science`;
const sourcesURL = `https://newsapi.org/v2/top-headlines/sources?language=en`;
const CONTENTCHARACTERLIMIT = 150;
const AUTHORCHARACHTERLIMIT = 20;
const MAXCHARACTERLIMIT = 200;

const searchResultsToDisplayPerPage = 10;

// For developer/free plan only 100 search results are allowed
const maximumSearchResultsAllowed = 100;

const preLoadImage =
  "https://images.unsplash.com/photo-1552324190-9e86fa095c4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1&q=80";

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
  preLoadImage,
  newsImageFallbackURL,
  newsAPIKeys,
  baseURL,
  serverURL,
  searchResultsToDisplayPerPage,
  maximumSearchResultsAllowed,
};
