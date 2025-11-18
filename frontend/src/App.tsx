import { AppRoutes } from "./app/routes";
import { useEffect } from "react";

import { fetchAllCoinsList } from "./core/services/coingecko";
import { setAllCoins } from "./core/state/coins/all-coins.slice";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Carrega a lista completa de moedas apenas uma vez
    fetchAllCoinsList()
      .then((list) => {
        if (list && Array.isArray(list)) {
          dispatch(setAllCoins(list));
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar lista de moedas:", error);
      });
  }, [dispatch]);

  return <AppRoutes />;
}
