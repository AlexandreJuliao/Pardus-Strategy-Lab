import ServiceDetail from "@/components/sections/ServiceDetail";
import { SERVICES } from "@/lib/services";

export default function ServicesList() {
  return (
    <div>
      {SERVICES.map((s, i) => (
        <ServiceDetail key={s.slug} service={s} index={i} />
      ))}
    </div>
  );
}
