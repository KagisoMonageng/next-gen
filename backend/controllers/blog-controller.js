// Imports here
const db = require('../config/db-config');

exports.viewBlogs = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const offset = (page - 1) * limit;

    const sql = "SELECT b.id, b.title, b.content, b.author_id, b.feature_image, b.blog_date, b.category, b.tags, b.likes, u.name as author_name, u.surname as author_surname, u.profile_image as author_image FROM blog b INNER JOIN users u ON b.author_id = u.id WHERE b.published = true ORDER BY b.blog_date DESC LIMIT $1 OFFSET $2";
    db.query(sql, [limit, offset], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to load data" });
        } else {
            const countResult = 'SELECT * FROM blog WHERE published = true';
            db.query(countResult, (c_err, c_results) => {
                if (c_err) {
                    res.status(400).json({ message: "Failed to load data" });
                } else {
                    const totalItems = parseInt(c_results.rowCount);
                    res.status(200).json({
                        data: results.rows,
                        page,
                        totalItems,
                        totalPages: Math.ceil(totalItems / limit),
                    });
                }

            })
        }
    })
}


exports.viewSearch = async (req, res) => {
    const sql = "SELECT b.id, b.title, b.content, b.author_id, b.feature_image, b.blog_date, b.category, b.tags, b.likes, u.name as author_name, u.surname as author_surname, u.profile_image as author_image FROM blog b INNER JOIN users u ON b.author_id = u.id WHERE b.published = true ORDER BY b.blog_date DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to load data" });
        } else {
            res.status(200).json(results.rows);
        }
    })
}

exports.viewLatestBlogs = async (req, res) => {
    const sql = "SELECT b.id, b.title, b.content, b.author_id, b.feature_image, b.blog_date, b.category, b.tags, b.likes, u.name as author_name, u.surname as author_surname, u.profile_image as author_image FROM blog b INNER JOIN users u ON b.author_id = u.id WHERE b.published = true ORDER BY b.blog_date DESC LIMIT 4";
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to load data" });
        } else {
            res.status(200).json(results.rows);
        }
    })
}

exports.viewPopular = async (req, res) => {
    const sql = "SELECT b.id, b.title, b.content, b.author_id, b.feature_image, b.blog_date, b.category, b.tags, b.likes, u.name as author_name, u.surname as author_surname, u.profile_image as author_image FROM blog b INNER JOIN users u ON b.author_id = u.id WHERE b.published = true ORDER BY b.likes DESC LIMIT 3";
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to load data" });
        } else {
            res.status(200).json(results.rows);
        }
    })

}


exports.viewBlog = async (req, res) => {
    const id = req.params.id;

    const sql = "SELECT b.id, b.title, b.content, b.author_id, b.feature_image, b.blog_date, b.category, b.tags, b.likes, u.name as author_name, u.surname as author_surname, u.profile_image as author_image FROM blog b INNER JOIN users u ON b.author_id = u.id WHERE b.id = $1";
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to load data" });
        } else {
            res.status(200).json(results.rows[0]);
        }
    })

}


exports.addBlog = async (req, res) => {
    const { title, content, author_id, feature_image, category, tags, published } = req.body;

    const sql = "INSERT INTO blog (title, content, author_id, feature_image, blog_date, category, tags, likes, published) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";

    const blog_date = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();

    db.query(sql, [title, content, author_id, feature_image, blog_date, category, tags, 0, published], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to add blog entry" });
        } else {
            res.status(201).json({ message: "Blog entry added successfully" });
        }

    })


    // Add function in here
}

exports.updateBlog = async (req, res) => {
    res.status(200).json({ message: "Response here" });
    // Update function in here
}

exports.deleteBlog = async (req, res) => {
    res.status(200).json({ message: "Response here" });
    // Delete function in here
}