const express = require("express");
let axios = require("axios");

function SocketRouter(io) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      //   const count = req.query.count;

      let options = {
        method: "get",
        url: "https://www.bitstamp.net/api/v2/ticker/",
      };

      let response = await axios(options);
      console.log(response);
      let result = response.data;
      //   if (!count) {
      //     res
      //       .json({
      //         message: "count not exits",
      //       })
      //       .status(401);
      //   }

      io.emit("mod_forecast", result);
      res.json({
        message: "data delivered",
      });
    } catch (error) {
      console.log(error);
    }
  });

  return router;
}

module.exports = SocketRouter;
