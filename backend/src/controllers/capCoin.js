let axios = require("axios");
const bitstamp = require("../models/bitstampApiModel");
const capCoin = require("../models/capCoinApiModel");

const capCoin100Coins = async function (req, res) {
  try {
    const options = {
      method: "get",
      url: "https://api.coincap.io/v2/assets?limit=300",
    };

    const response = await axios(options);
    // console.log(response.data.data);
    const result = response.data.data;

    let capCoinApiData = [];

    result.forEach((element) => {
      capCoinApiData.push({
        rank: element.rank,
        coinName: element.name,
        symbol: element.symbol,
        priceUsd: element.priceUsd,
        volumeUsd24Hr: element.volumeUsd24Hr,
        supply: element.supply,
        maxSupply: element.maxSupply,
        marketCapUsd: element.marketCapUsd,
        changePercent24Hr: element.changePercent24Hr,
        explorer: element.explorer,
        vwap24Hr: element.vwap24Hr,
      });
    });

    const capCoinApiInDb = await capCoin.insertMany(capCoinApiData);
    //console.log(capCoinApiInDb);

    return res
      .status(201)
      .send({ status: true, message: "Successful", data: capCoinApiInDb });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const addCoin = async (req, res) => {
  try {
    let coinDetails = req.body;
    let coinValue = await capCoin.create(coinDetails);
    return res
      .status(201)
      .send({ message: "successfully added!", data: coinValue });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};



const getCoinPairing = async (req, res) => {
  try {
    const coinSymbol = req.params.symbol;

    const filterQuery = { pairName: { $regex: coinSymbol } };
    const pair = await bitstamp.distinct("pairName", filterQuery);
    // console.log(pair);

    let length = pair.length;

    const coinPair = await bitstamp
      .find(filterQuery)
      .sort({ createdAt: -1 })
      .limit(length);

    return res
      .status(200)
      .send({ status: true, message: "Success", data: coinPair });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const updateCoin = async (req, res) => {
  try {
    let symbol = req.params.Symbol;
    const updatedCoin = await capCoin.findOneAndUpdate(symbol, {
      $set: req.body,
    });

    if (updateCoin) {
      return res
        .status(200)
        .send({ message: "successfully updated", data: updatedCoin });
    } else {
      return res.status(400).send({ message: "failed!" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { capCoin100Coins, getCoinPairing, updateCoin, addCoin };
