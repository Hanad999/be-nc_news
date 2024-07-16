const db = require("./db/connection");
const format = require("pg-format");

function gettingtopics() {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
}

function gettingArticle(article_id) {
  return db
    .query(
      ` SELECT * FROM articles
        WHERE article_id =$1;`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not Found",
        });
      }
      return rows[0];
    });
}

function gettingArticleData() {
  return db
    .query(
      `
      SELECT 
        articles.article_id, 
        articles.title, 
        articles.topic, 
        articles.author, 
        articles.votes, 
        articles.created_at, 
        articles.article_img_url,
        COUNT(comments.comment_id)::INTEGER AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC;
    `
    )
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = { gettingtopics, gettingArticle, gettingArticleData };
