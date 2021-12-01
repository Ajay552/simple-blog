const express = require("express");
const { read } = require("fs");

// express app
const app = express();

// listening for request 
app.listen(3000);

app.get("/", (req,res) => {
    //automatically sets the content type and also sets the sataus code
    // res.send("<p> Home page</p>");
    res.sendFile("./views/index.html", {root: __dirname});
});

app.get("/about", (req,res) => {
    //automatically sets the content type and also sets the sataus code
    // res.send("<p> Home page</p>");
    res.sendFile("./views/about.html", {root: __dirname});
});

// redirect page
app.get("/about-us", (req,res) => {
    res.redirect("/about");
});

// 404 page
// and this code must be at the bottom
app.use((req,res) => {
    res.status(400).sendFile("./views/404.html", { root: __dirname});
});