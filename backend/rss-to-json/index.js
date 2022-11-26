import express from 'express'; 
import Parser from 'rss-parser';
import cors from 'cors';

const app = express();
app.use(cors());
const parser = new Parser({
  customFields: {
    item: ['media:content', ['media:content.$.url', 'imageURL'], ['link', 'url'], ['pubDate', 'created']]
  }
});

app.get('/:url', (req, res, next) => {
  console.log(req.params.url);
  (async () => {
    let rss;
    try{
      rss = await parser.parseURL(req.params.url);
    }
    catch(error) {
      next(error);
    }

    res.json(rss);
  })();
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
})