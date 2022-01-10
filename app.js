const express = require("express");
// const { fs } = require("fs");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const Blog = require("./models/blog");

dotenv.config();

const blogRoutes = require("./routes/blogRoutes");

// 3rd party middleware
const morgan = require("morgan");
const render = require("ejs");

// express app
const app = express();

// connecting to mongodb
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) // this is ASync so returns a promice
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine (ejs)
app.set("view engine", "ejs"); // by default it will look int views folder
// app.set("views", "myviews"); // if other folder set the folder

// listening for request 

// middleware and static files
app.use(express.static("public")); // anything inside this folder will be made avilable as static file (for files like css)

app.use(express.urlencoded({ extended: true})); // takes all the url encoded data and passes that into  an obj that can be used in request obj

// 3rd party middleware
// app.use(morgan("dev"));
// app.use(morgan("tiny"));

// app.use((req,res,next) => {
//     console.log("new request made:");
//     console.log("host: ", req.hostname);
//     console.log("path: ", req.path);
//     console.log("method: ", req.method);
//     next();
// });

app.get("/", (req,res) => {
    res.redirect("/blogs")
});

// if we search for / the below code is not executed
// app.use((req,re s,next) => {
//     console.log("next middleware")
//     next();
// });

app.get("/about", (req,res) => {
    //automatically sets the content type and also sets the sataus code
    // res.send("<p> Home page</p>");
    // res.sendFile("./views/about.html", {root: __dirname});
    res.render("about", { title: "about"});
});

// blog routes
app.use("/blogs",blogRoutes);


// redirect page
// app.get("/about-us", (req,res) => {
//     res.redirect("/about");
// });

// 404 page
// and this code must be at the bottom
app.use((req,res) => {
    // res.status(400).sendFile("./views/404.html", { root: __dirname});
    res.render("404", { title: "404"});
});