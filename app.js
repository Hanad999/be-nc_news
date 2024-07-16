const express = require("express");
const {
  getTopics,
  getAllEndpoints,
  getarticleById,
  getArticles,
} = require("./controllers");
const { customErrors, sqlErrors } = require("./error_handlers");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api", getAllEndpoints);

app.get("/api/articles/:article_id", getarticleById);

app.get("/api/articles", getArticles);

app.use(customErrors);

app.use(sqlErrors);

module.exports = app;
