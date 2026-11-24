const express = require("express");
const { NotFoundError, ErrorHandler } = require("./utils/error-handler");
const { blogModel } = require("./model/blog.model");
require("./config/mongo.config");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded());
app.get("/blogs", async (req, res, next) => {
  const blogs = await blogModel.find();

  res.status(200).send({
    statusCode: res.statusCode,
    blogsLength: blogs.length,
    blogs,
  });
});
app.post("/blogs", async (req, res) => {
  const { title, text } = req.body;
  const result = await blogModel.insertOne({
    title,
    text,
  });
  res.status(201).send(result);
});

app.get("/blogs/:id", async (req, res, next) => {
  const { id } = req.params;
  const blog = await blogModel.findOne({
    _id: id,
  });
  if (!blog) throw { statusCode: 404, message: "Blog not found!" };
  res.status(200).send({
    statusCode: res.statusCode,
    blog,
  });
});
app.put("/blogs/:id", async (req, res, next) => {
  const { id } = req.params;
  const blog = await blogModel.findOne({
    _id: id,
  });
  if (!blog) throw { statusCode: 404, message: "Blog not found!" };
  const { title, text } = req.body;
  const updatedBlog = await blogModel.updateOne(
    {
      _id: id,
    },
    {
      title,
      text,
    },
  );
  res.status(200).send({
    statusCode: res.statusCode,
    blog: updatedBlog,
  });
});

// second way
app.patch("/blogs/:id", async (req, res, next) => {
  const { id } = req.params;
  const blog = await blogModel.findOne({
    _id: id,
  });
  if (!blog) throw { statusCode: 404, message: "Blog not found!" };
  const newObject = req.body;
  Object.assign(blog, newObject);
  await blog.save();
  res.status(200).send({
    statusCode: res.statusCode,
    blog,
  });
});
app.delete("/blogs/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await blogModel.deleteOne({
    _id: id,
  });

  res.status(201).send(result);
});

app.post("/secondWay", async (req, res) => {
  const { title, text } = req.body;
  const newBlog = new blogModel({
    title,
    text,
  });
  await newBlog.save();
  res.status(200).send(newBlog);
});
app.use(NotFoundError);
app.use(ErrorHandler);
app.listen(PORT, () => {
  console.log("app serverd successfully: http://localhost:" + PORT);
});
