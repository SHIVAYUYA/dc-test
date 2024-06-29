const mysqlConnection = require('../lib/db');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/post',async function(req, res, next) {
  console.log(req.body);
  const username = req.body.username;
  const email = req.body.useremail;
  const usercontent = req.body.usercontent;

  if (!username || !email || !usercontent) {
    res.status(400).json({message: "データが不足しています"})
    return
  }

  let connection = await mysqlConnection()

  try {
    const query =
      "insert into posts (user_name, user_email, content) values (?, ?, ?)";
    // SQL実行
    await connection.execute(query, [username, email, usercontent]);
    res.status(200).json({message: "success"})
  } catch (error) {
      console.error('/api/post Error:', error);
      res.status(500).json({message: "server error"})
  } finally {
    if(connection) connection.destroy() // 接続を切る
  }

});

router.get('/api/post', async (req, res, next) => {
  let connection = await mysqlConnection()
  try {
    const query =
      "select post_id, user_name, user_email, content, posted_at from posts";
    // SQL実行
    const [result] = await connection.execute(query);
    const posts = result.map(post => ({
      postId: post.post_id,
      username: post.user_name,
      useremail: post.user_email,
      usercontent: post.content,
      postedAt: post.posted_at
    }))
    res.status(200).json({posts: posts})
  } catch (error) {
      console.error('/api/post Error:', error);
      res.status(500).json({message: "server error"})
  } finally {
    if(connection) connection.destroy()
  }
})

module.exports = router;
