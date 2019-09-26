exports = module.exports = function (app, mongoose) {

    const { SHA256 } = require('crypto-js')
    const jwt = require('jsonwebtoken');
    const {
        UserInputError,
        AuthenticationError,
        ForbiddenError } = require("apollo-server-express")


    const UserModel = app.db.models.User;


    const resolvers = {

        Query: {
            getAllUsers: async (root, userObj, context) => {
                try {
                    const users = await UserModel.find({});
                    if (!users.length) {
                        throw new Error("No Users Found");
                    }

                    return users;
                } catch (err) {
                    return Error(err.message)

                }
            }
        },


        Mutation: {
            addUser: async (root, userObj, context) => {
                console.log("USER OBJ =========>", userObj)
                const { username, email, password } = userObj
                try {
                    const newUser = await UserModel({ username, email, password }).save()
                    if (!newUser) {
                        throw new Error("Cannot Save User")
                    }

                    return newUser;

                } catch (err) {
                    return Error(err.message)
                }

            }

        }
    }

    app.graphql.resolvers.push([resolvers]);

}