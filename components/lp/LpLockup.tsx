import Image from "next/image";
import Logo from "@/components/ui/Logo";

/** Proporção do ficheiro original do lockup (612 × 173). */
const RATIO = 612 / 173;

/**
 * O lockup da vertical. Quando existe o ficheiro oficial usa-se esse; as
 * verticais que ainda não têm um caem no lockup tipográfico do componente
 * Logo, que compõe o mesmo desenho com as fontes da marca.
 */
export default function LpLockup({
  name,
  src,
  height,
  className = "",
}: {
  name: string;
  src?: string;
  /** altura em px do lockup desenhado */
  height: number;
  className?: string;
}) {
  if (!src) {
    return <Logo size={height >= 44 ? "lg" : "md"} subtitle={name} className={className} />;
  }
  return (
    <Image
      src={src}
      alt={`PARDUS. ${name}`}
      width={Math.round(height * RATIO)}
      height={height}
      priority
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
