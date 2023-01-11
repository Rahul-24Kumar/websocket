const huobiModel = require("../models/huobiApiModel");
const axios = require("axios");

const huobiapiExchange = async (req, res) => {
  try {
    let options = {
      method: "get",
      url: "https://api.huobi.pro/market/tickers",
    };

    let response = await axios(options);

    let result = response.data.data;

    let huobiapiApiData = [];

    result.forEach((element) => {
      huobiapiApiData.push({
        pairName: element.symbol,
        lastPrice: element.close,
        highPrice: element.high,
        lowPrice: element.low,
        volume: element.vol,
        askPrice: element.ask,
        bidPrice: element.bid,
        tradeCount: element.count,
        amount: element.amount,
      });
    });

    let huobiapiInDb = await huobiModel.insertMany(huobiapiApiData);
    // console.log(huobiapiInDb);

    return res
      .status(201)
      .send({ status: true, msg: "successful", data: huobiapiInDb });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

let getHuobiapiAllPair = async (req, res) => {
  try {
    let huobiApi = await huobiModel.find().select({ pairName: 1 });

    return res
      .status(200)
      .send({ status: true, msg: "successfull", data: huobiApi });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { huobiapiExchange, getHuobiapiAllPair };
