const express = require("express");
const createError = require("http-errors");
const mogran = require("morgan");
const cors = require("cors");
require("dotenv").config();
require('./utils/mongodb.util')
require('./utils/redis.init')

// Routes
const authRoutes = require('./routers/auth.routes')


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mogran("dev"));
app.use(cors());

app.use('/api/v1/register', authRoutes)

app.get("/", (req, res) => {
  res.send("It works!");
});


app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
