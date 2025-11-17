import { LineChart, Line, ResponsiveContainer } from "recharts";

interface Props {
  data: { btc: number; eth: number; index: number }[];
}

export function MiniChart({ data }: Props) {
  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="btc" stroke="#facc15" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="eth" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
