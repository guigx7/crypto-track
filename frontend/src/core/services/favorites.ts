import axios from "axios";

export async function apiGetFavorites() {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:4000/favorites", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function apiAddFavorite(coinId: string) {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    "http://localhost:4000/favorites",
    { coinId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}

export async function apiRemoveFavorite(coinId: string) {
  const token = localStorage.getItem("token");
  const res = await axios.delete(
    `http://localhost:4000/favorites/${coinId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
