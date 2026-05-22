interface StatBarProps {
  label: string;
  value: number;
  color: string;
  icon: string;
  mini?: boolean;
}

export function StatBar({ label, value, color, icon, mini }: StatBarProps) {
  if (mini) {
    return (
      <div className="w-full">
        <div className="mb-0.5 flex justify-between text-[9px] font-bold text-ink">
          <span>
            {icon} {label}
          </span>
          <span>{value}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-ink/15">
          <div
            className={`h-full rounded-full transition-all duration-500 ${color}`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  }

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
