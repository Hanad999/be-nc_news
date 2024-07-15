const express = require("express");
const { getTopics, getAllEndpoints } = require("./controllers");
const app = express();

app.get("/api/topics", getTopics);

app.get('/api',getAllEndpoints)

module.exports = app;
