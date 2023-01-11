import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../../socket-io-connection/socket";

function Bitstamp() {
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
    socket.emit("coiPair", data);

    //Listen for events
    socket.on("coiPair", async function (data) {
      // console.log(data);
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

    // return () => {
    //   socket.disconnect();
    // };
  }, [data]);

  async function saveFtxData() {
    try {
      let response = await axios({
        method: "post",
        url: "http://localhost:4000/bitstampApi",
      });
      if (response.data.bitstampData) {
        setData(response.data.bitstampData);
        // setSocketData(response.data.bitstampData);
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchFtxData() {
    try {
      let response1 = await axios({
        method: "get",
        url: "http://localhost:4000/pairBitstamp",
      });
      let result = response1.data.bitstampApiData;
      if (response1.data.bitstampApiData) {
        setMongoData(result);
        // setSocketData(result);
      }
      // console.log(response1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setInterval(() => {
      saveFtxData();
    }, 1000);
  }, []);

  // useEffect(() => {
  //   fetchFtxData();
  // }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="BistampsData">
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
              <th scope="col">Price Change%</th>
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
                  <td>{coin.volume.toFixed(2)}</td>
                  <td>{coin.bidPrice}</td>
                  <td>{coin.priceChangePercent}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Coin</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Bitstamp;
