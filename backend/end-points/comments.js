const express = require("express");
const comment_controller = require("../controllers/comment-controller");

const router = express.Router();

// COMMENT ENDPOINT PATHS
router.get('/view-all', comment_controller.viewComments);
router.post('/add-comment', comment_controller.addComment);
router.patch('/edit-comment/:comment_id', comment_controller.updateComment);
router.patch('/delete-comment/:comment_id', comment_controller.deleteComment);

module.exports = router;