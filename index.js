const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  res.send('THIS IS A WORKING ROUTE!');
});

app.listen(3000, () => {
  console.log('App is listening on port 3000...');
});
