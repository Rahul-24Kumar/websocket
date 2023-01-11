const capModel = require("../models/capCoinApiModel");

const cap = async (req, res) => {
  try {
    let capData = await capModel.find({ coinName: 1 }).select({ priceUsd: 1 });

    return res.status(200).send({ message: "succesfull", data: capData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "error occured!", error: message.error });
  }
};

module.exports = { cap };
