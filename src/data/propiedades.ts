/**
 * Cartera real de Dakar Propiedades.
 *
 * Origen: su página de anunciante en Argenprop (20 avisos activos) + la ficha
 * individual de cada aviso. Precios, direcciones, metros, amenities y textos son
 * los que Dakar publicó: no hay nada inventado ni de relleno (brief regla 4).
 * Las descripciones van tal cual las escribieron, con sus mayúsculas y sus typos.
 *
 * DEDUPLICADO: Dakar publica 20 avisos, pero 2 son republicaciones del mismo
 * inmueble con otro barrio y el mismo precio — se confirmó porque comparten la
 * carpeta de fotos en el servidor de Argenprop:
 *   · Cabello 3900 P8 → "Palermo" (19386282) y "Palermo Chico" (20116849)
 *   · La Pampa 700    → "Belgrano Chico" (8922305) y "Belgrano" (8507110)
 * Quedan 18 propiedades reales. Se descartaron 20116849 y 8507110.
 *
 * La forma de `Propiedad` es 1:1 con la futura tabla de Supabase.
 */

export type Operacion = "venta" | "alquiler";
export type TipoPropiedad = "Departamento" | "PH" | "Local" | "Galpón" | "Quinta";

export type Propiedad = {
  id: string;
  operacion: Operacion;
  tipo: TipoPropiedad;
  direccion: string;
  barrio: string;
  /** Partido/provincia cuando no es CABA. */
  zona: string;
  precio: number;
  moneda: "USD" | "ARS";
  expensas: number | null;
  ambientes: number | null;
  dormitorios: number | null;
  banos: number | null;
  cocheras: number | null;
  m2Cubiertos: number | null;
  m2Terreno: number | null;
  antiguedad: number | null;
  descripcion: string;
  amenities: string[];
  fotos: string[];
  fuenteUrl: string;
  destacada: boolean;
};

const AP = "https://www.argenprop.com";

