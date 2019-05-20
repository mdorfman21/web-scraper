const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const exphbs = require("express-handlebars");
let app = express();
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

let MONGOD_URI = process.env.MONGOD_URI || "mongodb://localhost/scrapedNews";
mongoose.connect(MONGOD_URI, { useNewUrlParser: true });

require("./controllers/api_controller")(app);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
