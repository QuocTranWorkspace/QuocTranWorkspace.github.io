import { ColdOpen } from "@/chapters/00-cold-open";
import { Origin } from "@/chapters/01-origin";
import { Crossover } from "@/chapters/02-crossover";
import { LeadArc } from "@/chapters/03-lead-arc";
import { AIBoxCloseup } from "@/chapters/04-aibox-closeup";
import { Mnemo } from "@/chapters/05-mnemo";
import { Skills } from "@/chapters/06-skills";
import { Coda } from "@/chapters/07-coda";

export default function HomePage() {
  return (
    <main id="main-content">
      <ColdOpen />
      <Origin />
      <Crossover />
      <LeadArc />
      <AIBoxCloseup />
      <Mnemo />
      <Skills />
      <Coda />
    </main>
  );
}