export const PROPIEDADES: Propiedad[] = [
  {
    id: "20192603",
    operacion: "venta",
    tipo: "Departamento",
    direccion: "3 de Febrero 2800",
    barrio: "Belgrano",
    zona: "CABA",
    precio: 198000,
    moneda: "USD",
    expensas: 320000,
    ambientes: 3,
    dormitorios: 2,
    banos: 2,
    cocheras: null,
    m2Cubiertos: 80,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "DEPARTAMENTO DE 3 AMB. AL FRTE 2 BAÑOS EXCELENTE ESTADO IMPECABLE DORM. EN SUITE C.VESTIDOR PATIO COCINA COMODA EQUIPADA LOSA RADIANTE MUY LUMINOSO VTA DIRECTA CONSULTE",
    amenities: ["Balcón", "Suite", "Vestidor", "Patio", "Lavadero", "Ascensor", "Calefacción", "Gas natural", "Muebles de cocina"],
    fotos: ["/propiedades/20192603/1.jpg", "/propiedades/20192603/2.jpg", "/propiedades/20192603/3.jpg", "/propiedades/20192603/4.jpg", "/propiedades/20192603/5.jpg", "/propiedades/20192603/6.jpg"],
    fuenteUrl: `${AP}/departamento-en-venta-en-belgrano-3-ambientes--20192603`,
    destacada: true,
  },
  {
    id: "19386282",
    operacion: "venta",
    tipo: "Departamento",
    direccion: "Cabello 3900, piso 8",
    barrio: "Palermo",
    zona: "CABA",
    precio: 128000,
    moneda: "USD",
    expensas: 150000,
    ambientes: 3,
    dormitorios: 2,
    banos: 1,
    cocheras: null,
    m2Cubiertos: null,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "Buen Departamento Muy Luminoso, Excelente ubicación- Dormitorios c/ Placar propiedad desocupada venta directa Consulte Dakar Propiedades",
    amenities: ["Balcón"],
    fotos: ["/propiedades/19386282/1.jpg", "/propiedades/19386282/2.jpg", "/propiedades/19386282/3.jpg", "/propiedades/19386282/4.jpg", "/propiedades/19386282/5.jpg", "/propiedades/19386282/6.jpg"],
    fuenteUrl: `${AP}/departamento-en-venta-en-palermo-3-ambientes--19386282`,
    destacada: false,
  },
  {
    id: "16362610",
    operacion: "alquiler",
    tipo: "Departamento",
    direccion: "Terrada 1800, piso 5",
    barrio: "Villa del Parque",
    zona: "CABA",
    precio: 750000,
    moneda: "ARS",
    expensas: 160000,
    ambientes: 2,
    dormitorios: 1,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 40,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "EXCELENTE DEPARTAMENTO DE 2 AMBIENTES ALFRENTE CON BALCON SEMIPISO MUY LUMINOSO Y AIREADO A UNA CUADRA DE AV NAZCA Y A 2 DE ALVAREZ JONTE CONSULTE DAKAR",
    amenities: ["Balcón", "Cocina separada", "Living comedor", "Ascensor", "Gas natural", "Muebles de cocina", "Termotanque"],
    fotos: ["/propiedades/16362610/1.jpg", "/propiedades/16362610/2.jpg", "/propiedades/16362610/3.jpg", "/propiedades/16362610/4.jpg", "/propiedades/16362610/5.jpg", "/propiedades/16362610/6.jpg"],
    fuenteUrl: `${AP}/departamento-en-alquiler-en-villa-del-parque-2-ambientes--16362610`,
    destacada: true,
  },
  {
    id: "20192615",
    operacion: "venta",
    tipo: "Departamento",
    direccion: "Teniente General Juan Domingo Perón 2100, PB",
    barrio: "Balvanera",
    zona: "CABA",
    precio: 65000,
    moneda: "USD",
    expensas: 120000,
    ambientes: 2,
    dormitorios: 1,
    banos: 2,
    cocheras: null,
    m2Cubiertos: 36,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "MUY BUEN DEPTO PLANTA BAJA APTO PROFESIONAL 2 BAÑOS LUMINOSO PATIO LAVADERO LUGAR DE GUARDADO CONSULTE",
    amenities: ["Apto profesional", "Patio", "Lavadero", "Planta baja"],
    fotos: ["/propiedades/20192615/1.jpg", "/propiedades/20192615/2.jpg", "/propiedades/20192615/3.jpg", "/propiedades/20192615/4.jpg", "/propiedades/20192615/5.jpg", "/propiedades/20192615/6.jpg"],
    fuenteUrl: `${AP}/departamento-en-venta-en-balvanera-2-ambientes--20192615`,
    destacada: false,
  },
  {
    id: "15254852",
    operacion: "alquiler",
    tipo: "Departamento",
    direccion: "Av. Juan Bautista Alberdi 2900, piso 7",
    barrio: "Flores",
    zona: "CABA",
    precio: 550000,
    moneda: "ARS",
    expensas: 160000,
    ambientes: 1,
    dormitorios: null,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 33,
    m2Terreno: null,
    antiguedad: 8,
    descripcion:
      "EXCELENTE DEPARTAMENTO DE 1 AMBIENTE FRENTE BALCÓN MUY LUMINOSO AMPLIO AIRE ACONDICIONADO CONSULTE DAKAR PROPIEDADES",
    amenities: ["Balcón", "Aire acondicionado central", "Ascensor", "Frente"],
    fotos: ["/propiedades/15254852/1.jpg", "/propiedades/15254852/2.jpg", "/propiedades/15254852/3.jpg", "/propiedades/15254852/4.jpg", "/propiedades/15254852/5.jpg", "/propiedades/15254852/6.jpg"],
    fuenteUrl: `${AP}/departamento-en-alquiler-en-flores-1-ambiente--15254852`,
    destacada: false,
  },
  {
    id: "16400078",
    operacion: "alquiler",
    tipo: "Departamento",
    direccion: "Nahuel Huapi 4900, piso 1",
    barrio: "Villa Urquiza",
    zona: "CABA",
    precio: 680000,
    moneda: "ARS",
    expensas: 160000,
    ambientes: 1,
    dormitorios: null,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 36,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "Muy buen departamento amplio Excelente Estado con SUM sin pileta super luminoso y aireado todo impecable A/ Acondicionado",
    amenities: ["Balcón corrido", "SUM", "Aire acondicionado", "Vista ciudad", "Contrafrente"],
    fotos: ["/propiedades/16400078/1.jpg", "/propiedades/16400078/2.jpg", "/propiedades/16400078/3.jpg", "/propiedades/16400078/4.jpg", "/propiedades/16400078/5.jpg", "/propiedades/16400078/6.jpg"],
    fuenteUrl: `${AP}/departamento-en-alquiler-en-villa-urquiza-1-ambiente--16400078`,
    destacada: false,
  },
  {
    id: "12780065",
    operacion: "venta",
    tipo: "PH",
    direccion: "Mariano Acosta 1300, PB",
    barrio: "Flores Sur",
    zona: "CABA",
    precio: 50000,
    moneda: "USD",
    expensas: null,
    ambientes: 2.5,
    dormitorios: 2,
    banos: 1,
    cocheras: null,
    m2Cubiertos: null,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "DEPARTAMENTO PLANTA BAJA 2 HABITACIONES COCINA BAÑO PATIO TODO EN PLANTA BAJA OPORTUNIDAD. DAKAR",
    amenities: ["Patio", "Planta baja", "Apto crédito"],
    fotos: ["/propiedades/12780065/1.jpg", "/propiedades/12780065/2.jpg", "/propiedades/12780065/3.jpg", "/propiedades/12780065/4.jpg", "/propiedades/12780065/5.jpg", "/propiedades/12780065/6.jpg"],
    fuenteUrl: `${AP}/ph-en-venta-en-flores-sur--12780065`,
    destacada: false,
  },
  {
    id: "15838966",
    operacion: "venta",
    tipo: "Departamento",
    direccion: "Esmeralda 900",
    barrio: "Microcentro",
    zona: "CABA",
    precio: 78000,
    moneda: "USD",
    expensas: null,
    ambientes: 1,
    dormitorios: 1,
    banos: null,
    cocheras: null,
    m2Cubiertos: null,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "EXCELENTE DEPARTAMENTO PARA INVERSIÓN PLENO MICRO CENTRO ESMERALDA Y PARAGUAY TODO EQUIPADO EXCELENTE ESTADO CONSULTE",
    amenities: ["Totalmente equipado", "Apto crédito", "Ideal inversión"],
    fotos: ["/propiedades/15838966/1.jpg", "/propiedades/15838966/2.jpg", "/propiedades/15838966/3.jpg", "/propiedades/15838966/4.jpg", "/propiedades/15838966/5.jpg", "/propiedades/15838966/6.jpg"],
    fuenteUrl: `${AP}/departamento-en-venta-en-microcentro-1-ambiente--15838966`,
    destacada: false,
  },
  {
    id: "10909089",
    operacion: "venta",
    tipo: "PH",
    direccion: "3 de Febrero 500, PB",
    barrio: "Villa Sarmiento",
    zona: "Ramos Mejía, GBA",
    precio: 123000,
    moneda: "USD",
    expensas: null,
    ambientes: 5,
    dormitorios: 4,
    banos: 2,
    cocheras: null,
    m2Cubiertos: 110,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "2 DEPARTAMENTOS TIPO CASA PLANTA BAJA Y PLANTA ALTA - PATIO Y BALCÓN TERRAZA GRANDE DOS COCINAS BAÑOS IDEAL 2 FAMILIAS CONSULTE OPORTUNIDAD",
    amenities: ["Patio", "Terraza", "2 cocinas", "Ideal 2 familias", "Apto crédito"],
    fotos: ["/propiedades/10909089/1.jpg", "/propiedades/10909089/2.jpg", "/propiedades/10909089/3.jpg", "/propiedades/10909089/4.jpg", "/propiedades/10909089/5.jpg", "/propiedades/10909089/6.jpg"],
    fuenteUrl: `${AP}/ph-en-venta-en-villa-sarmiento-5-ambientes--10909089`,
    destacada: false,
  },
  {
    id: "19665261",
    operacion: "alquiler",
    tipo: "Departamento",
    direccion: "Av. Francisco Beiró 4800",
    barrio: "Villa Real",
    zona: "CABA",
    precio: 2600000,
    moneda: "ARS",
    expensas: 150000,
    ambientes: 3,
    dormitorios: 2,
    banos: 2,
    cocheras: 1,
    m2Cubiertos: null,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "EXCELENTE DEPARTAMENTO DE 3 AMB. 2 BAÑOS A ESTRENAR CON PATIO CON PARRILLA EXCELENTE",
    amenities: ["A estrenar", "Patio", "Parrilla", "Cochera"],
    fotos: ["/propiedades/19665261/1.jpg", "/propiedades/19665261/2.jpg", "/propiedades/19665261/3.jpg", "/propiedades/19665261/4.jpg", "/propiedades/19665261/5.jpg", "/propiedades/19665261/6.jpg"],
    fuenteUrl: `${AP}/departamento-en-alquiler-en-villa-real-3-ambientes--19665261`,
    destacada: true,
  },
  {
    id: "16267744",
    operacion: "venta",
    tipo: "Departamento",
    direccion: "Av. Olivera 100",
    barrio: "Floresta",
    zona: "CABA",
    precio: 72000,
    moneda: "USD",
    expensas: null,
    ambientes: 1,
    dormitorios: null,
    banos: 1,
    cocheras: null,
    m2Cubiertos: null,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "EXCELENTE DEPARTAMENTO A ESTRENAR AL FRENTE BALCÓN CORRIDO A/AC IMPECABLE MATERIALES DE PRIMERA- CONSULTE DAKAR PROPIEDADES",
    amenities: ["A estrenar", "Balcón corrido", "Aire acondicionado", "Frente", "Apto crédito"],
    fotos: ["/propiedades/16267744/1.jpg", "/propiedades/16267744/2.jpg", "/propiedades/16267744/3.jpg", "/propiedades/16267744/4.jpg", "/propiedades/16267744/5.jpg", "/propiedades/16267744/6.jpg"],
    fuenteUrl: `${AP}/departamento-en-venta-en-floresta-1-ambiente--16267744`,
    destacada: false,
  },
  {
    id: "16200750",
    operacion: "venta",
    tipo: "Local",
    direccion: "Av. Álvarez Jonte 2700",
    barrio: "Villa del Parque",
    zona: "CABA",
    precio: 83000,
    moneda: "USD",
    expensas: 110000,
    ambientes: null,
    dormitorios: null,
    banos: null,
    cocheras: null,
    m2Cubiertos: 30,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "EXCELENTE LOCAL VARIOS RUBREOS SOBRE AVENIDA EDIFICIO NUEVO A ESTRENAR CONSULTE",
    amenities: ["A estrenar", "Sobre avenida", "Vía pública", "En edificio"],
    fotos: ["/propiedades/16200750/1.jpg", "/propiedades/16200750/2.jpg", "/propiedades/16200750/3.jpg", "/propiedades/16200750/4.jpg", "/propiedades/16200750/5.jpg", "/propiedades/16200750/6.jpg"],
    fuenteUrl: `${AP}/local-en-venta-en-villa-del-parque--16200750`,
    destacada: false,
  },
  {
    id: "12959385",
    operacion: "venta",
    tipo: "Quinta",
    direccion: "Talcahuano 2300",
    barrio: "Paso del Rey",
    zona: "Moreno, GBA",
    precio: 150000,
    moneda: "USD",
    expensas: null,
    ambientes: null,
    dormitorios: 2,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 85,
    m2Terreno: 800,
    antiguedad: 1,
    descripcion: "excelente casa nueva con parque quincho consulte",
    amenities: ["Quincho", "Parque", "Lote 20 x 40", "Apto crédito"],
    fotos: ["/propiedades/12959385/1.jpg", "/propiedades/12959385/2.jpg", "/propiedades/12959385/3.jpg", "/propiedades/12959385/4.jpg", "/propiedades/12959385/5.jpg", "/propiedades/12959385/6.jpg"],
    fuenteUrl: `${AP}/quinta-en-venta-en-paso-del-rey--12959385`,
    destacada: true,
  },
  {
    id: "8922305",
    operacion: "venta",
    tipo: "Departamento",
    direccion: "La Pampa 700, piso 1",
    barrio: "Belgrano Chico",
    zona: "CABA",
    precio: 220000,
    moneda: "USD",
    expensas: null,
    ambientes: 1,
    dormitorios: null,
    banos: null,
    cocheras: null,
    m2Cubiertos: 51,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "EXCELENTE AMBIENTE FRENTE BALCÓN CORRIDO IMPECABLE VISTA NUEVO A/A A UN PASO DE HERMOSOS PARQUES CONSULTE MÁS DETALLES A DAKAR PROPIEDADES",
    amenities: ["Balcón", "Pileta", "Gimnasio", "Solárium", "Salón de fiestas", "Laundry", "Seguridad", "Vigilancia"],
    fotos: ["/propiedades/8922305/1.jpg", "/propiedades/8922305/2.jpg", "/propiedades/8922305/3.jpg", "/propiedades/8922305/4.jpg", "/propiedades/8922305/5.jpg", "/propiedades/8922305/6.jpg"],
    fuenteUrl: `${AP}/departamento-en-venta-en-belgrano-chico-1-ambiente--8922305`,
    destacada: true,
  },
  {
    id: "8009568",
    operacion: "venta",
    tipo: "Departamento",
    direccion: "Alejandro Magariños Cervantes 1800, piso 5",
    barrio: "Paternal",
    zona: "CABA",
    precio: 110000,
    moneda: "USD",
    expensas: null,
    ambientes: 2,
    dormitorios: 1,
    banos: 1,
    cocheras: 1,
    m2Cubiertos: 40,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "EXCELENTE DEPARTAMENTO. MUY LUMINOSO CON LAVADERO BALCÓN BAÑO COMPLETO DORMITORIO CON PLACAR COCINA EQUIPADA CON COCHERA FIJA CONSULTE",
    amenities: ["Balcón", "Lavadero", "Cochera fija", "Cocina equipada", "Apto crédito"],
    fotos: ["/propiedades/8009568/1.jpg", "/propiedades/8009568/2.jpg", "/propiedades/8009568/3.jpg", "/propiedades/8009568/4.jpg", "/propiedades/8009568/5.jpg", "/propiedades/8009568/6.jpg"],
    fuenteUrl: `${AP}/departamento-en-venta-en-paternal--8009568`,
    destacada: false,
  },
  {
    id: "18041174",
    operacion: "venta",
    tipo: "Departamento",
    direccion: "Bolivia 400, piso 17",
    barrio: "Flores",
    zona: "CABA",
    precio: 115000,
    moneda: "USD",
    expensas: 160000,
    ambientes: 4,
    dormitorios: 3,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 84,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "EXCELENTE DEPTO MUY AMPLIO 3 DORMITORIOS CON PLACAR, BAÑO COMPLETO TOILETTE MUY LUMINOSO A/ ACONDICIONADO VENTILADOR DE TECHO COCINA COMEDOR EQUIPADA LAVADERO EXCELENTE UBICACION CONSULTE DAKAR PROPIEDADES",
    amenities: ["Toilette", "Aire acondicionado", "Lavadero", "Cocina comedor equipada", "Contrafrente"],
    fotos: ["/propiedades/18041174/1.jpg", "/propiedades/18041174/2.jpg", "/propiedades/18041174/3.jpg", "/propiedades/18041174/4.jpg", "/propiedades/18041174/5.jpg", "/propiedades/18041174/6.jpg"],
    fuenteUrl: `${AP}/departamento-en-venta-en-flores-4-ambientes--18041174`,
    destacada: true,
  },
  {
    id: "17444454",
    operacion: "venta",
    tipo: "Galpón",
    direccion: "Chacras de Nogolí",
    barrio: "Juan Martín de Pueyrredón",
    zona: "San Luis",
    precio: 950000,
    moneda: "USD",
    expensas: null,
    ambientes: null,
    dormitorios: null,
    banos: null,
    cocheras: null,
    m2Cubiertos: null,
    m2Terreno: null,
    antiguedad: null,
    descripcion:
      "EXCELENTE CAMPO EN SAN LUIS - PREPARADO PARA COUNTRY CHACRAS DE NOGOLI CALLES PREPARADO PARA VENTA. CONSULTE DAKAR PROPIEDADES",
    amenities: ["Preparado para country", "Calles abiertas"],
    fotos: ["/propiedades/17444454/1.jpg"],
    fuenteUrl: `${AP}/galpon-en-venta-en-san-luis--17444454`,
    destacada: false,
  },
  {
    id: "19008415",
    operacion: "venta",
    tipo: "Galpón",
    direccion: "Joaquín V. González 2700",
    barrio: "Villa del Parque",
    zona: "CABA",
    precio: 960000,
    moneda: "USD",
    expensas: null,
    ambientes: null,
    dormitorios: null,
    banos: 2,
    cocheras: null,
    m2Cubiertos: 430,
    m2Terreno: null,
    antiguedad: 40,
    descripcion: "EXCELENTE GALPON DOBLE FRENTE. 17,30 m de frente por 30 m de fondo.",
    amenities: ["Doble frente", "2 oficinas", "Portón corredizo", "Agua corriente", "Electricidad", "Fuerza motriz"],
    fotos: ["/propiedades/19008415/1.jpg"],
    fuenteUrl: `${AP}/galpon-en-venta-en-villa-del-parque--19008415`,
    destacada: false,
  },
];

