import axios from "axios";

export async function fetchCoins() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1";

  const res = await axios.get(url);
  return res.data;
}

export async function fetchCoinDetails(id: string) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;
  const res = await axios.get(url);
  return res.data;
}

export async function fetchCoinHistory(id: string) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`;
  const res = await axios.get(url);
  return res.data.prices;
}
