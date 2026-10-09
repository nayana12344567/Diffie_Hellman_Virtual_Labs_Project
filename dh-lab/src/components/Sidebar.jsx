export const SECTIONS = [
  'Introduction',
  'Objective',
  'Theory',
  'Algorithm',
  'Experiment',
  'Result',
  'References',
];

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="sidebar">
      <ul>
        {SECTIONS.map((name) => (
          <li key={name}>
            <button
              type="button"
              className={name === active ? 'side-link active' : 'side-link'}
              onClick={() => onSelect(name)}
              aria-current={name === active ? 'page' : undefined}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
