const db = require('./database.js');
const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3001;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);


// get comments for a recipe (will be all the same for now)
apiRouter.get('/comments', async (req, res) => {
  const id = req.query.id;
  const comments = await db.getComments(id);
  res.json(comments);
});

// post comment for a recipe (all in the same array)
apiRouter.post('/comment', async (req, res) => {
  const id = req.query.id;
  db.addComment(req.body, id);
  const comments = await db.getComments(id)
  res.send(comments);
});

// get recipe
apiRouter.get('/recipe', async (req, res) => {
  const id = req.query.id;
  const recipe = await db.addRecipe(id);
  res.json(recipe);
});

// post recipe
apiRouter.post('/post-recipe', async (req, res) => {
  const id = req.query.id;
  db.addRecipe(req.body, id);
  const recipe = await db.getRecipe(id);
  res.send(recipe);
})

// send all recipes (or 4 at a time? idk how this works)
// recipes api will come when database is implemented - without database it will work weird

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

let comments = [];
const updateComments = (newComment, comments) => {
  comments.push(newComment)

  return comments;
}

const addRecipe = (newRecipe) => {
  const recipe = newRecipe;

  return recipe;
}