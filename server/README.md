# Node Server for Plan to Play

## Steps to run

- Rename `.env.example` to `.env` and update accordingly
- Run `yarn install`
- Run knex migrations with `knex migrate:latest` and seed with `knex seed:run`
- Run with `yarn start` or `yarn dev`
