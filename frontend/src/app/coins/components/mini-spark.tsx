import {
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart
} from "recharts";

interface Props {
  data: number[];
}

export function MiniSpark({ data }: Props) {
  const formatted = data.map((v: number, i: number) => ({
    index: i,
    value: v
  }));

  const first = data[0];
  const last = data[data.length - 1];
  const isUp = last >= first;

  const strokeColor = isUp ? "#22c55e" : "#ef4444";
  const fillColor = isUp ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)";

  return (
    <div className="w-32 h-10">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formatted}>
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fillColor} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            fill="url(#sparkFill)"
            strokeWidth={2.2}
          />

          <Tooltip
            cursor={false}
            content={() => null}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
