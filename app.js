// require express
const express = require("express");

// set up express app
const app = express();
// register view engine
app.set("view engine", "ejs"); // setting ejs as view engine
// app.set("views", "myviews");   // where to find your views ejs files

// listening for requests
app.listen(3000);

// respond to requests
app.get("/", (req, res) => {
  // res.send("<p>Home Page</p>");
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  // res.send("<p>About Page </p>");
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// redirects
// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
