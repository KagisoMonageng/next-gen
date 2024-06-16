const db = require('../config/db-config');


exports.viewComments = async (req, res) => { 
    const sql = "SELECT * FROM comments";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            res.status(400).json({ message: "Failed to retrieve comments 4" });
        } else {
            res.status(200).json(results.rows); // Assuming you're using a PostgreSQL client like pg
        }
    });
}

exports.addComment = async (req, res) => {
    const { comment_text, author_id,  blog_id } = req.body;

   

    const sql = "INSERT INTO comments ( comment_text, author_id,  blog_id) VALUES ($1,$2,$3)";
    
  
    
    db.query(sql, [  comment_text, author_id,  blog_id], (err, results) => {
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
   
    
    const { comment_id, comment_text } = req.body;

    
    const sql = "UPDATE comments SET comment_text = $1 WHERE comment_id = $2";
  
    db.query(sql, [comment_text, comment_id], (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Failed to update comment" });
      } else {
        // Check if rows affected (optional): You can check `results.rowCount` to see if any rows were updated
        res.status(200).json({ message: "Comment updated successfully" });
      }
    })
}

exports.deleteComment = async (req, res) => { 
    res.status(200).json({ message: "Response here" });
    // Delete function in here
}