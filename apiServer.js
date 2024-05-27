const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/postsRoute");
const mongoSanitize = require("express-mongo-sanitize");
const toobusy = require("toobusy-js");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const { connectToDatabase } = require("./database");
const bodyParser = require("body-parser");
const express = require("express");
var cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(hpp());
app.use(limiter);

app.use(function (req, res, next) {
  if (toobusy()) {
    res.send(503, "I'm busy right now, sorry.");
  } else {
    next();
  }
});

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/", () => {
  res.status(200).send("Server Running!!");
});

//Middleware that handles any unspecified Route that is associated
app.use((req, res, next) => {
  const error = new HttpError("Could Not Find This Route", 404);
  throw error;
});

//Middleware to handle and work upon error
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An Unknown Error Occured!!!!!!" });
});

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on PORT: ${port}`);
    });
  } catch (error) {
    console.error(
      "Failed to connect to the database. Server not started.",
      error
    );
  }
};

startServer();
