// Imports here
const db = require('../config/db-config');


exports.viewComments = async (req, res) => {
    const blog_id = Number(req.query.blog_id); // Get the blog ID from the request parameters
    const sql = "SELECT c.*, u.name as author_name, u.surname as author_surname, u.profile_image as author_image FROM comment c INNER JOIN users u ON c.author_id = u.id WHERE c.blog_id = $1";
    db.query(sql, [blog_id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to load data" });
        } else {
            res.status(200).json(results.rows);
        }
    })
}

exports.addComment = async (req, res) => {
    const { content } = req.body;
    const blog_id = Number(req.query.blog_id); 
    const author_id = Number(req.query.author_id); 
    const sql = "INSERT INTO comment (blog_id, content, author_id) VALUES ($1,$2,$3)";

    db.query(sql, [blog_id, content, author_id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to add comment" });
        } else {
            const io = req.app.get('socketio');
            if (io) {
                console.log('Emitting newComment event');
                io.emit('newComment', { blog_id});
            } 
            res.status(201).json({ message: "Comment added successfully" });
        }
    })
}

exports.deleteComment = async (req, res) => {
    const id = Number(req.query.id);
    const sql = "DELETE FROM comment WHERE id = $1";
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to delete comment" });
        } else {
            res.status(200).json({ message: "Comment deleted successfully" });
        }
    })  
}



exports.deleteMultipleComments = async (req, res) => {
    const ids = req.body.ids; // Expecting an array of IDs in the request body

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Invalid input. Provide an array of IDs." });
    }

    const sql = `DELETE FROM comment WHERE id = ANY($1::int[])`;
    db.query(sql, [ids], (err, results) => {
        if (err) {
            console.log(err);
            res.status(400).json({ message: "Failed to delete comments" });
        } else {
            res.status(200).json({ message: "Comments deleted successfully" });
        }
    });
};