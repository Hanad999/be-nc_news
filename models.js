const db = require("./db/connection");
const format = require("pg-format");

function gettingtopics(){
    return db.query(`SELECT * FROM topics`).then(({rows}) => {
        console.log(rows)
        return rows
    })
}
module.exports = {gettingtopics}