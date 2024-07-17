const db = require("./db/connection");
const { CheckArticleidExists } = require("./db/seeds/utils");
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

function gettingAllcommentsById(article_id) {
  const queryString = `
        SELECT comment_id, body, votes, author, article_id, created_at
        FROM comments
        WHERE article_id = $1
        ;`;
  const promiseArr = [db.query(queryString, [article_id])];
  if (article_id !== undefined) {
    promiseArr.push(CheckArticleidExists(article_id));
  }
  return Promise.all(promiseArr).then((results) => {
    const queryResult = results[0];
    const articleIdResult = results[1];
    if (queryResult.rows.length === 0 && articleIdResult === false) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return queryResult.rows;
  });
}

function addingNewComment(article_id, newComment){
    const {username, body} = newComment
    const insertValues = [username, body, article_id]
    const queryString = format(
      `INSERT INTO comments (author, body, article_id) 
       VALUES (%L) RETURNING *`,
      insertValues
    );
    return db.query(queryString).then(({rows}) => {return rows[0]})
}

function updatingArticleById(article_id, inc_votes){
    const articleId_intoInt = Number(article_id)
    return db.query(`
            UPDATE articles
            SET votes = votes + $1
            WHERE article_id = $2
            RETURNING *;`,
            [inc_votes, articleId_intoInt])
            .then(({rows}) => {
            if(rows.length === 0){
                return Promise.reject({
                  status: 404,
                  msg: "Not Found",
                });
            }
        return rows[0]
        })
}

function deleteBycommentId(comment_id){
   if (isNaN(comment_id)) {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }
  return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [comment_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
      }
      return rows;
    });
};

module.exports = {
  gettingtopics,
  gettingArticle,
  gettingArticleData,
  gettingAllcommentsById,
  addingNewComment,
  updatingArticleById,
  deleteBycommentId,
};
