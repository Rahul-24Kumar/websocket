const indoex = require("../models/indoexApiModel");
const axios = require("axios");

const indoexExchange = async (req, res) => {
  try {
    let options = {
      method: "get",
      url: "https://api.indoex.io/getMarketDetails/",
    };

    let response = await axios(options);

    let result = response.data.marketdetails;

    let indoexApiData = [];

    result.forEach((element) => {
      indoexApiData.push({
        coinName: element.name,
        pairName: element.pair,
        lastPrice: element.last,
        highPrice: element["24hrhigh"],
        lowPrice: element.lowsale,
        baseVolume: element.baseVolume,
        quoteVolume: element.quoteVolume,
        minBuy: element.min_buy,
        minSell: element.min_sell,
        sellFee: element.sellfee,
        buyFee: element.buyfee,
        cmcid: element.cmcid,
      });
    });

    let indoexInDb = await indoex.insertMany(indoexApiData);
    // console.log(indoexInDb);

    return res
      .status(201)
      .send({ status: true, msg: "successful", data: indoexInDb });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

let getIndoexAllPair = async (req, res) => {
  try {
    let indoexApi = await indoex.find().select({ pairName: 1 });

    return res
      .status(200)
      .send({ status: true, msg: "successfull", data: indoexApi });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { indoexExchange, getIndoexAllPair };