/* ---------------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------------- */

/** Título compuesto a partir de datos reales, sin inventar copy. */
export function tituloDe(p: Propiedad): string {
  if (p.ambientes === 1) return `${p.tipo} monoambiente en ${p.barrio}`;
  if (p.ambientes) {
    const amb = Number.isInteger(p.ambientes) ? p.ambientes : p.ambientes.toString().replace(".", ",");
    return `${p.tipo} ${amb} ambientes en ${p.barrio}`;
  }
  if (p.dormitorios) return `${p.tipo} ${p.dormitorios} dormitorios en ${p.barrio}`;
  return `${p.tipo} en ${p.barrio}`;
}

export function formatearPrecio(p: Pick<Propiedad, "precio" | "moneda">): string {
  const n = new Intl.NumberFormat("es-AR").format(p.precio);
  return p.moneda === "USD" ? `USD ${n}` : `$ ${n}`;
}

export function formatearExpensas(p: Propiedad): string | null {
  return p.expensas ? `+ $ ${new Intl.NumberFormat("es-AR").format(p.expensas)} expensas` : null;
}

export function propiedadPorId(id: string): Propiedad | undefined {
  return PROPIEDADES.find((p) => p.id === id);
}

export function destacadas(): Propiedad[] {
  return PROPIEDADES.filter((p) => p.destacada);
}

