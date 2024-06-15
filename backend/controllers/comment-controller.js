const db = require('../config/db-config');
exports.viewComments = async (req, res) => { 
    res.status(200).json({ message: "Response here" });
    // View All function in here
}

exports.addComment = async (req, res) => {
    const { content, author, postId } = req.body;

    if (!content || !author || !postId) {
        return res.status(400).json({ message: 'Content, author, and postId are required' });
    }

    try {
        const newComment = await Comment.create({
            content,
            author,
            postId
        });

        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add comment', error: error.message });
    }
}

exports.updateComment = async (req, res) => { 
    res.status(200).json({ message: "Response here" });
    // Update function in here
}

exports.deleteComment = async (req, res) => { 
    res.status(200).json({ message: "Response here" });
    // Delete function in here
}