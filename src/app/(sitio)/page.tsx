import { CtaTasacion } from "@/components/cta-tasacion";
import { Destacadas } from "@/components/destacadas";
import { FranjaConfianza } from "@/components/franja-confianza";
import { Hero } from "@/components/hero";
import { PorQueDakar } from "@/components/por-que-dakar";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <FranjaConfianza />
      <Destacadas />
      <PorQueDakar />
      <CtaTasacion />
    </>
  );
}
