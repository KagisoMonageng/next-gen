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

exports.viewUserPublishedBlogs = async (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT b.id, b.title, b.content, b.author_id, b.feature_image, b.blog_date, b.category, b.tags, b.likes, u.name as author_name, u.surname as author_surname, u.profile_image as author_image, u.profile_banner as author_banner, u.email as author_email, u.short_bio as author_bio FROM blog b INNER JOIN users u ON b.author_id = u.id WHERE b.published = true AND b.author_id = $1 ORDER BY b.blog_date DESC";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to load data" });
        }
        else if (results.rows.length === 0) {
            return res.status(404).json({ message: "No blogs found for this user" });
        }
        const user = {
            author_name: results.rows[0].author_name,
            author_surname: results.rows[0].author_surname,
            author_email: results.rows[0].author_email,
            author_bio: results.rows[0].author_bio,
            author_image: results.rows[0].author_image,
            author_banner: results.rows[0].author_banner,
        };
        res.status(200).json({ data: results.rows, author: user });

    })
}


exports.viewUserAllBlogs = async (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT b.id, b.title, b.content,b.published, b.author_id, b.feature_image, b.blog_date, b.category, b.tags, b.likes, u.name as author_name, u.surname as author_surname, u.profile_image as author_image FROM blog b INNER JOIN users u ON b.author_id = u.id WHERE b.author_id = $1 ORDER BY b.blog_date DESC";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "Failed to load data" });
        } else if (results.rows.length === 0) {
            return res.status(404).json({ message: "No blogs found for this user" });
        }
        
        res.status(200).json(results.rows);
       
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

    const sql = "SELECT b.id, b.published, b.title, b.content, b.author_id, b.feature_image, b.blog_date, b.category, b.tags, b.likes, u.name as author_name, u.surname as author_surname, u.profile_image as author_image FROM blog b INNER JOIN users u ON b.author_id = u.id WHERE b.id = $1";
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
            const io = req.app.get('socketio');
            if (io) {
                // console.log('Emitting newBlog event');
                io.emit('newBlog', { title, content, author_id, feature_image, blog_date, category, tags, published });
            }
            res.status(201).json({ message: "Blog entry added successfully" });
        }
    })
}



exports.updateStatus = async (req, res) => {
    const {id,status} = req.body;
    sql = "UPDATE blog SET published = $1 WHERE id = $2";
    db.query(sql, [status, id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to update blog entry" });
        } else {
            res.status(200).json({ message: "Blog updated successfully" });
        }
    })
    
}

exports.deleteBlog = async (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM blog WHERE id = $1";
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(400).json({ message: "Failed to delete blog entry" });
        } else {
            res.status(200).json({ message: "Blog entry deleted successfully" });
        }
    })
}