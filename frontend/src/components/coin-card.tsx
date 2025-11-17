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

export function CoinCard({ id, name, symbol, image, price, change }: Props) {
  return (
    <Link to={`/coins/${id}`}>
      <Card className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={image} alt={name} className="w-10 h-10" />

          <div>
            <p className="text-lg font-bold">{name}</p>
            <p className="text-gray-400 text-sm">{symbol.toUpperCase()}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold">${price.toFixed(2)}</p>
          <p className={change >= 0 ? "text-green-500" : "text-red-500"}>
            {change.toFixed(2)}%
          </p>
        </div>
      </Card>
    </Link>
  );
}
