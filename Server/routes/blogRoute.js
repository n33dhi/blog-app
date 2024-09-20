const express = require('express');
const router = express.Router({ mergeParams: true });

const Authorise = require('../middleware/authUser');
const { CreateBlog, AllBlog, BlogDetail, DeleteBlog, UpdateBlog } = require('../controller/blogController');

router.use(Authorise);

router.get('/', AllBlog);
router.get('/blog', BlogDetail);
router.post('/newBlog', CreateBlog);
router.delete('/deleteBlog', DeleteBlog);
router.put("/updateBlog", UpdateBlog);


module.exports = router;