import { Card } from "./ui/card";

interface Props {
  label: string;
  value: string | number;
}

export function KpiCard({ label, value }: Props) {
  return (
    <Card className="p-6 flex flex-col">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-2xl font-bold mt-1">{value}</span>
    </Card>
  );
}
