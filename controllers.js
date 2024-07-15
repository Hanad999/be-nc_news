const { gettingtopics } = require("./models");
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

module.exports = { getTopics, getAllEndpoints };
