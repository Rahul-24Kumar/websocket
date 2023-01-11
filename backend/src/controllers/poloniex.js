const poloniex = require("../models/poloniexApiModel");
const axios = require("axios");

const poloniexExchange = async (req, res) => {
  try {
    let options = {
      method: "get",
      url: "https://api.poloniex.com/markets/ticker24h",
    };

    let response = await axios(options);

    let result = response.data;

    let poloniexApiData = [];

    result.forEach((element) => {
      poloniexApiData.push({
        coinName: element.displayName,
        pairName: element.symbol,
        lastPrice: element.close,
        highPrice: element.high,
        lowPrice: element.low,
        baseVolume: element.baseVolume,
        quoteVolume: element.quoteVolume,
        amount: element.amount,
        openTime: element.startTime,
        closeTime: element.closeTime,
        openPrice: element.open,
        tradeCount: element.tradeCount,
        qty: element.quantity,
      });
    });

    let poloniexInDb = await poloniex.insertMany(poloniexApiData);
    // console.log(poloniexInDb);

    return res
      .status(201)
      .send({ status: true, msg: "successful", data: poloniexInDb });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

let getPoloniexAllPair = async (req, res) => {
  try {
    let poloniexApi = await poloniex.find().select({ pairName: 1 });

    return res
      .status(200)
      .send({ status: true, msg: "successfull", data: poloniexApi });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { poloniexExchange, getPoloniexAllPair };
