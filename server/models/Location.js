const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Tags: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Video: {
        type: String,
        required: false
    },
    Photos: {
        type: String, 
        required: false
    },
    Notes: {
        type: String,
        required: false
    },
    Website: {
        type: String,
        required: true
    },
    Socials: {
        type: String,
        required: false
    },
})
const LocationModel = mongoose.model("locations", LocationSchema);
module.exports = LocationModel;
