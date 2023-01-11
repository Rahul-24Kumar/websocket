import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../../socket-io-connection/socket";
import { Link } from "react-router-dom";
import Chart from "chart.js";
import { Line } from "react-chartjs-2";

function Capcoin() {
  const [data, setData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [coinData, setCoinData] = useState([]);

  // console.log(coinData);
  useEffect(() => {
    // client-side
    socket.on("connection", () => {
      setSocketConnected(true);
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    //Emit events
    socket.emit("SingleCoin", data);

    //Listen for events
    socket.on("SingleCoin", async function (data) {
      // console.log(data);
      let show = await data;
      setCoinData(show);
    });

    socket.on("connect_error", (error) => {
      console.log(error);
    });
  }, [data]);

  // async function getCoinData() {
  //   try {
  //     let response2 = await axios({
  //       method: "get",
  //       url: "https://api.coincap.io/v2/assets",
  //     });
  //     if (response2.data) {
  //       // setCoinData(response2.data.data);
  //       setData(response2.data.data);
  //     }
  //     // console.log(response2);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function saveCapCoinDb() {
    try {
      let response = await axios({
        method: "post",
        url: "http://localhost:4000/cap100Coin",
      });

      if (response.data) {
        setDailyData(response.data.data);
        setData(response.data.data);
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setInterval(() => {
      // getCoinData();
      saveCapCoinDb();
    }, 1000);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="CapCoinData">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
        >
          <h3 style={{ padding: "10px auto", fontFamily: "monospace" }}>
            Coin data
          </h3>
        </div>
        <table className="table" style={{ padding: "10px auto" }}>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Symbol</th>
              <th scope="col">Coin Name</th>
              <th scope="col">Price(USD)</th>
              <th scope="col">Market Cap(USD)</th>
              <th scope="col">Supply</th>
              <th scope="col">Volume(24Hr)</th>
              <th scope="col">Change%(24Hr)</th>
              {/* <th scope="col">(24Hr)</th> */}
            </tr>
          </thead>
          <tbody>
            {coinData && coinData.length > 0 ? (
              coinData.map((coin, index) => (
                <tr key={index}>
                  <td>{coin.rank}</td>
                  <td>
                    <Link
                      to="/pairs"
                      onClick={() =>
                        localStorage.setItem("symbol", coin.symbol)
                      }
                    >
                      {coin.symbol}
                    </Link>
                  </td>
                  <td>{coin.coinName}</td>
                  <td>{coin.priceUsd.toFixed(4)}</td>
                  <td>{coin.marketCapUsd.toFixed(2)}</td>
                  <td>{coin.supply.toFixed(2)}</td>
                  <td>{coin.volumeUsd24Hr.toFixed(2)}</td>
                  <td>{coin.changePercent24Hr.toFixed(2)}%</td>
                  {/* <td><Line>{coin.priceUsd}</Line></td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Coin</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <button type="button" className="btn btn-primary">
          Primary
        </button> */}
      </div>
    </>
  );
}

export default Capcoin;
