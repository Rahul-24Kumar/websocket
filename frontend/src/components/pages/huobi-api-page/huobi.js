import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../../socket-io-connection/socket";

function Huobi() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketData, setSocketData] = useState([]);

  useEffect(() => {
    socket.on("connection", () => {
      setSocketConnected(true);
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    //Emit events
    socket.emit("huobiPair", data);

    //Listen for events
    socket.on("huobiPair", async function (data) {
      //   console.log(data);
      let show = await data;
      setSocketData(show);
    });

    //Listen for events
    // socket.on("newMData", async function (data) {
    //   // let somethig = await data;
    //   // console.log(somethig)
    //   // setSocketData(somethig)
    // });

    socket.on("connect_error", (error) => {
      console.log(error);
    });
  }, [data]);

  async function saveHuobiData() {
    try {
      let response = await axios({
        method: "post",
        url: "http://localhost:4000/huobiapi",
      });
      if (response.data.data) {
        setData(response.data.data);
      }
      //   console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setInterval(() => {
        saveHuobiData();
    }, 3000);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="HuobiData">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
        >
          <h3 style={{ padding: "10px auto", fontFamily: "monospace" }}>
            last 24(Hr) data
          </h3>
        </div>
        <table className="table" style={{ padding: "10px auto" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Pair Name</th>
              <th scope="col">Last Price</th>
              <th scope="col">Low Price</th>
              <th scope="col">High Price</th>
              <th scope="col">Volume</th>
              <th scope="col">Bid Price</th>
              {/* <th scope="col">Price Change%</th> */}
            </tr>
          </thead>
          <tbody>
            {socketData.length > 0 ? (
              socketData.map((coin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{coin.pairName}</td>
                  <td>{coin.lastPrice}</td>
                  <td>{coin.lowPrice}</td>
                  <td>{coin.highPrice}</td>
                  <td>{coin.volume.toFixed(8)}</td>
                  <td>{coin.bidPrice}</td>
                  {/* <td>{coin.priceChangePercent}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Pair</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Huobi;
