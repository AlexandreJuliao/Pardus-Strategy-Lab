/**
 * Minimal geometric leopard head in profile, facing left.
 * Built from a handful of straight-edged shapes — abstract, technical.
 */
export default function LeopardMark({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* head wedge */}
      <path
        d="M3 18 L9 12 L11 7 L14 12 L21 11 L29 16 L24 20 L26 25 L19 22 L9 23 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
      {/* ear */}
      <path
        d="M11 7 L13 4 L15 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
      {/* eye */}
      <circle cx="8" cy="16" r="1.1" fill="currentColor" />
      {/* muzzle line */}
      <path
        d="M3 18 L8 19"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
