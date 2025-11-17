import { MiniSpark } from "./mini-spark";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../../core/state/favorites/favorites.slice";
import { apiAddFavorite, apiRemoveFavorite } from "../../../core/services/favorites";
import type { RootState } from "../../../core/state/store";
import { Link } from "react-router-dom";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coin: any;
  index: number;
}

export function CoinRow({ coin, index }: Props) {
  const dispatch = useDispatch();
  const favorites = useSelector((s: RootState) => s.favorites.data);
  const isFav = favorites.includes(coin.id);

  async function toggleFav() {
    if (isFav) {
      await apiRemoveFavorite(coin.id);
      dispatch(removeFavorite(coin.id));
    } else {
      await apiAddFavorite(coin.id);
      dispatch(addFavorite(coin.id));
    }
  }

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800 transition">
      <td className="px-4 py-3 cursor-pointer" onClick={toggleFav}>
        {isFav ? "★" : "☆"}
      </td>

      <td className="px-4 py-3 text-gray-400">{index + 1}</td>

      <td className="px-4 py-3">
        <Link to={`/coins/${coin.id}`} className="flex items-center gap-2">
          <img src={coin.image} className="w-6 h-6" />
          <span className="font-semibold">{coin.name}</span>
          <span className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</span>
        </Link>
      </td>

      <td className="px-4 py-3">${coin.current_price.toFixed(2)}</td>

      <td
        className={`px-4 py-3 ${coin.price_change_percentage_1h_in_currency >= 0 ? "text-green-400" : "text-red-400"}`}
      >
        {coin.price_change_percentage_1h_in_currency >= 0
          ? `+${coin.price_change_percentage_1h_in_currency.toFixed(1)}%`
          : `${coin.price_change_percentage_1h_in_currency.toFixed(1)}%`}
      </td>


      <td
        className={`px-4 py-3 ${coin.price_change_percentage_24h_in_currency >= 0 ? "text-green-400" : "text-red-400"}`}
      >
        {coin.price_change_percentage_24h_in_currency >= 0
          ? `+${coin.price_change_percentage_24h_in_currency.toFixed(1)}%`
          : `${coin.price_change_percentage_24h_in_currency.toFixed(1)}%`}
      </td>


      <td
        className={`px-4 py-3 ${coin.price_change_percentage_7d_in_currency >= 0 ? "text-green-400" : "text-red-400"}`}
      >
        {coin.price_change_percentage_7d_in_currency >= 0
          ? `+${coin.price_change_percentage_7d_in_currency.toFixed(1)}%`
          : `${coin.price_change_percentage_7d_in_currency.toFixed(1)}%`}
      </td>


      <td className="px-4 py-3">${coin.total_volume.toLocaleString()}</td>

      <td className="px-4 py-3">${coin.market_cap.toLocaleString()}</td>

      <td className="px-4 py-3">
        {coin.sparkline_in_7d?.price && (
          <MiniSpark data={coin.sparkline_in_7d.price} />
        )}

      </td>
    </tr>
  );
}
