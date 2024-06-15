// Imports here
const db = require('../config/db-config');

exports.viewBlogs = async (req, res) => { 
    res.status(200).json({ message: "Response here" });
}

exports.addBlog = async (req, res) => {
    const { title, content, author_id, feature_image, category, tags, published } = req.body;

    const sql = "INSERT INTO blog (title, content, author_id, feature_image, blog_date, category, tags, likes, published) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
    
    const blog_date = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
    
    db.query(sql, [title, content, author_id, feature_image, blog_date, category, tags, 0, published], (err, results) => {
        if(err) {
            console.log(err)
            res.status(400).json({message:"Failed to add blog entry"}); 
        }else{
            res.status(201).json({message:"Blog entry added successfully"}); 
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