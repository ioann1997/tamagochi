import { ContentPanel } from '../components/layout/ContentPanel';
import { ALL_TASKS_BONUS_POINTS } from '../data/tasks';

const RULES_SHORT = [
  { t: 'Дейлики', b: '5 заданий в день, сброс в полночь' },
  { t: 'Баллы', b: 'За дейлики и цели (уровень)' },
  { t: 'Бонус', b: `Все 5 дейликов → +${ALL_TASKS_BONUS_POINTS} баллов` },
  { t: 'Награды', b: 'Магазин — трать баллы на награды' },
  { t: 'Питомец', b: 'Настроение от заданий и ухода' },
  { t: 'Облако', b: 'Вход → синхронизация' },
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
