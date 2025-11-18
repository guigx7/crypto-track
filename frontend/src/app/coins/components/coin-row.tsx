import { MiniSpark } from "./mini-spark";
import { Link } from "react-router-dom";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coin: any;
  index: number;
}

function formatPriceChange(value: number): { text: string; className: string } {
  const rounded = Math.round(value * 10) / 10;

  if (rounded === 0) {
    return {
      text: "+0.0%",
      className: "text-[#9D9D9D]"
    };
  }

  if (value > 0) {
    return {
      text: `+${rounded.toFixed(1)}%`,
      className: "text-green-400"
    };
  }

  return {
    text: `${rounded.toFixed(1)}%`,
    className: "text-red-400"
  };
}

export function CoinRow({ coin, index }: Props) {
  const change1h = formatPriceChange(coin.price_change_percentage_1h_in_currency);
  const change24h = formatPriceChange(coin.price_change_percentage_24h_in_currency);
  const change7d = formatPriceChange(coin.price_change_percentage_7d_in_currency);

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800 transition">
      <td className="px-4 py-3 text-gray-400">{index + 1}</td>

      <td className="px-4 py-3">
        <Link to={`/coins/${coin.id}`} className="flex items-center gap-2">
          <img src={coin.image} className="w-6 h-6" />
          <span className="font-semibold">{coin.name}</span>
          <span className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</span>
        </Link>
      </td>

      <td className="px-4 py-3">${coin.current_price.toFixed(2)}</td>

      <td className={`px-4 py-3 ${change1h.className}`}>
        {change1h.text}
      </td>

      <td className={`px-4 py-3 ${change24h.className}`}>
        {change24h.text}
      </td>

      <td className={`px-4 py-3 ${change7d.className}`}>
        {change7d.text}
      </td>


      <td className="px-4 py-3">${coin.total_volume.toLocaleString()}</td>

      <td className="px-4 py-3">${coin.market_cap.toLocaleString()}</td>

      <td className="px-4 py-3">
        {coin.sparkline_in_7d?.price && (
          <MiniSpark data={coin.sparkline_in_7d.price} />
        )}

      </td>
    </tr>
  );
}
