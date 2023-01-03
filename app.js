// require express
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
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

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

app.post("/blogs", (req, res) => {
  // create new instance of the blog
  const blog = new Blog(req.body);
  // save the blog document in the database
  blog
    .save()
    .then((result) => {
      // redirecting to all blogs
      console.log(result);
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.get("/blogs/:id", (req, res) => {
  // getting the id
  const id = req.params.id;
  // finding the correct blog
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blog Details", blog: result });
    })
    .catch((err) => console.log(err));
});

app.delete("/blogs/:id", (req, res) => {
  // getting the id
  const id = req.params.id;
  // deleting the blog
  Blog.findByIdAndDelete(id)
    .then((result) => {
      // sending redirect to frontend
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

// redirects
// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
