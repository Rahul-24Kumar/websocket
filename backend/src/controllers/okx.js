const okx = require("../models/okxApiModel");
const axios = require("axios");

const okxExchange = async (req, res) => {
  try {
    let options = {
      method: "get",
      url: "https://www.okx.com/api/v5/market/tickers?instType=SWAP",
    };

    let response = await axios(options);

    let result = response.data.data;

    let okxApiData = [];

    result.forEach((element) => {
      okxApiData.push({
        pairName: element.instId,
        lastPrice: element.last,
        highPrice: element.high24h,
        lowPrice: element.low24h,
        volume: element.vol24h,
        askPrice: element.askPx,
        bidPrice: element.bidPx,
        openPrice: element.open24h,
      });
    });

    let okxInDb = await okx.insertMany(okxApiData);
    // console.log(okxInDb);

    return res
      .status(201)
      .send({ status: true, msg: "successful", data: okxInDb });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

let getOkxAllPair = async (req, res) => {
  try {
    let okxApi = await okx.find().select({ pairName: 1 });

    return res
      .status(200)
      .send({ status: true, msg: "successfull", data: okxApi });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { okxExchange, getOkxAllPair };
