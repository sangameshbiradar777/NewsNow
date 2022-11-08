import express from 'express'; 
import parse from 'rss-to-json';

console.log(parse);

const app = express();

app.get('/', (req, res) => {
  // (async () => {
  //   const rss = await parse('https://flipboard.com/topic/investing.rss');

  //   res.send(rss);
  // })();

  // (async () => {

  //   // var rss = await parse('https://blog.ethereum.org/feed.xml');

  //   // console.log(JSON.stringify(rss, null, 3));



  // })();

  Parse('https://blog.ethereum.org/feed.xml').then(rss => {
    console.log(JSON.stringify(rss, null, 3));
});
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
})