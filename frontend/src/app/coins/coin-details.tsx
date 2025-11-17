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

export default function CoinDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, history, loading } = useSelector((s: RootState) => s.coinDetails);

  useEffect(() => {
    if (!id) return;

    dispatch(setLoading(true));

    fetchCoinDetails(id).then((details) => {
      dispatch(setDetails(details));
    });

    fetchCoinHistory(id).then((prices) => {
      dispatch(setHistory(prices));
      dispatch(setLoading(false));
    });
  }, [id]);

  if (loading || !data)
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <Loader />
      </div>
    );

  const chartData = history.map(([t, p]) => ({
    time: new Date(t).toLocaleDateString(),
    price: p,
  }));

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">{data.name}</h1>

      <Card className="mb-6">
        <InfoRow label="Preço atual" value={`$${data.market_data.current_price.usd}`} />
        <InfoRow label="Market Cap" value={`$${data.market_data.market_cap.usd}`} />
        <InfoRow label="Variação 24h" value={`${data.market_data.price_change_percentage_24h}%`} />
        <InfoRow label="Supply" value={data.market_data.circulating_supply} />
      </Card>

      <Card className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="time" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
