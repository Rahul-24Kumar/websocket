const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const User = require("./src/models/user")

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

//Routes
const routes = require("./src/routes/route")
const capCoinRoute = require("./src/routes/capCoinRoute");
const bitstampRoute = require("./src/routes/bitstampRoute");
const bitgetRoute = require("./src/routes/bitgetRoute");
const bitsoRoute = require("./src/routes/bitsoRoute");
const binanceRoute = require("./src/routes/binanaceRoute");
const bybitRoute = require("./src/routes/bybitRoute");
const huobiRoute = require("./src/routes/huobiRoute");
const indoexRoute = require("./src/routes/indoexRoute");
const okxRoute = require("./src/routes/okxRoute");
const poloniexRoute = require("./src/routes/poloniexRoute");
const capChartRoute = require("./src/routes/capChartRoute");

// let MONGODB_URI =
//   "mongodb://104.245.38.221:27017/websocket";
let port = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoDb Is Connected"))
  .catch((err) => console.log(err));

//Middlewares
app.use("/", bitstampRoute);
app.use("/", capCoinRoute);
app.use("/", binanceRoute);
app.use("/", bitsoRoute);
app.use("/", bitgetRoute);
app.use("/", bybitRoute);
app.use("/", huobiRoute);
app.use("/", indoexRoute);
app.use("/", okxRoute);
app.use("/", poloniexRoute);
app.use("/", capChartRoute);
app.use("/", routes);

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { userId, exp } = jwt.verify(accessToken, process.env.JWT_SECRET);

    if (exp < Date.now().valueOf / 1000) {
      return res.status(401).json({ error: "token is expired!" })
    }
    res.locals.loggedInUser = await User.findById(userId);
    next();
  } else {
    next();
  }
})



const server = app.listen(
  port,
  console.log(`Server running on PORT ${port}...`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);
  // console.log(socket)

  socket.on("coiPair", function (data) {
    io.sockets.emit("coiPair", data);
    // console.log(data);
  });

  socket.on("SingleCoin", function (data) {
    io.sockets.emit("SingleCoin", data);
    // console.log(data);
  });

  socket.on("oneCoinPair", function (data) {
    io.sockets.emit("oneCoinPair", data);
    // console.log(data);
  });

  socket.on("binanceCoinPair", function (data) {
    io.sockets.emit("binanceCoinPair", data);
    // console.log(data);
  });

  socket.on("bitgetPair", function (data) {
    io.sockets.emit("bitgetPair", data);
    // console.log(data);
  });

  socket.on("bitsoPair", function (data) {
    io.sockets.emit("bitsoPair", data);
    // console.log(data);
  });

  socket.on("bybitPair", function (data) {
    io.sockets.emit("bybitPair", data);
    // console.log(data);
  });

  socket.on("huobiPair", function (data) {
    io.sockets.emit("huobiPair", data);
    // console.log(data);
  });

  socket.on("indoexPair", function (data) {
    io.sockets.emit("indoexPair", data);
    // console.log(data);
  });

  socket.on("okxPair", function (data) {
    io.sockets.emit("okxPair", data);
    // console.log(data);
  });

  socket.on("poloniexPair", function (data) {
    io.sockets.emit("poloniexPair", data);
    // console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.log(error);
  });
});









// const connection = mongoose.connection;
// connection.once("open", () => {
//   // console.log("MongoDB database connected");
//   console.log("Setting change streams");

//   const datachange = connection.collection("bitstamps").watch();

//   datachange.on("change", (change) => {
//     switch (change.operationType) {
//       case "insert":
//         const mData = {
//           _id: change.fullDocument._id,
//           pairName: change.fullDocument.pairName,
//           lastPrice: change.fullDocument.lastPrice,
//           highPrice: change.fullDocument.highPrice,
//           lowPrice: change.fullDocument.lowPrice,
//           volume: change.fullDocument.volume,
//           bidPrice: change.fullDocument.bidPrice,
//         };

//         // let value = [...mData];
//         // console.log(value)
//         // let data = [];
//         // for (let i = 0; i <change.length; i++) {
//         //   data.push([i])
//         // }
//         // console.log(data);
//         io.emit("newMData", change.fullDocument);
//         break;
//       case "delete":
//         io.emit("deletedData", change.documentKey._id);
//         break;
//     }
//   });
// });
// socket connection
// io.on("connection", (socket) => {
// changeStream.on("change", (next) => {
//   // process any change event
//   switch (next.operationType) {
//     case "insert":
//       io.emit("chat message", next.fullDocument.bitstamp);
//       console.log(next.fullDocument.bitstamp);
//       break;
//     case "update":
//       io.emit("chat message", next.updateDescription.updatedFields.bitstamp);
//       console.log(next.updateDescription.updatedFields.bitstamp);
//   }
// });
// });