/** Tipos que existen de verdad para una operación dada. */
export function tiposPorOperacion(operacion: Operacion): TipoPropiedad[] {
  const tipos = PROPIEDADES.filter((p) => p.operacion === operacion).map((p) => p.tipo);
  return [...new Set(tipos)].sort((a, b) => a.localeCompare(b, "es"));
}

/** Barrios que existen de verdad para una operación dada. */
export function barriosPorOperacion(operacion: Operacion): string[] {
  const barrios = PROPIEDADES.filter((p) => p.operacion === operacion).map((p) => p.barrio);
  return [...new Set(barrios)].sort((a, b) => a.localeCompare(b, "es"));
}

export type Filtros = {
  operacion?: string;
  tipo?: string;
  barrio?: string;
  precioMax?: string;
  ambientes?: string;
};

export function filtrar(f: Filtros): Propiedad[] {
  return PROPIEDADES.filter((p) => {
    if (f.operacion && p.operacion !== f.operacion) return false;
    if (f.tipo && p.tipo !== f.tipo) return false;
    if (f.barrio && p.barrio !== f.barrio) return false;
    if (f.ambientes) {
      const min = Number(f.ambientes);
      if (!p.ambientes || p.ambientes < min) return false;
    }
    if (f.precioMax) {
      // El filtro de precio solo se ofrece con una operación elegida, porque toda
      // la cartera de venta está en USD y toda la de alquiler en ARS. Sin operación
      // elegida, comparar un número contra las dos monedas no significaría nada.
      const max = Number(f.precioMax);
      if (Number.isFinite(max) && p.precio > max) return false;
    }
    return true;
  });
}

/** Rangos de precio reales, calculados sobre la cartera de cada operación. */
export function rangosPrecio(operacion: Operacion): { valor: number; label: string }[] {
  const fmt = (n: number) => new Intl.NumberFormat("es-AR").format(n);
  const moneda = operacion === "venta" ? "USD" : "$";
  const cortes =
    operacion === "venta"
      ? [75000, 100000, 150000, 250000, 1000000]
      : [600000, 800000, 1500000, 3000000];
  return cortes.map((valor) => ({ valor, label: `Hasta ${moneda} ${fmt(valor)}` }));
}
