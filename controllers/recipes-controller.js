const Recipes = require('../models/recipes-model'),
      Router = require('express').Router();

Router.get('/',
    Recipes.findAll,
    (req, res) => {
        const { recipes } = res.locals
        res.json(recipes);
    });
    
Router.get('/:recipeId',
    Recipes.findOne,
    (req, res) => {
        const { recipe } = res.locals
        res.json(recipe);
    });
        
Router.post('/search',
    Recipes.search,
    (req, res) => {
        const { recipesResults } = res.locals;
        res.json(recipesResults);
    });

Router.post('/saveIntoDb',
    Recipes.saveIntoDb,
    (req, res) => {
        const { savedRecipe } = res.locals;
        res.json(savedRecipe);
    });

Router.post('/update/:recipeId',
    Recipes.update,
    (req, res) => {
        const { editedRecipesData } = res.locals
        res.json({ editedRecipesData: editedRecipesData });
    });

Router.delete('/delete/:recipeId',
    Recipes.destroy,
    (req, res) => {
        res.send('Recipe deleted from the database');
    });

module.exports = Router;