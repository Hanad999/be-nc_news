const {gettingtopics} = require('./models')
const express = require("express");

function getTopics(req, res, next){
    return gettingtopics().then((topics) => {
        res.status(200).send({topics: topics})
    }).catch(err => {next(err)})
}


module.exports = {getTopics}