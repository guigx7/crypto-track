import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../core/state/store";
import { addFavorite, removeFavorite } from "../core/state/favorites/favorites.slice";
import { apiAddFavorite, apiRemoveFavorite } from "../core/services/favorites";

interface Props {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  change: number;
}

export function CoinCard({ name, symbol, image, price, change, id }: Props) {
  const dispatch = useDispatch();
  const favorites = useSelector((s: RootState) => s.favorites.data);

  const isFav = favorites.includes(id);

  async function toggleFav(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (isFav) {
      await apiRemoveFavorite(id);
      dispatch(removeFavorite(id));
    } else {
      await apiAddFavorite(id);
      dispatch(addFavorite(id));
    }
  }

  return (
    <Link to={`/coins/${id}`}>
      <Card className="flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-800 transition">

        <div className="flex items-center gap-4">
          <img src={image} className="w-10 h-10" />

          <div>
            <p className="text-lg font-bold">{name}</p>
            <p className="text-gray-400 text-sm">{symbol.toUpperCase()}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold">${price.toFixed(2)}</p>
          <p className={change >= 0 ? "text-green-500" : "text-red-500"}>
            {change.toFixed(2)}%
          </p>
        </div>

        <div onClick={toggleFav}>
          {isFav ? (
            <span className="text-yellow-400 text-xl">★</span>
          ) : (
            <span className="text-gray-500 text-xl">☆</span>
          )}
        </div>
      </Card>
    </Link>
  );
}