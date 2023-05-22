const db = require("../models");
const Post = db.posts;

exports.findAll = (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message + "Internal Error",
      });
    });
};

exports.create = (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    published: req.body.published ? req.body.published : false,
  });

  post
    .save(post)
    .then((result) => {
      res.send(result);
    })
    .catch((err) =>
      res.status(400).send({
        message: err.message || "Bad Request",
      })
    );
};

exports.findId = (req, res) => {
  const id = req.params.id;

  Post.findById(id)
  .then((result) => {
    res.send({
      message: "Success",
      data: result,
    });
  })
  .catch(() =>
    res.status(404).send({
      message: 'ID Not Found'
    })
  );
};

exports.update = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Update Failed, ID Not Found",
        });
      }
      res.status(200).send({
        message: "Success Update",
        data: req.body,
      });
    })
    .catch((err) =>
      res.status(400).send({
        message: err.message + 'Bad Request'
      })
    );
};

exports.delete = (req, res) => {
  const id = req.params.id
  Post.findByIdAndRemove(id)
  .then((result) => {
    if (!result) {
      res.status(404).send({
        message: "Delete Failed, ID Not Found",
      });
    }
    res.status(200).send({
      message: "Success Delete",
      data: result,
    });
  })
  .catch((err) =>
    res.status(400).send({
      message: err.message + 'Bad Request'
    })
  );
}
