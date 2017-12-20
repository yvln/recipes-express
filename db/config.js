const pgp = require('pg-promise')({}),

config = process.env.DATABASE_URL || 'postgres://yvelinesay@localhost:5432/recipes_db'
db = pgp(config);

module.exports = db;
