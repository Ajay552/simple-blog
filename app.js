const express = require("express");
// const { read } = require("fs");
const mongoose = require("mongoose");
const Blog = require("./models/blog");


// const { supportsColor } = require("supports-color");
// 3rd party middleware
const morgan = require("morgan");

// express app
const app = express();

// connecting to mongodb
const dbURI = "mongodb+srv://Ajay:9886565220@nodeblog.y7zwz.mongodb.net/NodeBlog?retryWrites=true&w=majority";
mongoose.connect(dbURI) // this is ASync so returns a promice
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine (ejs)
app.set("view engine", "ejs"); // by default it will look int views folder
// app.set("views", "myviews"); // if other folder set the folder

// listening for request 

// middleware and static files
app.use(express.static("public")); // anything inside this folder will be made avilable as static file

// 3rd party middleware
app.use(morgan("dev"));
app.use(morgan("tiny"));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req,res) => {
    const blog = new Blog({
        title: "new blog 2",
        snippet: "about my new blog",
        body: "mode about my new blog"
    });

    // store in the database
    blog.save()  // this is an async task
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/all-blog", (req,res) => {
    Blog.find()  // gets all blogs and we use directly on th Blog not the instance while finding
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});


app.get("/single-blog", (req,res) => {
    Blog.findById("61a8d36de2d609466fe4378c")  
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

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