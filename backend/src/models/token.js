const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({

    coinName: {
        type: String,
        unique: true
    },

    symbol: {
        type: String,
        unique: true
    },

    contractAddress: {
        type: String,
        unique: true
    },

    exploreLink: {
        type: String,
    }
})

module.exports = mongoose.model("addCoin", coinSchema)