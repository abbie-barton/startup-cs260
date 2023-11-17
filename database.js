const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('makeitgood');
const recipeCollection = db.collection('recipe');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addRecipe(recipe) {
  const result = await recipeCollection.insertOne(recipe);
  return result;
}

function getRecipe(id) {
  const query = { id: {id} };
  const recipe = recipeCollection.find(query);
  return recipe;
}

const addComment = async(comment, id) => {
  const filter = { id: {id }};
  const update = { $push: { comments: {comment} } };
  recipeCollection.updateOne(filter, update, (err, result) => {
    if (err) throw err;
    console.log("document updated successfully")
  })
}

const getComments = (id) => {
  const query = { id: {id} };
  const recipe = recipeCollection.find(query);
  return recipe.comments;
}

module.exports = { addRecipe, getRecipe, addComment, getComments };