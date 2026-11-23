
const express = require("express");
const { NotFoundError, ErrorHandler } = require("./utils/error-handler");
require("./config/mongo.config")
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {

});

app.use(NotFoundError);
app.use(ErrorHandler);
app.listen(PORT, () => {
  console.log("app serverd successfully: http://localhost:" + PORT);
});
