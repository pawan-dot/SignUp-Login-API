const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bcrypt = require("bcrypt");
//db connection
require("./db/conn");

app.use(express.json());

//calling routes function
require("./Routes/route")(app);
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
