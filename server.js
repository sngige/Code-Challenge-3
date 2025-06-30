const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
app.use('/posts', middlewares, router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
