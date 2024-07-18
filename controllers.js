const {
  gettingtopics,
  gettingArticle,
  gettingArticleData,
  gettingAllcommentsById,
  addingNewComment,
  updatingArticleById,
  deleteBycommentId,
  getAllUsers,
} = require("./models");
const express = require("express");
const endpoints = require("./endpoints.json");

function getTopics(req, res, next) {
  return gettingtopics()
    .then((topics) => {
      res.status(200).send({ topics: topics });
    })
    .catch((err) => {
      next(err);
    });
}

function getAllEndpoints(req, res, next) {
  res.status(200).send({ endpoints: endpoints });
}

function getarticleById(req, res, next) {
  const { article_id } = req.params;
  return gettingArticle(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
}

function getArticles(req, res, next) {
  const { sort_by, order_by, topic } = req.query;
  return gettingArticleData(sort_by, order_by, topic)
    .then((articles) => {
        // console.log(articles, 'now me')
        res.status(200).send({ articles: articles })})
    .catch((err) => next(err));
}

function getCommentsByaritcle_id(req, res, next) {
  const { article_id } = req.params;
  return gettingAllcommentsById(article_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
}

function addCommentToArticle(req, res, next) {
  const { article_id } = req.params;
  const newComment = req.body;
  return addingNewComment(article_id, newComment)
    .then((addedComment) =>
      res.status(201).send({ addedComment: addedComment })
    )
    .catch((err) => next(err));
}

function updateArticle(req, res, next) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  return updatingArticleById(article_id, inc_votes)
    .then((newlyUpdated) =>
      res.status(200).send({ newlyUpdated: newlyUpdated })
    )
    .catch((err) => next(err));
}

function deleteComment(req, res, next) {
  const { comment_id } = req.params;
  return deleteBycommentId(comment_id)
    .then(() => res.status(204).send())
    .catch((err) => next(err));
}

function getUsers(req, res, next) {
  return getAllUsers()
    .then((users) => res.status(200).send({ users: users }))
    .catch((err) => next(err));
}

module.exports = {
  getTopics,
  getAllEndpoints,
  getarticleById,
  getArticles,
  getCommentsByaritcle_id,
  addCommentToArticle,
  updateArticle,
  deleteComment,
  getUsers,
};
