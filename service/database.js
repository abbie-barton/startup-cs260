const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('makeitgood');
const recipeCollection = db.collection('recipe');
const userCollection = db.collection('user');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// user database functions
const getUser = async (userName) => {
  const query = { 'userName': userName };
  const user = await userCollection.findOne(query);
  if (!user) {
    // throw new Error(`User with username ${userName} not found.`);
    console.log(`User with username ${userName} not found.`);
  }
  return user;
}

const getUserByToken = async (token) => {
  const query = { 'token': token };
  const user = await userCollection.findOne(query);
  if (!user) {
    throw new Error(`User with token ${token} not found.`);
  }
  return user;
}

const createUser = async (userName, password) => {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    userName: userName,
    password: passwordHash,
    token: uuid.v4(),
    // these will be arrays of recipe objects
    contributedRecipes: [],
    favoritedRecipes: [],
  };
  await userCollection.insertOne(user);

  return user;
}


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
  const recipes = recipeCollection.find().sort({ createdBy: -1 }).limit(6).toArray((err, documents) => {
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

const addFavoriteRecipe = async (userName, recipe) => {
  const filter = { 'userName': userName };
  const update = { $push: { 'favoritedRecipes': recipe } };
  const user = await userCollection.updateOne(filter, update);
  if (user.modifiedCount == 1) {
    console.log('favorites updated successfully');
  }
  return user;
}

const addContributedRecipe = async (userName, recipe) => {
  const filter = { 'userName': userName };
  const update = { $push: { 'contributedRecipes': recipe } };
  const user = await userCollection.updateOne(filter, update);
  if (user.modifiedCount == 1) {
    console.log('contributions updated successfully');
  }
  return user;
}

module.exports = { addRecipe, getRecipe, getRecentRecipes, getAllRecipes, addComment, getComments, getUser, getUserByToken, createUser, addFavoriteRecipe, addContributedRecipe };