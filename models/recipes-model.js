const db = require('../db/config'),
      axios = require('axios'),
      Recipes = {};

Recipes.findAll = (req, res, next) => {
    db.manyOrNone('SELECT * FROM recipes')
        .then( recipes => {
            res.locals.recipes = recipes;
            next();
        }).catch( err => {
            console.log(`ERROR MODEL findAll: ${err}`)
        })
},

Recipes.findOne = (req, res, next) => {
    const { recipeId } = req.params;
    db.one(`SELECT * FROM recipes WHERE id = $1`, [recipeId])
        .then( recipe => {
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
            res.locals.recipesResults = recipesResults.data.recipes;
            next();
        }).catch( err => {
            console.log(`ERROR MODEL search: ${err}`)
        })
},

Recipes.saveIntoDb = (req, res, next) => {
    const { favourite } = req.body;
    const { title, ingredients, picture, publisher, source_url, social_rank, image_url } = favourite;
    db.one(`INSERT INTO recipes (title, ingredients, picture, publisher, source_url, social_rank, image_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`,
            [title, ingredients, picture, publisher, source_url, social_rank, image_url])
        .then ( savedRecipe => {
            res.local.savedRecipe = savedRecipe;
            next();
        }).catch( err => {
            console.log(`ERROR MODEL save: ${err}`)
        }) 
},

Recipes.update = (req, res, next) => {
    const id = req.params.recipeId;
    const { title, ingredients, picture, publisher, source_url, social_rank, image_url } = req.body;
    db.one(`UPDATE recipes
            SET title = $1, ingredients = $2, picture = $3, publisher = $4, source_url = $5, social_rank = $6, image_url = $7
            WHERE id = $8 returning *`,
            [title, ingredients, picture, publisher, source_url, social_rank, image_url, id])
        .then( editedRecipesData => {
            res.locals.editedRecipesData = editedRecipesData;
            next();
        }).catch( err => {
            console.log(`ERROR MODEL update: ${err}`)
        }) 
},

Recipes.destroy = (req, res, next) => {
    const id = req.params.recipeId;
    db.one('DELETE FROM recipes WHERE id = $1', [id])
        .then(() => {
            next();
        }).catch( err => {
            console.log(`ERROR MODEL destroy: ${err}`)
        })
}

module.exports = Recipes;