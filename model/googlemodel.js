const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GoogleSchema = new Schema({
    title: String,
    author: String,
    description: String,
    image: String,
    link: String

});

const Googlebook = mongoose.model("Googlebooks", GoogleSchema);
module.exports = Googlebook;