const express = require("express");
const comment_controller = require("../controllers/comment-controller");

const router = express.Router();

//BLOG ENDPOINT PATHS
router.get('/view-comments', comment_controller.viewComments)
router.post('/add-comment', comment_controller.addComment)
router.delete('/delete-comment', comment_controller.deleteComment)
router.delete('/delete-multiple-comments', comment_controller.deleteMultipleComments)

module.exports = router;