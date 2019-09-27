exports = module.exports = function (app, mongoose) {

    const { SHA256 } = require('crypto-js')
    const jwt = require('jsonwebtoken');
    const { PubSub } = require("apollo-server-express")
    const pubSub = new PubSub();

    const UserModel = app.db.models.User;
    const UserEvents = {
        USER_ADDED: "USER_ADDED"
    }

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

                    pubSub.publish(UserEvents.USER_ADDED, { userAdded: newUser })
                    return newUser;

                } catch (err) {
                    return Error(err.message)
                }

            }

        },

        Subscription: {
            userAdded: {
                subscribe: () => pubSub.asyncIterator(UserEvents.USER_ADDED),
            }
        }
    }

    app.graphql.resolvers.push([resolvers]);

}