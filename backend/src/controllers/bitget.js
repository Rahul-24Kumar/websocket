const bitget = require("../models/bitgetApiModel");
const axios = require("axios");

const bitgetExchange = async (req, res) => {
  try {
    let options = {
      method: "get",
      url: "https://api.bitget.com/api/mix/v1/market/tickers?productType=umcbl",
    };

    let response = await axios(options);

    let result = response.data.data;

    let bitgetApiData = [];

    result.forEach((element) => {
      bitgetApiData.push({
        pairName: element.symbol,
        lastPrice: element.last,
        highPrice: element.high24h,
        lowPrice: element.low24h,
        baseVolume: element.baseVolume,
        quoteVolume: element.quoteVolume,
        bidPrice: element.bestBid,
        askPrice: element.bestAsk,
        priceChangePercent: element.priceChangePercent,
        timeStamp: element.timestamp,
      });
    });

    let bitgetInDb = await bitget.insertMany(bitgetApiData);
    // console.log(bitgetInDb);

    return res
      .status(201)
      .send({ status: true, msg: "Successful", data: bitgetInDb });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: error.message });
  }
};

//setInterval(bitgetExchange, 1500);

let getBitgetAllPair = async (req, res) => {
  try {
    let bitgetApi = await bitget.find().select({ pairName: 1 });

    return res
      .status(200)
      .send({ status: true, msg: "successfull", data: bitgetApi });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: error.message });
  }
};

module.exports = {
  bitgetExchange,
  getBitgetAllPair,
};
