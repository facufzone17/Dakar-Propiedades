import { CtaTasacion } from "@/components/cta-tasacion";
import { Destacadas } from "@/components/destacadas";
import { FranjaConfianza } from "@/components/franja-confianza";
import { Hero } from "@/components/hero";
import { PorQueNosotros } from "@/components/por-que-nosotros";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <FranjaConfianza />
      <Destacadas />
      <PorQueNosotros />
      <CtaTasacion />
    </>
  );
}
