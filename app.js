const express = require("express");
const { read } = require("fs");
// const { supportsColor } = require("supports-color");
// 3rd party middleware
const morgan = require("morgan");

// express app
const app = express();

// register view engine (ejs)
app.set("view engine", "ejs"); // by default it will look int views folder
// app.set("views", "myviews"); // if other folder set the folder

// listening for request 
app.listen(3000);

// middleware and static files
app.use(express.static("public")); // anything inside this folder will be made avilable as static file

// 3rd party middleware
app.use(morgan("dev"));
app.use(morgan("tiny"));

// app.use((req,res,next) => {
//     console.log("new request made:");
//     console.log("host: ", req.hostname);
//     console.log("path: ", req.path);
//     console.log("method: ", req.method);
//     next();
// });

app.get("/", (req,res) => {
    //automatically sets the content type and also sets the sataus code
    // res.send("<p> Home page</p>");

    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];

    res.render("index", { title: "Home", blogs: blogs});
});

// if we search for / the below code is not executed
// app.use((req,res,next) => {
//     console.log("next middleware")
//     next();
// });

app.get("/about", (req,res) => {
    //automatically sets the content type and also sets the sataus code
    // res.send("<p> Home page</p>");
    // res.sendFile("./views/about.html", {root: __dirname});
    res.render("about", { title: "about"});
});

// redirect page
// app.get("/about-us", (req,res) => {
//     res.redirect("/about");
// });

app.get("/blogs/create", (req,res) => {
    res.render("create", { title: "create"});
});

// 404 page
// and this code must be at the bottom
app.use((req,res) => {
    // res.status(400).sendFile("./views/404.html", { root: __dirname});
    res.render("404", { title: "404"});
});