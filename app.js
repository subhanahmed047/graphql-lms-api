const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers');

// returns a middleware that takes graphql query req body and sends it to the relavant resolver
const { graphqlHTTP } = require('express-graphql');

const app = express();
const PORT = process.env.port || 8000;

app.use(bodyParser.json());
app.use(
  '/api',
  graphqlHTTP({
    schema: graphQlSchema, // generated using graphql package
    rootValue: graphQlResolvers, // object with all the resolvers
    graphiql: true, // turn on the graphql debug ui
  })
);

const mongooseConnectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.szqk6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose
  .connect(mongooseConnectionString)
  .then((_) => app.listen(PORT, () => console.log(`Listening at port ${PORT}`)))
  .catch((err) => console.log('Failed to connect to Mongo DB server', err));
