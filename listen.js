const app = require("./app")

const port = 9777

app.listen(port,() => {
    console.log("app listing on port",port)
})