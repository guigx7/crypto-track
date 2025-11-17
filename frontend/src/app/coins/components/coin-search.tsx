import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../core/state/store";
import { useNavigate } from "react-router-dom";
import { fetchCoinBasicInfo } from "../../../core/services/coingecko";

const iconCache: Record<string, string> = {};

export function CoinSearch() {
  const nav = useNavigate();
  const allCoins = useSelector((s: RootState) => s.allCoins.data);
  const [query, setQuery] = useState("");
  const [icons, setIcons] = useState<Record<string, string>>({});

  const results =
    query.length > 0
      ? allCoins.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.symbol.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
      : [];

  useEffect(() => {
    async function loadIcons() {
      const newIcons: Record<string, string> = {};

      for (const coin of results) {
        if (iconCache[coin.id]) {
          newIcons[coin.id] = iconCache[coin.id];
        } else {
          try {
            const info = await fetchCoinBasicInfo(coin.id);
            iconCache[coin.id] = info.image;
            newIcons[coin.id] = info.image;
          } catch {
            newIcons[coin.id] = "";
          }
        }
      }

      setIcons((prev) => ({ ...prev, ...newIcons }));
    }

    if (results.length > 0) {
      loadIcons();
    }
  }, [results]);

  function goTo(id: string) {
    setQuery("");
    nav(`/coins/${id}`);
  }

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        placeholder="Pesquisar moeda (ex: Bitcoin, BTC)"
        className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <ul className="absolute w-full mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-h-64 overflow-y-auto z-20">
          {results.map((coin) => (
            <li
              key={coin.id}
              onClick={() => goTo(coin.id)}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-800 transition"
            >
              {/* Ícone carregado dinamicamente */}
              {icons[coin.id] ? (
                <img src={icons[coin.id]} className="w-6 h-6 rounded-full" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-700 animate-pulse" />
              )}

              <span className="text-white font-medium">{coin.name}</span>
              <span className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
