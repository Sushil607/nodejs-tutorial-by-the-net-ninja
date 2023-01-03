// require express
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
require("dotenv").config();

// set up express app
const app = express();

// connect to mongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to DB....");
    // listening for requests only after connection is established
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs"); // setting ejs as view engine
// app.set("views", "myviews");   // where to find your views ejs files

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(morgan("dev"));

// app.use((req, res, next) => {
//   console.log("New request made...");
//   console.log("Host : ", req.hostname);
//   console.log("path :", req.path);
//   console.log("method :", req.method);
//   next();
// });

// mongoose and mongodb sandbox routes
// app.get("/add-blog", (req, res) => {
//   // creating a new instance of the Blog
//   const blog = new Blog({
//     title: "new blog2",
//     snippet: "about my new blog2",
//     body: "more about my new blog2",
//   });

//   blog
//     .save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("63b2dad1094f2d418f86d572")
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// respond to requests
app.get("/", (req, res) => {
  // res.send("<p>Home Page</p>");
  // const blogs = [
  //   {
  //     title: "Yoshi finds eggs",
  //     snippet: "lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "Mario finds stars",
  //     snippet: "lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "How to defeat bowser",
  //     snippet: "lorem ipsum dolor sit amet consectetur",
  //   },
  // ];
  // res.render("index", { title: "Home", blogs });
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.send("<p>About Page </p>");
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// redirects
// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
