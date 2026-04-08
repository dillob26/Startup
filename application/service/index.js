const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const DB = require('./database.js');
const { peer_proxy , broadcast} = require('./peer_proxy.js');

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const port = process.argv.length > 2 ? process.argv[2] : 3000;

const auth_cookie_name = 'token';

var api_router = express.Router();
app.use(`/api`, api_router);


//endpoints
api_router.post('/authenticate/create', async (req, res) => {
  if (await find_user('user_name', req.body.user_name)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await create_user(req.body.user_name, req.body.password);

    set_auth_cookie(res, user.id);
    res.status(201).send({ msg: 'User created' });
  }
});

api_router.post('/authenticate/login', async (req, res) => {
  const user = await find_user('user_name', req.body.user_name);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.id = uuid.v4();

      await DB.update_user(user);

      set_auth_cookie(res, user.id);

      res.status(200).send({ msg: 'User authenticated' });
      return;
    }
  }
  res.status(401).send({ msg: 'Invalid credentials' });
});

api_router.delete('/authenticate/logout', async (req, res) => {
  const user = await find_user('id', req.cookies[auth_cookie_name]);
  
  if (user) {
    await DB.update_user_remove_auth(user);
  }
  
  res.clearCookie(auth_cookie_name);
  res.status(204).send({ msg: 'User logged out' });
});

const verify_authentication = async (req, res, next) => {
  const user = await find_user('id', req.cookies[auth_cookie_name]);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  next();
};

// endpoint send the json of the leaderboard, it is unsorted.
api_router.get('/leaderboard', verify_authentication, async (req, res) => {
  const leaderboard = await DB.get_scores();
  res.json(leaderboard);
});

api_router.post('/leaderboard', verify_authentication, async (req, res) => {
  await update_leaderboard(req);
  res.send({ msg: 'Leaderboard updated' });
});


app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


//helper functions
async function find_user(key, value) {
    if (!key) return null;

    if (key === 'id') {
        return DB.get_user_by_id(value);
    }

    return DB.get_user(value);
}

async function create_user(user_name, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = { 
    id: uuid.v4(), 
    user_name: user_name, 
    password: hashedPassword };
  
  await DB.add_user(user);
  
  return user;
}

function set_auth_cookie(res, token) {
  res.cookie(auth_cookie_name, token, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
}

async function update_leaderboard(req) {
  const {  completion_time, word_length, start_word, end_word } = req.body;
  const user = await find_user('id', req.cookies[auth_cookie_name]);
  const user_name = user.user_name;

  const score = await DB.get_scores();
  const existing_score = score.find(s => s.user_name === user_name);

  if (!existing_score) {
    const new_score = {
      user_name: user_name,
      completions_3: word_length === 3 ? 1 : 0,
      completions_4: word_length === 4 ? 1 : 0,
      best_time_3: word_length === 3 ? completion_time : 999999,
      best_time_4: word_length === 4 ? completion_time : 999999
    }
    
    await DB.add_score(new_score);
  } else {
    await DB.update_score(user_name, completion_time, word_length);
  }

  broadcast({ user_name, start_word, end_word });
}


const httpserver = app.listen(port , () => {
  console.log(`Server is running on port ${port}`);
});

peer_proxy(httpserver);