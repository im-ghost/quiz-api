const app = require("./app")
require("./middlewares/app.middleware")(app)
const port = process.env.PORT || 5000
app.listen(port,()=>{
  console.log("running")
})