// Ícones de traço fino usados nas maquetas da home (desenhados à mão para o
// filme; mais leves do que importar um ícone de biblioteca por cada um).

const PATHS = {
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  cal: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20c1.2-4 4-5.6 7.5-5.6s6.3 1.6 7.5 5.6" />
    </>
  ),
  spark: <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />,
  chat: <path d="M4 5.5h16v10H9l-5 4z" />,
  cart: (
    <>
      <path d="M3 4h2.5l2.2 10.5h10.6L21 7H7" />
      <circle cx="9.5" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.6 2.6 2.6 14.4 0 17M12 3.5c-2.6 2.6-2.6 14.4 0 17" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
  bolt: <path d="M13 3L5 13.5h6L10 21l9-11h-6z" />,
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0113 0c0 4.8-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h9M18 12v3M15.5 12v2" />
    </>
  ),
  chart: <path d="M4 19h16M6 15l4-4 3 3 5-6" />,
  brush: (
    <path d="M14.5 4.5l5 5-8 8-5-5zM6.5 12.5c-2 0-3 1.5-3 3.5 0 1.5-.5 2.5-1.5 3 3 .5 6.5 0 6.5-3.5" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="4" width="7" height="6" rx="1.5" />
      <rect x="14" y="14" width="7" height="6" rx="1.5" />
      <path d="M6.5 10v4.5a2 2 0 002 2H14" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <i className={`hm-ic ${className}`} aria-hidden>
      <svg viewBox="0 0 24 24">{PATHS[name]}</svg>
    </i>
  );
}
