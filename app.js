const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers= require('./graphql/resolvers/index')
const authMiddleware = require('./middleware/auth-middleware')

app.use(authMiddleware);
app.use(cors())
app.use(bodyParser.json());

// config the gpl api, where does the schema lie which defines the endpoints
// i.e queries, resolvers
// needs to have these 2 keywords as th package looks for specific keywords to parse into a schema JS object
// types : all the query or mutations names/apis needd to be condensed into this.
// [Event!]! - can return empty array but not null
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    // resolver functions should match the schema endpoints
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rq6orye.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    //we can have a setup where you always connect to server in case of error and retry again to connect
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
