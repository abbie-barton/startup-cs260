const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);


// get comments for a recipe (will be all the same for now)
apiRouter.get('/comments', (_req, res) => {
  res.json(comments);
});

// post comment for a recipe (all in the same array)
apiRouter.post('/comment', (req, res) => {
  scores = updateComments(req.body, comments);
  res.send(scores);
});

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