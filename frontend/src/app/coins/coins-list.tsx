import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../../core/services/coingecko";
import { setCoins, setLoading } from "../../core/state/coins/coins.slice";
import { Loader } from "../../components/ui/loader";
import { CoinCard } from "../../components/coin-card";
import type { RootState } from "../../core/state/store";

export default function CoinsList() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((s: RootState) => s.coins);

  useEffect(() => {
    dispatch(setLoading(true));

    fetchCoins().then((coins) => {
      dispatch(setCoins(coins));
      dispatch(setLoading(false));
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Top 50 Criptomoedas</h1>

      {loading && (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      )}

      <div className="flex flex-col gap-4">
        {data.map((c) => (
          <CoinCard
            key={c.id}
            id={c.id}
            name={c.name}
            symbol={c.symbol}
            image={c.image}
            price={c.current_price}
            change={c.price_change_percentage_24h}
          />
        ))}
      </div>
    </div>
  );
}
