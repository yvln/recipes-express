DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  recipe_id VARCHAR,
  picture VARCHAR,
  publisher VARCHAR,
  source_url VARCHAR,
  social_rank VARCHAR,
  image_url VARCHAR,
  ingredients  VARCHAR
);
