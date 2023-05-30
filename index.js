const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Iteration 2 - Create a recipe
    const newRecipe = {
      title: 'Spaghetti with tomato sauce',
      level: 'Easy Peasy',
      ingredients: ['Pasta', 'Tomatos', 'Basilic', 'Olive oil', "Salt"],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 15,
      creator: 'Who knows'
    };

    return Recipe.create(newRecipe);
  })
  .then(createdRecipe => {
    console.log(`Created recipe: ${createdRecipe.title}`)

    // Iteration 3 - Insert multiple recipes
    return Recipe.insertMany(data)
  })
  .then(addedRecipes => {
    console.log(`Added ${addedRecipes.length} recipes from data.json`)

    // Iteration 4 - Update recipe
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { $set: { duration: 100 } },
      { new: true }
    );
  })
  .then(updatedRecipe => {
    console.log(`Updated recipe: ${updatedRecipe.title}`)

    // Iteration 5 - Remove a recipe
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(deletedRecipe => {
    console.log(`Deleted recipe: ${deletedRecipe.deletedCount} document(s) deleted`)

    // Close the database connection
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

