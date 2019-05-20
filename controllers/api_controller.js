module.exports = app => {
  const axios = require("axios");
  const cheerio = require("cheerio");
  const article = require("../models/index");

  app.get("/", (req, res) => {
    article.find({}, (err, response) => {
      if (err) throw err;
      console.log(response);
      res.render("index", { response });
    });
  });

  app.get("/api/scrape", (req, res) => {
    axios.get("https://nypost.com/sports/").then(response => {
      article.deleteMany({}, err => {});
      let $ = cheerio.load(response.data);
      $("h3")
        .each((i, element) => {
          let title = $(element)
            .children("a")
            .text();
          let link = $(element)
            .children("a")
            .attr("href");
          console.log(title, link);

          if (title && link) {
            article.create(
              {
                title,
                link
              },
              (err, completed) => {
                let consoleResponse = err ? err : console.log(`inserted`);
              }
            );
          }
        })
        .then(setTimeout(location.reload(true), 1000));
    });
  });
};
