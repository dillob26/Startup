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
  if (await findUser('email', req.body.user_name)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.user_name, req.body.password);
    res.status(201).send({ msg: 'User created' });
  }
});

app.post('/authenticate/login', async (req, res) => {
  const user = await findUser('email', req.body.user_name);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.id = uuid.v4();

      set_auth_cookie(res, user.id);

      res.status(200).send({ msg: 'User authenticated' });
      return;
    }
  }
  res.status(401).send({ msg: 'Invalid credentials' });
});

async function findUser(key, value) {
    if (!key) return null;

  return users.find((u) => u[key] === value);
}

async function createUser(user_name, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { 
    id: uuid.v4(), 
    email: user_name, 
    password: hashedPassword };
  users.push(user);
  return user;
}

function set_auth_cookie(res, token) {
  res.cookie(authCookieName, token, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
}

app.listen(port);