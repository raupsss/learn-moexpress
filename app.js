// Import
const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

db.mongoose
  .connect(db.url, mongooseConfig)
  .then(() => {
    console.log(`Database connected !`);
  })
  .catch((err) => {
    console.log(`Cannot connect to database !!!`, err);
    process.exit();
  });

require("./app/routes/posts.routes")(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http:/localhost:${PORT}`);
});
