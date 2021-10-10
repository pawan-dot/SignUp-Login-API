const userController = require("../Controller/user");

function initRoutes(app) {
  //handdle routes
  app.post("/user/signup", userController().store);
  app.post("/user/login", userController().login);

  //catch 404 and forword to event handler
  app.use((req, res, next) => {
    res.status(404).json({
      error: "Page Not Found",
    });
  });
  //error handler
  app.use((req, res, next) => {
    //set local, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    //render the error page
    req.status(err.status || 500);
    res.status(404).json({
      error: "Page Not Found",
    });
    //internal server error
    res.status(500).json({
      error: "Internal Server Error",
    });
  });
}

module.exports = initRoutes;
