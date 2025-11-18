import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components/ui/card";
import { KpiCard } from "../../components/kpi-card";
import { MiniChart } from "../../components/mini-chart";
import { fetchCoins } from "../../core/services/coingecko";
import { setCoins, setLoading } from "../../core/state/coins/coins.slice";
import type { RootState } from "../../core/state/store";

interface MarketChartResponse {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const favorites = useSelector((s: RootState) => s.favorites.data);
  const portfolio = useSelector((s: RootState) => s.portfolio.data);
  const coins = useSelector((s: RootState) => s.coins.data);

  const [chartData, setChartData] = useState<{ btc: number; eth: number; index: number }[]>([]);

  // Carregar moedas se estiverem vazias
  useEffect(() => {
    if (coins.length === 0) {
      dispatch(setLoading(true));
      fetchCoins().then((data) => {
        dispatch(setCoins(data));
        dispatch(setLoading(false));
      });
    }
  }, [coins.length, dispatch]);

  const totalUSD = portfolio.reduce((acc, p) => {
    const c = coins.find((x) => x.id === p.coinId);
    return c ? acc + c.current_price * p.amount : acc;
  }, 0);

  useEffect(() => {
    if (chartData.length === 0) {
      Promise.all([
        fetch(`/api/coingecko/coins/bitcoin/market_chart?vs_currency=usd&days=7`)
          .then((r) => r.json() as Promise<MarketChartResponse>),
        fetch(`/api/coingecko/coins/ethereum/market_chart?vs_currency=usd&days=7`)
          .then((r) => r.json() as Promise<MarketChartResponse>)
      ]).then(([btc, eth]) => {
        const mapped = btc.prices.map((_, i) => ({
          index: i,
          btc: btc.prices[i]?.[1] ?? 0,
          eth: eth.prices[i]?.[1] ?? 0
        }));
        setChartData(mapped);
      }).catch((error) => {
        console.error('Erro ao carregar dados do gráfico:', error);
      });
    }
  }, [chartData.length]);

  const top5 = coins.slice(0, 5);

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <KpiCard label="Valor total do portfólio" value={`$${totalUSD.toFixed(2)}`} />
        <KpiCard label="Favoritos" value={favorites.length} />
        <KpiCard label="Ativos no portfólio" value={portfolio.length} />
      </div>

      <Card className="mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">BTC vs ETH (últimos 7 dias)</h2>
        {chartData.length > 0 ? (
          <MiniChart data={chartData} />
        ) : (
          <p className="text-gray-400 text-sm">Carregando gráfico...</p>
        )}
      </Card>

      <Card className="mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Top 5 Criptomoedas</h2>
        {top5.length === 0 ? (
          <p className="text-gray-400 text-sm">Carregando moedas...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {top5.map((c) => (
              <div key={c.id} className="flex justify-between border-b border-gray-700 pb-2">
                <span>{c.name}</span>
                <span>${c.current_price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Favoritos Recentes</h2>

        {favorites.length === 0 ? (
          <p className="text-gray-400">Nenhuma moeda favoritada ainda.</p>
        ) : (
          favorites.slice(0, 5).map((id) => (
            <p key={id} className="border-b border-gray-700 py-2">{id}</p>
          ))
        )}
      </Card>
    </div>
  );
}
