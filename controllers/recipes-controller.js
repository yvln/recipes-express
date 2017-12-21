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

Router.post('/update',
    Recipes.update,
    (req, res) => {
        const { editedRecipesData } = res.locals
        res.json(editedRecipesData);
    });

Router.post('/delete',
    Recipes.destroy,
    (req, res) => {
      const { deletedFavourite } = res.locals;
      res.json(deletedFavourite);
    });

module.exports = Router;
