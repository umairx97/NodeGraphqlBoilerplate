const http = require('http');
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose');
const { mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
require('dotenv').config()


// Creating Server
const app = express();
const httpServer = http.createServer(app)

// Creating App Unified Structure
app.models = {};
app.graphql = {};
app.graphql.typeDefs = [];
app.graphql.resolvers = [];


// Require Modules
require('./config')(app);
require('./db')(app, mongoose);
require('./models')(app, mongoose);
require('./modules')(app, mongoose);

// Creating Apollo server with all type definitions and resolvers
const typeDefs = app.graphql.typeDefs;
const resolvers = app.graphql.resolvers;

const GqlServer = new ApolloServer({
    playground: process.env.NODE_ENV === 'production' ? false : true,
    typeDefs: mergeTypes(typeDefs),
    resolvers: mergeResolvers(resolvers)
})

app.get("/data", (req, res) => {
    res.send({ username: "umair" })
})

app.use(cors());
GqlServer.applyMiddleware({ app });
GqlServer.installSubscriptionHandlers(httpServer)


const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}${GqlServer.graphqlPath}`)
})