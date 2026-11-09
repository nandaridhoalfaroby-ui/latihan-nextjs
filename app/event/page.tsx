// app/event/page.tsx
import { events } from "@/data/events";
import KatalogInteraktif from "@/components/KatalogInteraktif";

export default function Katalog() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-black tracking-tight text-zinc-900">Katalog Event</h1>
      <KatalogInteraktif events={events} />
    </div>
  );
}