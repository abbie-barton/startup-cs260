const db = require('./database.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

const authCookieName = 'token';

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3001;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//auth&cookie endpoints
// setAuthCookie in the HTTP response
const setAuthCookie = (res, authToken) => {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  console.log("inside create auth token for new user /auth/create")
  if (await db.getUser(req.body.userName)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await db.createUser(req.body.userName, req.body.password);
    console.log("inside create user, req.body.password: " + req.body.password)

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  console.log("inside /auth/login getauth token")
  const user = await db.getUser(req.body.userName);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:userName', async (req, res) => {
  console.log("inside login method /user/:userName")
  const user = await db.getUser(req.params.userName);
  if (user) {
    const token = req?.cookies.token;
    res.send({ userName: user.userName, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await db.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// service endpoints
// get comments for a recipe (will be all the same for now)
secureApiRouter.get('/comments', async (req, res) => {
  const id = req.query.id;
  const comments = await db.getComments(id);
  res.json(comments);
});

// post comment for a recipe (all in the same array)
secureApiRouter.post('/comment', async (req, res) => {
  const id = req.query.id;
  db.addComment(req.body, id);
  const comments = await db.getComments(id)
  res.send(comments);
});

// get recipe
secureApiRouter.get('/recipe', async (req, res) => {
  const id = req.query.id;
  const recipe = await db.getRecipe(id);
  res.json(recipe);
});

// get recent recipes (4)
secureApiRouter.get('/recent-recipes', async (req, res) => {
  const recipes = await db.getRecentRecipes();
  res.json(recipes);
})

// post recipe
secureApiRouter.post('/post-recipe', async (req, res) => {
  const id = req.query.id;
  db.addRecipe(req.body);
  const recipe = await db.getRecipe(id);
  res.send(recipe);
})

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});