const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/SignUp-Login-API";
mongoose.connect(url, {}).then(() => {
  console.log("connection done");
});
