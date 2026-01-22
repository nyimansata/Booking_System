require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongan = require("morgan");
const path = require("path");
const fileUpload = require("express-fileupload");
const ErrorHandler = require("./middlewares/error");

const AuthRoute = require("./routes/auths");
const TeachersRoute = require("./routes/teachers");

const app = express();

// file upload
app.use(fileUpload());

// for ejs view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// middleware
app.use(express.json());

// logger
app.use(mongan("dev"));

// routes
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/teachers", TeachersRoute);

// error handling
app.use(ErrorHandler);

//show pages login
app.get("/", (req, res) => {
  res.render("auth");
});

// sign up
app.get("/signup", (req, res) => {
  res.render("sign-up");
});

// student
app.get("/student", (req, res) => {
  res.render("student");
});

// db + server
mongoose
  .connect(process.env.DB_URL, { dbName: "appoinment_system" })
  .then(() => {
    console.log("db connected");
    const port = process.env.P0RT || 5000;
    app.listen(port, () => {
      console.log("Listening to port:", { port });
    });
  })
  .catch((error) => {
    console.log("database failed to connect", error.message);
  });

// register 2
