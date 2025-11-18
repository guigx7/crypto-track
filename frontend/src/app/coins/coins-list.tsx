import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoins } from "../../core/services/coingecko";
import { setCoins, setLoading } from "../../core/state/coins/coins.slice";
import { CoinRow } from "./components/coin-row";
import type { RootState } from "../../core/state/store";
import { CoinSearch } from "./components/coin-search";
import { Loader } from "../../components/ui/loader";

export default function CoinsList() {
  const dispatch = useDispatch();
  const coins = useSelector((s: RootState) => s.coins.data);
  const loading = useSelector((s: RootState) => s.coins.loading);

  useEffect(() => {
    // Carrega as moedas quando o componente monta, apenas se não houver dados
    if (coins.length === 0) {
      dispatch(setLoading(true));
      fetchCoins()
        .then((list) => {
          console.log("Moedas carregadas:", list?.length || 0, list);
          if (list && Array.isArray(list)) {
            dispatch(setCoins(list));
          } else {
            console.error("Resposta inválida da API:", list);
          }
          dispatch(setLoading(false));
        })
        .catch((error) => {
          console.error("Erro ao carregar moedas:", error);
          const errorMessage = error instanceof Error 
            ? error.message 
            : "Erro ao carregar moedas. Tente novamente em alguns segundos.";
          
          if (errorMessage.includes("Muitas requisições")) {
            console.warn("Rate limit atingido. Os dados serão carregados do cache quando disponível.");
            // Tenta usar dados do cache se disponível
            setTimeout(() => {
              fetchCoins()
                .then((list) => {
                  if (list && Array.isArray(list)) {
                    dispatch(setCoins(list));
                  }
                  dispatch(setLoading(false));
                })
                .catch(() => {
                  dispatch(setLoading(false));
                });
            }, 5000);
          } else {
            dispatch(setLoading(false));
          }
        });
    }
  }, [dispatch, coins.length]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Top 50 Criptomoedas</h1>
        <CoinSearch />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <div className="overflow-auto rounded-lg border border-gray-700">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-gray-900 border-b border-gray-700">
              <tr>
                <th className="px-4 py-3"></th>
                <th className="px-4 py-3"></th>
                <th className="px-4 py-3">Moeda</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">1h</th>
                <th className="px-4 py-3">24h</th>
                <th className="px-4 py-3">7d</th>
                <th className="px-4 py-3">Volume 24h</th>
                <th className="px-4 py-3">Market Cap</th>
                <th className="px-4 py-3">Últimos 7 dias</th>
              </tr>
            </thead>

            <tbody>
              {coins.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-400">
                    Nenhuma moeda encontrada
                  </td>
                </tr>
              ) : (
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                coins.map((coin: any, i: number) => (
                  <CoinRow key={coin.id} coin={coin} index={i} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
