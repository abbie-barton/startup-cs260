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

const addRecipe = async (recipe) => {
  const result = await recipeCollection.insertOne(recipe);
  return result;
}

const getRecipe = async (id) => {
  const query = { 'recipe.id': id };
  const recipe = await recipeCollection.findOne(query);
  if (!recipe) {
    throw new Error(`Recipe with ID ${id} not found.`);
  }
  return recipe;
}

const getRecentRecipes = async () => {
  // get four most recent recipes
  const recipes = recipeCollection.find().sort({ createdBy: -1 }).limit(4).toArray((err, documents) => {
    if (err) throw err;
  })
  return recipes;
}

const addComment = async(comment, id) => {
  const filter = { 'recipe.id': id };
  const update = { $push: { 'recipe.comments': comment } };
  const recipe = await recipeCollection.updateOne(filter, update);
  if (recipe.modifiedCount == 1) {
    console.log("document updated successfully");
  }
  return recipe;
}

const getComments = (id) => {
  const query = { id: {id} };
  const recipe = recipeCollection.find(query);
  return recipe.comments;
}

module.exports = { addRecipe, getRecipe, getRecentRecipes, addComment, getComments };