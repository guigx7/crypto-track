import axios from "axios";

export async function fetchCoins() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd" +
    "&order=market_cap_desc" +
    "&per_page=50" +
    "&page=1" +
    "&sparkline=true" +
    "&price_change_percentage=1h,24h,7d";

  const res = await axios.get(url);
  return res.data;
}

export async function fetchCoinDetails(id: string) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}?sparkline=true&localization=false`;
  const res = await axios.get(url);
  return res.data;
}

export async function fetchCoinHistory(id: string) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`;
  const res = await axios.get(url);
  return res.data.prices;
}

export async function fetchAllCoinsList() {
  const url = "https://api.coingecko.com/api/v3/coins/list";
  const res = await axios.get(url);
  return res.data;
}

export async function fetchCoinBasicInfo(id: string) {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
  );

  return {
    image: res.data.image?.thumb || res.data.image?.small || "",
  };
}

export async function fetchTop500() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=true&price_change_percentage=1h,24h,7d";

  const res = await axios.get(url);
  return res.data;
}

