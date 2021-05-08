const express = require('express');
const fs = require('fs');
const app = express();
const posts = require('./posts.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Get all posts
app.get('/posts', (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      posts,
    },
  });
});

//Get Single Post
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const foundPost = posts.find((post) => post.id + '' === id);
  if (foundPost) {
    res.status(200).json({
      status: 'success',
      data: {
        foundPost,
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Post not found!',
    });
  }
});

//Create a new post
app.post('/posts', (req, res) => {
  posts.push(req.body);

  let stringifiedData = JSON.stringify(posts, null, 2);
  fs.writeFile('posts.json', stringifiedData, function (err) {
    if (err) {
      res.status(500).json({
        status: 'fail',
        message: err,
      });
    }
  });
  res.status(201).json({
    status: 'success',
    message: 'New Post was created!',
  });
});

//Update a single post
app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;
  const foundPostIndex = posts.findIndex((post) => post.id + '' === id);
  posts[foundPostIndex] = updatedPost;

  let stringifiedData = JSON.stringify(posts, null, 2);
  fs.writeFile('posts.json', stringifiedData, function (err) {
    if (err) {
      res.status(500).json({
        status: 'fail',
        message: err,
      });
    }
  });
  res.status(201).json({
    status: 'success',
    message: 'Post updated!',
  });
});

//Delete a single post
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const newPostArr = posts.filter((post) => post.id + '' !== id);

  let stringifiedData = JSON.stringify(newPostArr, null, 2);
  fs.writeFile('posts.json', stringifiedData, function (err) {
    if (err) {
      res.status(500).json({
        status: 'fail',
        message: err,
      });
    }
  });
  res.status(201).json({
    status: 'success',
    message: 'Post deleted!',
  });
});

//unhanlded route
app.all('*', (req, res, next) => {
  res.status(500).json({
    status: 'fail',
    message: 'SORRY this route does not exist!',
  });
});

//Server
let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
