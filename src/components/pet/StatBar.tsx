interface StatBarProps {
  label: string;
  value: number;
  color: string;
  icon: string;
}

export function StatBar({ label, value, color, icon }: StatBarProps) {
  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-sm font-semibold text-ink">
        <span>
          {icon} {label}
        </span>
        <span>{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-ink/10">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
