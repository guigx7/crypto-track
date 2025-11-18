import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../core/state/store";
import { useNavigate } from "react-router-dom";

export function CoinSearch() {
  const nav = useNavigate();
  const allCoins = useSelector((s: RootState) => s.allCoins.data);
  const [query, setQuery] = useState("");

  // Função para calcular a pontuação de correspondência
  const getMatchScore = (coin: { name: string; symbol: string }, searchQuery: string): number => {
    const lowerQuery = searchQuery.toLowerCase();
    const lowerName = coin.name.toLowerCase();
    const lowerSymbol = coin.symbol.toLowerCase();

    // Correspondência exata do símbolo (maior prioridade)
    if (lowerSymbol === lowerQuery) return 1000;
    
    // Correspondência exata do nome
    if (lowerName === lowerQuery) return 900;
    
    // Símbolo começa com a query
    if (lowerSymbol.startsWith(lowerQuery)) return 800;
    
    // Nome começa com a query
    if (lowerName.startsWith(lowerQuery)) return 700;
    
    // Símbolo contém a query
    if (lowerSymbol.includes(lowerQuery)) return 600;
    
    // Nome contém a query
    if (lowerName.includes(lowerQuery)) return 500;
    
    return 0;
  };

  // Filtra e ordena os resultados
  const results = useMemo(() => {
    if (query.length === 0) return [];

    const lowerQuery = query.toLowerCase();
    
    // Filtra moedas que correspondem à busca
    const filtered = allCoins.filter((c) => {
      const lowerName = c.name.toLowerCase();
      const lowerSymbol = c.symbol.toLowerCase();
      return lowerName.includes(lowerQuery) || lowerSymbol.includes(lowerQuery);
    });

    // Ordena por pontuação de correspondência (maior primeiro)
    const sorted = filtered
      .map((coin) => ({
        coin,
        score: getMatchScore(coin, query)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10) // Limita a 10 resultados
      .map((item) => item.coin);

    return sorted;
  }, [query, allCoins]);

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
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-800 transition"
            >
              <div className="flex flex-col">
                <span className="text-white font-medium">{coin.name}</span>
                <span className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
