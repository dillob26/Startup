const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let users = [];
let leaderboard = {};

const port = process.argv.length > 2 ? process.argv[2] : 3000;

const auth_cookie_name = 'token';

var api_router = express.Router();
app.use(`/api`, api_router);


//endpoints
api_router.post('/authenticate/create', async (req, res) => {
  if (await findUser('email', req.body.user_name)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.user_name, req.body.password);
    res.status(201).send({ msg: 'User created' });
  }
});

api_router.post('/authenticate/login', async (req, res) => {
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

api_router.delete('/authenticate/logout', async (req, res) => {
  const user = await findUser('id', req.cookies[auth_cookie_name]);
  if (user) {
    delete user.id;
  }
  res.clearCookie(auth_cookie_name);
  res.status(204).send({ msg: 'User logged out' });
});

const verify_authentication = async (req, res, next) => {
  const user = await findUser('id', req.cookies[auth_cookie_name]);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  next();
};

// endpoint send the json of the leaderboard, it is unsorted.
api_router.get('/leaderboard', verify_authentication, async (req, res) => {
  res.json(leaderboard);
});

api_router.post('/leaderboard', verify_authentication, async (req, res) => {
  await update_leaderboard(req);
  res.send({ msg: 'Leaderboard updated' });
});


//helper functions
async function findUser(key, value) {
    if (!key) return null;

  return users.find((u) => u[key] === value);
}

async function createUser(user_name, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { 
    id: uuid.v4(), 
    user_name: user_name, 
    password: hashedPassword };
  users.push(user);
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
  const {  completion_time, word_length } = req.body;
  const user = await findUser('id', req.cookies[auth_cookie_name]);
  const user_name = user.user_name;

  if (word_length === 3) {
        if (!leaderboard[user_name]) {
            leaderboard[user_name] = { completions_3: 1, completions_4: 0, best_time_3: completion_time, best_time_4: null };
        } else {
            leaderboard[user_name].completions_3 += 1;
            if (completion_time < leaderboard[user_name].best_time_3 || leaderboard[user_name].best_time_3 === null) {
                leaderboard[user_name].best_time_3 = completion_time;
            }
        }
    } else if (word_length === 4) {
        if (!leaderboard[user_name]) {
            leaderboard[user_name] = { completions_3: 0, completions_4: 1, best_time_3: null, best_time_4: completion_time };
        } else {
            leaderboard[user_name].completions_4 += 1;
            if (completion_time < leaderboard[user_name].best_time_4 || leaderboard[user_name].best_time_4 === null) {
                leaderboard[user_name].best_time_4 = completion_time;
            }
        }
    }
  }


app.listen(port , () => {
  console.log(`Server is running on port ${port}`);
});