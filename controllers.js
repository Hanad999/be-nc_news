const {
  gettingtopics,
  gettingArticle,
  gettingArticleData,
  gettingAllcommentsById,
} = require("./models");
const express = require("express");
const endpoints = require("./endpoints.json");
const comments = require("./db/data/test-data/comments");

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
  return gettingArticleData()
    .then((articles) => {
      res.status(200).send({ articles: articles });
    })
    .catch((err) => {
      next(err);
    });
}

function getCommentsByaritcle_id(req, res, next) {
    const { article_id } = req.params;
    return gettingAllcommentsById(article_id).then((comments) => {
        res.status(200).send({comments: comments})
    }).catch(err => {next(err)})
}

module.exports = {
  getTopics,
  getAllEndpoints, 
  getarticleById,
  getArticles,
  getCommentsByaritcle_id,
};
