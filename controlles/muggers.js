const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MuggerSchema = new Schema ({
    number: Number,
    photoUrl: String,
    followed: Boolean,
    fullName: String,
    status: String,
    location: {city: String, country: String}
});
const Mugger = mongoose.model("mugger", MuggerSchema);

module.exports.getAll = function (req, res) {
    Mugger.find({}).then(mugger => {
        res.send(mugger);
    })
}