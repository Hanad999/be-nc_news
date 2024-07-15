const { gettingtopics, gettingArticle } = require("./models");
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
  if (isNaN(article_id)) {
  }
  console.log(article_id);
  return gettingArticle(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getTopics, getAllEndpoints, getarticleById };
