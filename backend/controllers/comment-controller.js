const db = require('../config/db-config');
exports.viewComments = async (req, res) => { 
    const sql = "SELECT * FROM comments";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(400).json({ message: "Failed to retrieve comments" });
        } else {
            res.status(200).json(results.rows); // Assuming you're using a PostgreSQL client like pg
        }
    });
}

exports.addComment = async (req, res) => {
    const { id, comment_text, author_id,  blog_id } = req.body;

   

    const sql = "INSERT INTO comments ( id, comment_text, author_id,  blog_id) VALUES ($1,$2,$3,$4)";
    
  
    
    db.query(sql, [ id, comment_text, author_id,  blog_id], (err, results) => {
        if(err) {
            console.log(err)
            res.status(400).json({message:"Failed to add comment"}); 
        }else{
            res.status(201).json({message:"comment added successfully"}); 
        }
    }
    )
    


  
}

exports.updateComment = async (req, res) => { 
    res.status(200).json({ message: "Response here" });
    // Update function in here
}

exports.deleteComment = async (req, res) => { 
    res.status(200).json({ message: "Response here" });
    // Delete function in here
}