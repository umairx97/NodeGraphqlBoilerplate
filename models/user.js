exports = module.exports = function (app, mongoose) {

    let Schema = mongoose.Schema;
    userSchema = new Schema({

        username: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        }
    });

    app.db.model('User', userSchema);
}