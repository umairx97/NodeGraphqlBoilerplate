exports = module.exports = function (app) {

    console.log("process.env.NODE_ENV =========", process.env.NODE_ENV);
    console.log("process.env.MONGO_URI =========", process.env.MONGO_URI);


    if (process.env.NODE_ENV === "production") {
        app.set("mongodb-url", process.env.MONGO_URI)
    } else {
        app.set("mongodb-url", "mongodb://localhost:27017/graphql_boiler")

    }


}