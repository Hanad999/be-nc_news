const db = require("./db/connection");
const format = require("pg-format");

function gettingtopics() {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    console.log(rows);
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

module.exports = { gettingtopics, gettingArticle };
