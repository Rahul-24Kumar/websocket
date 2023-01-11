import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { socket } from "../../socket-io-connection/socket";

function Binance() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketData, setSocketData] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  let limit = 100;

  useEffect(() => {
    socket.on("connection", () => {
      setSocketConnected(true);
      console.log(socket.id);
    });

    //Emit events
    socket.emit("binanceCoinPair", data);

    //Listen for events
    socket.on("binanceCoinPair", async function (data) {
      console.log(data);
      let show = await data;
      setSocketData(show);
    });

    getBinanceData();

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

  async function saveBinanceData() {
    try {
      let response = await axios({
        method: "post",
        url: "http://localhost:4000/binanceApi",
      });
      if (response.data.data) {
        setData(response.data.data);
        // setSocketData(response.data.data);
      }

      const total = response.data.data.length;
      setpageCount(Math.ceil(total / limit));
      //   console.log(pageCount);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBinanceData() {
    try {
      let response = await axios({
        method: "get",
        url: `http://localhost:4000/pairBinance?limit=${limit}`,
      });
      if (response.data.data) {
        // setData(response.data.data);
        // setSocketData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setInterval(() => {
      saveBinanceData();
    }, 6000);
  }, []);

  useEffect(() => {
    // setInterval(() => {
    // getBinanceData();
    // }, 1000);
  }, []);

  const fetchBinancePair = async (currentPage) => {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:4000/pairBinance?pageSize=${currentPage}&limit=${limit}`,
      });
      const resData = res.data.data;

      return resData;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = async (resData) => {
    try {
      let currentPage = resData.selected;
      //   console.log(currentPage)
      const pair = await fetchBinancePair(currentPage);

      //   setData(pair);
      setSocketData(pair);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="BinanceData">
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
              {/* <th scope="col">#</th> */}
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
            {socketData && socketData.length > 0 ? (
              socketData.map((coin, index) => (
                <tr key={index}>
                  {/* <td>{index + 1}</td> */}
                  <td>{coin.pairName}</td>
                  <td>{coin.lastPrice.toFixed(4)}</td>
                  <td>{coin.lowPrice.toFixed(4)}</td>
                  <td>{coin.highPrice.toFixed(4)}</td>
                  <td>{coin.volume.toFixed(2)}</td>
                  <td>{coin.bidPrice.toFixed(4)}</td>
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
        <div>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </>
  );
}

export default Binance;
