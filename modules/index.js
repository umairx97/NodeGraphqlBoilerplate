exports = module.exports = function (app, mongoose) {

    // Schemas
    require("./User/schemas")(app, mongoose)


    // Resolvers
    require('./User/resolvers')(app, mongoose);

};
