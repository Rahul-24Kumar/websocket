let axios = require("axios");
let binanceModel = require("../models/binanceApiModel");

const binanceFunction = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://api.binance.com/api/v3/ticker/24hr",
    };

    let response = await axios(options);

    let result = response.data;

    let binanceApiData = [];

    result.forEach((element) => {
      binanceApiData.push({
        pairName: element.symbol,
        lastPrice: element.lastPrice,
        bidPrice: element.bidPrice,
        highPrice: element.highPrice,
        lowPrice: element.lowPrice,
        volume: element.volume,
        quoteVolume: element.quoteVolume,
        priceChange: element.priceChange,
        priceChangePercent: element.priceChangePercent,
        weightedAvgPrice: element.weightedAvgPrice,
        prevClosePrice: element.prevClosePrice,
        lastQty: element.lastQty,
        bidQty: element.bidQty,
        askPrice: element.askPrice,
        openPrice: element.openPrice,
        openTime: element.openTime,
        closeTime: element.closeTime,
        firstId: element.firstId,
        lastId: element.lastId,
        tradeCount: element.count,
      });
    });

    let binanceApiInDb = await binanceModel.insertMany(binanceApiData);

    // console.log(binanceApiInDb);

    return res
      .status(201)
      .send({ status: true, msg: "successful", data: binanceApiInDb });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

let getBinanceAllPair = async (req, res) => {
  try {
    const pageSize = req.query.pageSize;
    const limit = req.query.limit;

    // console.log(limit, pageSize);

    let binanceApi = await binanceModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * pageSize);

    // console.log(binanceApi);
    return res
      .status(200)
      .send({ status: true, msg: "Successfull", data: binanceApi });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  binanceFunction,
  getBinanceAllPair,
};
