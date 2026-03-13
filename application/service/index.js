const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let users = [];
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.post('/authenticate/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    res.status(201).send({ msg: 'User created' });
  }
});



async function findUser(key, value) {
    if (!key) return null;

  return users.find((u) => u[key] === value);
}