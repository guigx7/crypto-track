interface Props {
  label: string;
  value: string | number;
}

export function InfoRow({ label, value }: Props) {
  return (
    <div className="flex justify-between border-b border-gray-700 py-2">
      <span className="text-gray-400">{label}</span>
      <span>{value}</span>
    </div>
  );
}
