const express = require("express");
const blog_controller = require("../controllers/blog-controller");

const router = express.Router();

//BLOG ENDPOINT PATHS
router.get('/view-all', blog_controller.viewBlogs)
router.get('/view-latest', blog_controller.viewLatestBlogs)
router.get('/view-search', blog_controller.viewSearch)
router.get('/view-popular', blog_controller.viewPopular)
router.get('/view-content/:id', blog_controller.viewBlog)
router.post('/add-blog', blog_controller.addBlog)
router.patch('/edit-blog:blog_id', blog_controller.updateBlog)
router.patch('/delete-blog:blog_id', blog_controller.deleteBlog)


module.exports = router;