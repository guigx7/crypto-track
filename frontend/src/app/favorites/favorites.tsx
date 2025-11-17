import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiGetFavorites } from "../../core/services/favorites";
import { setFavorites } from "../../core/state/favorites/favorites.slice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../core/state/store";

export default function Favorites() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const favorites = useSelector((s: RootState) => s.favorites.data);

  useEffect(() => {
    apiGetFavorites().then((list) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(setFavorites(list.map((f: any) => f.coinId)));
    });
  }, []);

  function openCoin(id: string) {
    nav(`/coins/${id}`);
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Favoritos</h1>

      {favorites.length === 0 && (
        <p className="text-gray-400 mt-10">Nenhuma moeda favoritada ainda.</p>
      )}

      <div className="flex flex-col gap-4">
        {favorites.map((id) => (
          <div
            key={id}
            className="p-4 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800 transition"
            onClick={() => openCoin(id)}
          >
            {id}
          </div>
        ))}
      </div>
    </div>
  );
}
