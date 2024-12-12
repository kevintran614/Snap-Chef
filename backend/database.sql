CREATE DATABASE snap_chef;

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    ingredients text[],
    recipesMetadata JSONB
);