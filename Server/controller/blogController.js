const Blog = require("../model/blogModel");
const User = require("../model/userModel");

const AllBlog = async (req, res) => {
  try {
    // console.log(req.params);
    const { id } = req.params;

    //GET ALL BLOGS
    const blogs = await Blog.find({ authorId: id });

    res.status(200).json({
      data: blogs,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const CreateBlog = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body;

    //CREATE NEW BLOG
    await Blog.create({
      authorId: id,
      title,
      content,
    });

    res.status(200).send("blog created");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const DeleteBlog = async (req, res) => {
  try {
    const { id } = req.query;

    //CHECK IF BLOG EXISTS
    const blog = await Blog.findById(id);
    if (!blog) return res.status(401).send("blog does not exist");

    //DELETE THE BLOG
    await Blog.findByIdAndDelete(id);

    res.status(200).send("blog deleted");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const BlogDetail = async (req, res) => {
  try {
    const { id } = req.query;

    //GET BLOG DETAILS
    const details = await Blog.findById(id);
    if (!details) return res.status(401).send("blog does not exist");

    res.status(200).json({ details });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const UpdateBlog = async (req, res) => {
  try {
    const { id } = req.query;

    //GET BLOG DETAILS
    const isBlogExist = await Blog.findById(id);
    if (!isBlogExist) return res.status(401).send("blog does not exist");

    //UPDATE
    await Blog.findByIdAndUpdate(id, req.body);

    const updates = await Blog.findById(id);

    res.status(200).json({ updates });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  AllBlog,
  CreateBlog,
  BlogDetail,
  DeleteBlog,
  UpdateBlog,
};
