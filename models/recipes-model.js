const db = require('../db/config'),
      axios = require('axios'),
      Recipes = {};

Recipes.findAll = (req, res, next) => {
    db.manyOrNone('SELECT * FROM recipes')
        .then( recipes => {
            // console.log(`SUCCESS MODEL findAll, ${recipes}`);
            res.locals.recipes = recipes;
            next();
        }).catch( err => {
            console.log(`ERROR MODEL findAll: ${err}`)
        })
},

Recipes.findOne = (req, res, next) => {
    const { recipeId } = req.params;
    db.one(`SELECT * FROM recipes WHERE recipe_id = $1`, [recipeId])
        .then( recipe => {
            // console.log(`SUCCESS MODEL findOne, ${recipe}`);
            res.locals.recipe = recipe;
            next();
        }).catch( err => {
            console.log(`ERROR MODEL findOne: ${err}`)
        })
},

Recipes.search = (req, res, next) => {
    const { ingredients } = req.body;
    const ingredientString = ingredients.join(',').toLowerCase();
    axios.get(`http://food2fork.com/api/search?key=${process.env.API_KEY}&q=${ingredientString}`)
        .then( recipesResults => {
            // console.log(`SUCCESS MODEL search, ${recipesResults}`);
            res.locals.recipesResults = recipesResults.data.recipes;
            next();
        }).catch( err => {
            console.log(`ERROR MODEL search: ${err}`)
        })
},

Recipes.saveIntoDb = (req, res, next) => {
    const { favourite } = req.body;
    const { title, recipe_id, picture, publisher, source_url, social_rank, image_url } = favourite;
    db.one(`INSERT INTO recipes (title, recipe_id, picture, publisher, source_url, social_rank, image_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`,
            [title, recipe_id, picture, publisher, source_url, social_rank, image_url])
        .then ( savedRecipe => {
            // console.log(`SUCCESS MODEL saveIntoDb, ${savedRecipe}`);
            res.locals.savedRecipe = savedRecipe;
            next();
        }).catch( err => {
            console.log(`ERROR MODEL saveIntoDb: ${err}`)
        })
},

Recipes.destroy = (req, res, next) => {
    const deleted_favourite = req.body.deleted_favourite;
    db.one('DELETE FROM recipes WHERE id = $1 RETURNING id', [deleted_favourite])
        .then( deletedFavourite => {
            console.log(`SUCCESS MODEL destroy`);
            res.locals.deletedFavourite = deletedFavourite;
            next();
        }).catch( err => {
            console.log(`ERROR MODEL destroy: ${err}`)
        })
},

Recipes.update = (req, res, next) => {
    const recipe_id = req.body;
    const { title, ingredients, picture, publisher, source_url, social_rank, image_url } = recipe_id;
    db.one(`UPDATE recipes
            SET title = $1, ingredients = $2, picture = $3, publisher = $4, source_url = $5, social_rank = $6, image_url = $7
            WHERE recipe_id = $8 returning *`,
            [title, ingredients, picture, publisher, source_url, social_rank, image_url, id])
        .then( editedRecipesData => {
            // console.log(`SUCCESS MODEL saveIntoDb, ${savedRecipe}`);
            res.locals.editedRecipesData = editedRecipesData;
            next();
        }).catch( err => {
            console.log(`ERROR MODEL update: ${err}`)
        })
},

module.exports = Recipes;
