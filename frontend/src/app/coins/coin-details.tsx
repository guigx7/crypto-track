/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetails, fetchCoinHistory } from "../../core/services/coingecko";
import { setLoading, setDetails, setHistory } from "../../core/state/coin-details/coin-details.slice";
import { Loader } from "../../components/ui/loader";
import { Card } from "../../components/ui/card";
import { InfoRow } from "../../components/ui/info-row";
import type { RootState } from "../../core/state/store";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function formatPriceChange(value: number): { text: string; className: string } {
  const rounded = Math.round(value * 100) / 100;

  if (rounded === 0) {
    return {
      text: "0.00%",
      className: "text-[#CCCCCC]"
    };
  }

  if (value > 0) {
    return {
      text: `+${rounded.toFixed(2)}%`,
      className: "text-green-400"
    };
  }

  return {
    text: `${rounded.toFixed(2)}%`,
    className: "text-red-400"
  };
}

export default function CoinDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, history, loading } = useSelector((s: RootState) => s.coinDetails);
  const coinsList = useSelector((s: RootState) => s.coins.data);
  const coinFromList = coinsList.find((coin: any) => coin.id === id);

  useEffect(() => {
    if (!id) return;

    dispatch(setLoading(true));

    // Carrega detalhes e histórico em paralelo, mas com rate limiting
    Promise.all([
      fetchCoinDetails(id).catch((error) => {
        console.error("Erro ao carregar detalhes:", error);
        return null;
      }),
      fetchCoinHistory(id).catch((error) => {
        console.error("Erro ao carregar histórico:", error);
        return null;
      })
    ]).then(([details, history]) => {
      if (details) {
        dispatch(setDetails(details));
      }
      if (history) {
        dispatch(setHistory(history));
      }
      dispatch(setLoading(false));
    });

    return () => {
      // Cleanup se necessário
    };
  }, [id, dispatch]);

  if (loading && !data && coinFromList) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-6">{coinFromList.name}</h1>
        <Card className="mb-6">
          <InfoRow label="Preço atual" value={`$${coinFromList.current_price.toFixed(2)}`} />
          <InfoRow
            label="Variação 24h"
            value={
              <span className={formatPriceChange(coinFromList.price_change_percentage_24h).className}>
                {formatPriceChange(coinFromList.price_change_percentage_24h).text}
              </span>
            }
          />
        </Card>
        <div className="flex justify-center items-center h-80">
          <Loader />
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <Loader />
      </div>
    );
  }

  const chartData = history.length > 0
    ? history.map(([t, p]) => ({
      time: new Date(t).toLocaleDateString(),
      price: p,
    }))
    : [];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">{data.name}</h1>

      <Card className="mb-6">
        <InfoRow label="Preço atual" value={`$${data.market_data.current_price.usd}`} />
        <InfoRow label="Market Cap" value={`$${data.market_data.market_cap.usd}`} />
        <InfoRow
          label="Variação 24h"
          value={
            <span className={formatPriceChange(data.market_data.price_change_percentage_24h).className}>
              {formatPriceChange(data.market_data.price_change_percentage_24h).text}
            </span>
          }
        />
        <InfoRow label="Supply" value={data.market_data.circulating_supply} />
      </Card>

      <Card className="h-80">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        )}
      </Card>
    </div>
  );
}
