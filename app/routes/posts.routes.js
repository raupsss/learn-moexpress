module.exports = (app) => {
  const controllers = require("../controllers/post.controller");
  const router = require("express").Router();

  router.get("/", controllers.findAll);
  router.get("/:id", controllers.findId);
  router.post("/", controllers.create);
  router.put("/:id", controllers.update);
  router.delete("/:id", controllers.delete);

  app.use("/api/posts", router);
};
