import { ContentPanel } from '../components/layout/ContentPanel';

const RULES_SHORT = [
  { t: 'Цель', b: 'Задания + уход → XP и уровень' },
  { t: 'XP', b: '100×уровень = новый уровень' },
  { t: 'Монеты', b: 'За задания, для наград' },
  { t: 'Настроение', b: 'От счастья, сытости, заданий' },
  { t: 'Задания', b: '6 в день, сброс в полночь' },
  { t: 'Облако', b: 'Вход → Firestore синхронизация' },
];

export function RulesPage() {
  return (
    <ContentPanel className="max-h-[32vh]">
      <h2 className="mb-1.5 text-xs font-extrabold text-ink">Правила</h2>
      <ul className="grid grid-cols-2 gap-1">
        {RULES_SHORT.map((r) => (
          <li
            key={r.t}
            className="rounded-lg bg-white/60 px-1.5 py-1 text-left"
          >
            <p className="text-[10px] font-bold leading-tight text-ink">{r.t}</p>
            <p className="text-[9px] leading-tight text-ink/65">{r.b}</p>
          </li>
        ))}
      </ul>
    </ContentPanel>
  );
}
