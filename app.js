const express = require("express");
const {
  getTopics,
  getAllEndpoints,
  getarticleById,
  getArticles,
  getCommentsByaritcle_id,
} = require("./controllers");
const { customErrors, sqlErrors } = require("./error_handlers");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api", getAllEndpoints);

app.get("/api/articles/:article_id", getarticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByaritcle_id);

app.use(customErrors);

app.use(sqlErrors);

module.exports = app;
