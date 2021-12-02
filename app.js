const express = require("express");
// const { fs } = require("fs");
// const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// 3rd party middleware
const morgan = require("morgan");
const render = require("ejs");

// express app
const app = express();

// connecting to mongodb
const dbURI = "mongodb+srv://Ajay:9886565220@nodeblog.y7zwz.mongodb.net/NodeBlog?retryWrites=true&w=majority";
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
// app.use((req,res,next) => {
//     console.log("next middleware")
//     next();
// });

// blog routes

app.get("/about", (req,res) => {
    //automatically sets the content type and also sets the sataus code
    // res.send("<p> Home page</p>");
    // res.sendFile("./views/about.html", {root: __dirname});
    res.render("about", { title: "about"});
});

app.get("/blogs/create", (req,res) => {
    res.render("create", { title: "create a new blog"});
});

app.get("/blogs", (req,res) => {
    Blog.find().sort({ createdAt: -1 }) // sorts by time stamp so -1 is shows newest blog
        .then((result) => {
            res.render("index", {title: "All Blogs", blogs: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/blogs", (req,res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect("/blogs")
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render("details", { blog: result, title: "blog Details" });
        })
        .catch((err) => {
            console.log(err);
        })
});

app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/blogs" });
        })
        .catch((err) => {
            console.log(err)
        });
});



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