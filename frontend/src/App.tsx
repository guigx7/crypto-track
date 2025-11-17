import { AppRoutes } from "./app/routes";
import { useEffect } from "react";

import { fetchAllCoinsList } from "./core/services/coingecko";
import { setAllCoins } from "./core/state/coins/all-coins.slice";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllCoinsList().then((list) => dispatch(setAllCoins(list)));
  }, []);

  return <AppRoutes />;
}
