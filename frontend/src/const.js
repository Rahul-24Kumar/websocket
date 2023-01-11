import Capcoin from "./pages/capCoin";
import Home from "./pages/bitstamp";
import CoinPair from "./pages/coinPair";
import Binance from "./pages/binance";
import Bitget from "./pages/bitget";
import Bitso from "./pages/bitso";
import Bybit from "./pages/bybit";
import Huobi from "./pages/huobi";
import Indoex from "./pages/indoex";
import Okx from "./pages/okx";
import Poloniex from "./pages/poloniex";

export const ROUTES = [
  {
    path: "/",
    page: <Home />,
  },
  {
    path: "/coins",
    page: <Capcoin />,
  },
  {
    path: "/pairs",
    page: <CoinPair />,
  },
  {
    path: "/binancePair",
    page: <Binance />,
  },
  {
    path: "/bitgetPair",
    page: <Bitget />,
  },
  {
    path: "/bitsoPair",
    page: <Bitso />,
  },
  {
    path: "/bybitPair",
    page: <Bybit />,
  },
  {
    path: "/huobiPair",
    page: <Huobi />,
  },
  {
    path: "/indoexPair",
    page: <Indoex />,
  },
  {
    path: "/okxPair",
    page: <Okx />,
  },
  {
    path: "/poloniexPair",
    page: <Poloniex />,
  },
];
