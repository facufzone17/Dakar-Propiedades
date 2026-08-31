import Image from "next/image";
import heroEdificios from "@/assets/hero-edificios.jpg";
import { obtenerTextos } from "@/lib/textos";
import { HeroSearch } from "./hero-search";

export async function Hero() {
  const textos = await obtenerTextos();

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col bg-bg">
      {/*
        La foto corta antes del borde inferior de la sección: así la tarjeta queda
        montada sobre el filo, mitad sobre la foto y mitad sobre el blanco, como en
        Realtab — pero sin que se le vaya la mitad de abajo fuera de pantalla.
      */}
      <div className="absolute inset-x-0 top-0 bottom-32 -z-10 overflow-hidden lg:bottom-24">
        <Image
          src={heroEdificios}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={65}
          placeholder="blur"
          className="object-cover object-bottom lg:object-center"
        />

        {/*
          Scrim medido contra la foto real: el cielo da 5.7:1 con texto blanco en la
          franja de arriba, pero baja a 3.73:1 sobre las nubes claras del horizonte.
          Con este gradiente el peor punto queda por encima de 5.5:1 — AA para
          cualquier tamaño — sin apagar la foto en la zona de los edificios.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(23,23,23,0.45)_0%,rgba(23,23,23,0.28)_45%,rgba(23,23,23,0.10)_70%,rgba(23,23,23,0)_100%)]"
        />
      </div>

      {/* pb-24 en mobile: deja libre la esquina donde vive el WhatsApp flotante,
          para que no se monte sobre el botón del buscador */}
      <div className="on-dark mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 pb-24 pt-32 lg:px-10 lg:pb-10 lg:pt-40">
        <div className="flex-1">
          <h1 className="max-w-[13ch] text-h1 font-semibold tracking-[-0.02em] text-balance text-white">
            {textos.home_hero_titulo}
          </h1>
          <p className="mt-6 max-w-[38ch] text-lg font-medium text-white/90 lg:text-xl">
            Inmobiliaria en Av. Francisco Beiró, Villa Devoto.
          </p>
        </div>

        <div className="relative z-10 mt-12 max-w-[1080px] lg:mt-16">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
