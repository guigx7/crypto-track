import { Link } from "react-router-dom";
import { Card } from "./ui/card";

interface Props {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  change: number;
}

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
      className: "text-green-500"
    };
  }
  
  return {
    text: `${rounded.toFixed(2)}%`,
    className: "text-red-500"
  };
}

export function CoinCard({ name, symbol, image, price, change, id }: Props) {
  const changeFormatted = formatPriceChange(change);

  return (
    <Link to={`/coins/${id}`}>
      <Card className="flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-800 transition">
        <div className="flex items-center gap-4">
          <img src={image} className="w-10 h-10" />

          <div>
            <p className="text-lg font-bold">{name}</p>
            <p className="text-gray-400 text-sm">{symbol.toUpperCase()}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold">${price.toFixed(2)}</p>
          <p className={changeFormatted.className}>
            {changeFormatted.text}
          </p>
        </div>
      </Card>
    </Link>
  );
}