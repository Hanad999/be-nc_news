const express = require("express");
const {
  getTopics,
  getAllEndpoints,
  getarticleById,
  getArticles,
  getCommentsByaritcle_id,
  addCommentToArticle,
  updateArticle,
  deleteComment,
  getUsers,
} = require("./controllers");
const { customErrors, sqlErrors } = require("./error_handlers");

const app = express();
app.use(express.json());


app.get("/api/topics", getTopics);

app.get("/api", getAllEndpoints);

app.get("/api/articles/:article_id", getarticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByaritcle_id);

app.post("/api/articles/:article_id/comments", addCommentToArticle);

app.patch("/api/articles/:article_id",updateArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers)

app.use(customErrors);

app.use(sqlErrors);

module.exports = app;
