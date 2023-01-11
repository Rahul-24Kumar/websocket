const bybit = require("../models/bybitApiModel");
const axios = require("axios");

const bybitExchange = async (req, res) => {
  try {
    let options = {
      method: "get",
      url: "https://api-testnet.bybit.com/v2/public/tickers",
    };

    let response = await axios(options);

    let result = response.data.result;

    let bybitApiData = [];

    result.forEach((element) => {
      bybitApiData.push({
        pairName: element.symbol,
        lastPrice: element.last_price,
        bidPrice: element.bid_price,
        highPrice: element.high_price_24h,
        lowPrice: element.low_price_24h,
        volume: element.volume_24h,
        askPrice: element.ask_price,
        openPrice: element.open,
        priceChangePercent: element.price_24h_pcnt,
        lastPrice1h: element.prev_price_1h,
      });
    });

    let bybitInDb = await bybit.insertMany(bybitApiData);
    // console.log(bybitInDb);

    return res
      .status(201)
      .send({ status: true, msg: "successful", data: bybitInDb });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

let getBybitAllPair = async (req, res) => {
  try {
    let bybitApi = await bybit.find().select({ pairName: 1 });

    return res
      .status(200)
      .send({ status: true, msg: "successfull", data: bybitApi });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { bybitExchange, getBybitAllPair };

// function addDataInTenMin(n) {
//     setInterval(ftxInDb, n * 1000);
// }

// addDataInTenMin(10);

// let timer  = setInterval( async () => {
//     await ftx.insertMany(ftxInDb)
//      }, 1000).then()

//      console.log(timer);
