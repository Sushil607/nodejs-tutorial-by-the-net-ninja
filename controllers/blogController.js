const Blog = require("../models/Blog");
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  // getting the id
  const id = req.params.id;
  // finding the correct blog
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { title: "Blog Details", blog: result });
    })
    .catch((err) => {
      res.render("404", { title: "Blog Not Found" });
    });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new blog" });
};

const blog_create_post = (req, res) => {
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
};

const blog_delete = (req, res) => {
  // getting the id
  const id = req.params.id;
  // deleting the blog
  Blog.findByIdAndDelete(id)
    .then((result) => {
      // sending redirect to frontend
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
