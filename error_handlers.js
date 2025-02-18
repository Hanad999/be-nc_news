
function customErrors(err, req, res, next){
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    }
    next(err);
}

function sqlErrors(err, req, res, next){
     if (err.code === "22P02" || err.code === "23502" ) {
       res.status(400).send({ msg: "Bad Request" });
     }else if(err.code === "23503"){
      res.status(404).send({ msg: "Not Found" });
     }
}



module.exports = {customErrors, sqlErrors}