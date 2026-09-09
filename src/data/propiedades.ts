/**
 * Catálogo de DEMO — 18 propiedades ficticias.
 *
 * Nada de esto es real: direcciones inventadas (calles reales de la zona oeste +
 * altura al azar, sin identificar ningún inmueble), precios y specs coherentes
 * pero de relleno, descripciones genéricas. Las fotos son de stock libre
 * (Unsplash / Pexels, uso comercial sin atribución) reutilizadas entre avisos.
 *
 * Cuando una inmobiliaria adopta el template, carga sus propiedades reales por
 * el panel (Supabase) o reemplaza este array.
 *
 * La forma de `Propiedad` es 1:1 con la tabla `propiedades` de Supabase.
 */

export type Operacion = "venta" | "alquiler";
/**
 * El tipo es texto libre: el panel sugiere los de `TIPOS_PROPIEDAD`, pero el
 * dueño puede escribir otro (por ej. "Casa") al cargar una propiedad.
 */
export type TipoPropiedad = string;

/**
 * Estado de publicación (lo gestiona el panel).
 *  · activa   → visible en el sitio
 *  · pausada  → fuera del sitio, se puede reactivar
 *  · vendida  → cerrada; fuera del sitio pero cuenta para métricas
 */
export type EstadoPropiedad = "activa" | "pausada" | "vendida";

/** Tipos sugeridos en el panel. La lista no es cerrada: se puede cargar otro. */
export const TIPOS_PROPIEDAD: string[] = [
  "Departamento",
  "PH",
  "Local",
  "Galpón",
  "Quinta",
];

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
  /** Link al aviso de origen. Opcional: el catálogo de demo no lo trae. */
  fuenteUrl?: string;
  destacada: boolean;
  /** Presentes cuando la propiedad viene de Supabase (no del seed estático). */
  estado?: EstadoPropiedad;
  creadaEn?: string;
  cerradaEn?: string | null;
};

export const PROPIEDADES: Propiedad[] = [
  {
    id: "depto-devoto-01",
    operacion: "venta",
    tipo: "Departamento",
    direccion: "Nueva York 3800, piso 4",
    barrio: "Villa Devoto",
    zona: "CABA",
    precio: 179000,
    moneda: "USD",
    expensas: 95000,
    ambientes: 3,
    dormitorios: 2,
    banos: 2,
    cocheras: 1,
    m2Cubiertos: 78,
    m2Terreno: null,
    antiguedad: 12,
    descripcion:
      "Departamento de 3 ambientes al frente, muy luminoso, con balcón corrido. Living comedor amplio, cocina con muebles y lavadero independiente. Dormitorio en suite y segundo dormitorio con placard. Cochera cubierta en el edificio. A pocas cuadras de la plaza y del subte B.",
    amenities: ["Balcón", "Suite", "Lavadero", "Cochera", "Ascensor", "Gas natural", "Muebles de cocina"],
    fotos: ["/propiedades/depto-devoto-01/1.jpg", "/propiedades/depto-devoto-01/2.jpg", "/propiedades/depto-devoto-01/3.jpg", "/propiedades/depto-devoto-01/4.jpg", "/propiedades/depto-devoto-01/5.jpg"],
    destacada: true,
  },
  {
    id: "depto-villa-del-parque-02",
    operacion: "alquiler",
    tipo: "Departamento",
    direccion: "Marcos Sastre 2900, piso 2",
    barrio: "Villa del Parque",
    zona: "CABA",
    precio: 620000,
    moneda: "ARS",
    expensas: 110000,
    ambientes: 2,
    dormitorios: 1,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 44,
    m2Terreno: null,
    antiguedad: 20,
    descripcion:
      "Dos ambientes al frente con balcón, muy buena distribución. Cocina separada con espacio para mesa, dormitorio con placard y baño completo con ventana. Edificio con ascensor a media cuadra de la estación de tren y de Av. Nazca.",
    amenities: ["Balcón", "Cocina separada", "Living comedor", "Ascensor", "Gas natural", "Frente"],
    fotos: ["/propiedades/depto-villa-del-parque-02/1.jpg", "/propiedades/depto-villa-del-parque-02/2.jpg", "/propiedades/depto-villa-del-parque-02/3.jpg", "/propiedades/depto-villa-del-parque-02/4.jpg", "/propiedades/depto-villa-del-parque-02/5.jpg"],
    destacada: true,
  },
  {
    id: "depto-monte-castro-03",
    operacion: "venta",
    tipo: "Departamento",
    direccion: "Baigorria 4200, piso 1",
    barrio: "Monte Castro",
    zona: "CABA",
    precio: 112000,
    moneda: "USD",
    expensas: 68000,
    ambientes: 2,
    dormitorios: 1,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 46,
    m2Terreno: null,
    antiguedad: 35,
    descripcion:
      "Departamento de 2 ambientes en excelente estado, contrafrente muy silencioso y luminoso. Piso de parquet, cocina equipada y balcón con lavadero. Apto crédito. Bajas expensas.",
    amenities: ["Balcón", "Lavadero", "Ascensor", "Apto crédito", "Gas natural", "Contrafrente"],
    fotos: ["/propiedades/depto-monte-castro-03/1.jpg", "/propiedades/depto-monte-castro-03/2.jpg", "/propiedades/depto-monte-castro-03/3.jpg", "/propiedades/depto-monte-castro-03/4.jpg", "/propiedades/depto-monte-castro-03/5.jpg"],
    destacada: false,
  },
  {
    id: "ph-floresta-04",
    operacion: "venta",
    tipo: "PH",
    direccion: "Bahía Blanca 1500",
    barrio: "Floresta",
    zona: "CABA",
    precio: 168000,
    moneda: "USD",
    expensas: null,
    ambientes: 4,
    dormitorios: 3,
    banos: 2,
    cocheras: null,
    m2Cubiertos: 95,
    m2Terreno: 120,
    antiguedad: 55,
    descripcion:
      "PH al frente sin expensas, tipo casa, con patio y terraza propia. Planta baja con living comedor, cocina y toilette; en la planta alta tres dormitorios y baño completo. Muy buena entrada de luz. Ideal familia.",
    amenities: ["Patio", "Terraza", "Sin expensas", "Lavadero", "Parrilla", "Gas natural"],
    fotos: ["/propiedades/ph-floresta-04/1.jpg", "/propiedades/ph-floresta-04/2.jpg", "/propiedades/ph-floresta-04/3.jpg", "/propiedades/ph-floresta-04/4.jpg", "/propiedades/ph-floresta-04/5.jpg"],
    destacada: true,
  },
  {
    id: "mono-villa-real-05",
    operacion: "alquiler",
    tipo: "Departamento",
    direccion: "Lascano 5900, piso 3",
    barrio: "Villa Real",
    zona: "CABA",
    precio: 390000,
    moneda: "ARS",
    expensas: 70000,
    ambientes: 1,
    dormitorios: null,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 32,
    m2Terreno: null,
    antiguedad: 15,
    descripcion:
      "Monoambiente amplio y luminoso al frente, con balcón. Cocina integrada con muebles, placard empotrado y aire acondicionado frío/calor. Edificio con ascensor sobre el límite con Versalles.",
    amenities: ["Balcón", "Aire acondicionado", "Ascensor", "Frente", "Muebles de cocina"],
    fotos: ["/propiedades/mono-villa-real-05/1.jpg", "/propiedades/mono-villa-real-05/2.jpg", "/propiedades/mono-villa-real-05/3.jpg", "/propiedades/mono-villa-real-05/4.jpg"],
    destacada: false,
  },
  {
    id: "depto-agronomia-06",
    operacion: "venta",
    tipo: "Departamento",
    direccion: "Tinogasta 3300, piso 6",
    barrio: "Agronomía",
    zona: "CABA",
    precio: 155000,
    moneda: "USD",
    expensas: 105000,
    ambientes: 3,
    dormitorios: 2,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 65,
    m2Terreno: null,
    antiguedad: 8,
    descripcion:
      "Tres ambientes a estrenar con vista abierta al parque. Ambientes integrados, pisos de porcelanato, cocina con isla y balcón aterrazado. Edificio con laundry y terraza con parrilla. Excelente ubicación frente a espacios verdes.",
    amenities: ["Balcón", "Terraza", "Parrilla", "Laundry", "Ascensor", "Vista abierta"],
    fotos: ["/propiedades/depto-agronomia-06/1.jpg", "/propiedades/depto-agronomia-06/2.jpg", "/propiedades/depto-agronomia-06/3.jpg", "/propiedades/depto-agronomia-06/4.jpg", "/propiedades/depto-agronomia-06/5.jpg"],
    destacada: false,
  },
  {
    id: "depto-villa-pueyrredon-07",
    operacion: "alquiler",
    tipo: "Departamento",
    direccion: "Mosconi 3600, piso 5",
    barrio: "Villa Pueyrredón",
    zona: "CABA",
    precio: 720000,
    moneda: "ARS",
    expensas: 135000,
    ambientes: 2,
    dormitorios: 1,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 48,
    m2Terreno: null,
    antiguedad: 6,
    descripcion:
      "Departamento de 2 ambientes moderno, semipiso al contrafrente. Cocina integrada equipada, dormitorio con placard y balcón con visuales despejadas. Edificio con seguridad y ascensor. A metros de Av. Mosconi.",
    amenities: ["Balcón", "Seguridad", "Ascensor", "Muebles de cocina", "Contrafrente"],
    fotos: ["/propiedades/depto-villa-pueyrredon-07/1.jpg", "/propiedades/depto-villa-pueyrredon-07/2.jpg", "/propiedades/depto-villa-pueyrredon-07/3.jpg", "/propiedades/depto-villa-pueyrredon-07/4.jpg", "/propiedades/depto-villa-pueyrredon-07/5.jpg"],
    destacada: false,
  },
  {
    id: "ph-villa-santa-rita-08",
    operacion: "venta",
    tipo: "PH",
    direccion: "Condarco 2400",
    barrio: "Villa Santa Rita",
    zona: "CABA",
    precio: 139000,
    moneda: "USD",
    expensas: 25000,
    ambientes: 3,
    dormitorios: 2,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 62,
    m2Terreno: null,
    antiguedad: 45,
    descripcion:
      "PH en primer piso por escalera, tipo dúplex, muy luminoso y con bajas expensas. Living comedor con balcón, cocina independiente, dos dormitorios y patio en la planta superior. Zona tranquila y bien conectada.",
    amenities: ["Balcón", "Patio", "Cocina separada", "Lavadero", "Bajas expensas"],
    fotos: ["/propiedades/ph-villa-santa-rita-08/1.jpg", "/propiedades/ph-villa-santa-rita-08/2.jpg", "/propiedades/ph-villa-santa-rita-08/3.jpg", "/propiedades/ph-villa-santa-rita-08/4.jpg", "/propiedades/ph-villa-santa-rita-08/5.jpg"],
    destacada: true,
  },
  {
    id: "local-villa-del-parque-09",
    operacion: "venta",
    tipo: "Local",
    direccion: "Av. San Martín 5400",
    barrio: "Villa del Parque",
    zona: "CABA",
    precio: 145000,
    moneda: "USD",
    expensas: null,
    ambientes: null,
    dormitorios: null,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 70,
    m2Terreno: null,
    antiguedad: 40,
    descripcion:
      "Local a la calle sobre avenida de alto tránsito peatonal y vehicular. Salón principal, depósito en entrepiso y baño. Excelente vidriera. Ideal comercio o local de servicios. Entrega inmediata.",
    amenities: ["A la calle", "Entrepiso", "Vidriera", "Sobre avenida"],
    fotos: ["/propiedades/local-villa-del-parque-09/1.jpg", "/propiedades/local-villa-del-parque-09/2.jpg", "/propiedades/local-villa-del-parque-09/3.jpg"],
    destacada: false,
  },
  {
    id: "depto-ramos-mejia-10",
    operacion: "venta",
    tipo: "Departamento",
    direccion: "Rosales 200, piso 2",
    barrio: "Ramos Mejía",
    zona: "La Matanza, Buenos Aires",
    precio: 98000,
    moneda: "USD",
    expensas: 55000,
    ambientes: 2,
    dormitorios: 1,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 50,
    m2Terreno: null,
    antiguedad: 28,
    descripcion:
      "Departamento de 2 ambientes a una cuadra de la estación de Ramos Mejía y del centro comercial. Living con balcón, cocina con lavadero y dormitorio amplio con placard. Apto profesional.",
    amenities: ["Balcón", "Lavadero", "Ascensor", "Apto profesional", "Gas natural"],
    fotos: ["/propiedades/depto-ramos-mejia-10/1.jpg", "/propiedades/depto-ramos-mejia-10/2.jpg", "/propiedades/depto-ramos-mejia-10/3.jpg", "/propiedades/depto-ramos-mejia-10/4.jpg", "/propiedades/depto-ramos-mejia-10/5.jpg"],
    destacada: false,
  },
  {
    id: "casa-castelar-11",
    operacion: "venta",
    tipo: "Casa",
    direccion: "Los Álamos 1200",
    barrio: "Castelar",
    zona: "Morón, Buenos Aires",
    precio: 235000,
    moneda: "USD",
    expensas: null,
    ambientes: 5,
    dormitorios: 3,
    banos: 2,
    cocheras: 2,
    m2Cubiertos: 160,
    m2Terreno: 300,
    antiguedad: 25,
    descripcion:
      "Casa en dos plantas sobre lote propio, en zona residencial arbolada de Castelar Norte. Living comedor con hogar a leña, cocina con office, tres dormitorios (uno en suite), quincho con parrilla y jardín con fondo verde. Cochera para dos autos.",
    amenities: ["Jardín", "Parrilla", "Quincho", "Suite", "Cochera", "Hogar a leña", "Lavadero"],
    fotos: ["/propiedades/casa-castelar-11/1.jpg", "/propiedades/casa-castelar-11/2.jpg", "/propiedades/casa-castelar-11/3.jpg", "/propiedades/casa-castelar-11/4.jpg", "/propiedades/casa-castelar-11/5.jpg"],
    destacada: false,
  },
  {
    id: "depto-caseros-12",
    operacion: "alquiler",
    tipo: "Departamento",
    direccion: "Lisandro de la Torre 3100, piso 4",
    barrio: "Caseros",
    zona: "Tres de Febrero, Buenos Aires",
    precio: 540000,
    moneda: "ARS",
    expensas: 90000,
    ambientes: 3,
    dormitorios: 2,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 60,
    m2Terreno: null,
    antiguedad: 18,
    descripcion:
      "Tres ambientes al frente con balcón, luminoso y bien distribuido. Cocina con lavadero incorporado, dos dormitorios con placard y baño completo. A metros de la estación Caseros y de la Av. San Martín.",
    amenities: ["Balcón", "Lavadero", "Ascensor", "Frente", "Gas natural"],
    fotos: ["/propiedades/depto-caseros-12/1.jpg", "/propiedades/depto-caseros-12/2.jpg", "/propiedades/depto-caseros-12/3.jpg", "/propiedades/depto-caseros-12/4.jpg", "/propiedades/depto-caseros-12/5.jpg"],
    destacada: false,
  },
  {
    id: "depto-moron-13",
    operacion: "alquiler",
    tipo: "Departamento",
    direccion: "Brown 800, piso 7",
    barrio: "Morón",
    zona: "Morón, Buenos Aires",
    precio: 460000,
    moneda: "ARS",
    expensas: 85000,
    ambientes: 2,
    dormitorios: 1,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 42,
    m2Terreno: null,
    antiguedad: 22,
    descripcion:
      "Departamento de 2 ambientes en piso alto con vista despejada, contrafrente muy silencioso. Cocina separada, dormitorio con placard y balcón. Edificio con encargado permanente, a tres cuadras de la peatonal de Morón.",
    amenities: ["Balcón", "Encargado", "Ascensor", "Cocina separada", "Contrafrente"],
    fotos: ["/propiedades/depto-moron-13/1.jpg", "/propiedades/depto-moron-13/2.jpg", "/propiedades/depto-moron-13/3.jpg", "/propiedades/depto-moron-13/4.jpg", "/propiedades/depto-moron-13/5.jpg"],
    destacada: false,
  },
  {
    id: "ph-haedo-14",
    operacion: "venta",
    tipo: "PH",
    direccion: "Rivadavia 15400",
    barrio: "Haedo",
    zona: "Morón, Buenos Aires",
    precio: 126000,
    moneda: "USD",
    expensas: null,
    ambientes: 3,
    dormitorios: 2,
    banos: 1,
    cocheras: 1,
    m2Cubiertos: 72,
    m2Terreno: 90,
    antiguedad: 50,
    descripcion:
      "PH al fondo, muy reciclado, sin expensas y con cochera. Living comedor amplio, cocina nueva, dos dormitorios y patio con parrilla. Entrada independiente. A pocas cuadras de la estación de Haedo.",
    amenities: ["Patio", "Parrilla", "Cochera", "Sin expensas", "Entrada independiente", "Reciclado"],
    fotos: ["/propiedades/ph-haedo-14/1.jpg", "/propiedades/ph-haedo-14/2.jpg", "/propiedades/ph-haedo-14/3.jpg", "/propiedades/ph-haedo-14/4.jpg", "/propiedades/ph-haedo-14/5.jpg"],
    destacada: false,
  },
  {
    id: "galpon-ciudadela-15",
    operacion: "venta",
    tipo: "Galpón",
    direccion: "Gaona 3900",
    barrio: "Ciudadela",
    zona: "Tres de Febrero, Buenos Aires",
    precio: 185000,
    moneda: "USD",
    expensas: null,
    ambientes: null,
    dormitorios: null,
    banos: 2,
    cocheras: null,
    m2Cubiertos: 380,
    m2Terreno: 450,
    antiguedad: 30,
    descripcion:
      "Galpón sobre lote propio con 12 metros de frente. Nave principal con altura libre de 6 metros, portón de acceso para camión, dos oficinas, baños y entrepiso de depósito. Trifásica instalada. Ideal logística o producción.",
    amenities: ["Portón camión", "Entrepiso", "Oficinas", "Trifásica", "Altura libre 6 m"],
    fotos: ["/propiedades/galpon-ciudadela-15/1.jpg", "/propiedades/galpon-ciudadela-15/2.jpg", "/propiedades/galpon-ciudadela-15/3.jpg"],
    destacada: false,
  },
  {
    id: "galpon-santos-lugares-16",
    operacion: "alquiler",
    tipo: "Galpón",
    direccion: "Matheu 2600",
    barrio: "Santos Lugares",
    zona: "Tres de Febrero, Buenos Aires",
    precio: 1250000,
    moneda: "ARS",
    expensas: null,
    ambientes: null,
    dormitorios: null,
    banos: 1,
    cocheras: null,
    m2Cubiertos: 210,
    m2Terreno: 240,
    antiguedad: 35,
    descripcion:
      "Galpón para depósito con oficina al frente y baño. Piso de hormigón llaneado, buena ventilación y portón corredizo. A dos cuadras de la estación y con acceso rápido a Camino de Cintura.",
    amenities: ["Portón corredizo", "Oficina", "Piso de hormigón", "Ventilación"],
    fotos: ["/propiedades/galpon-santos-lugares-16/1.jpg", "/propiedades/galpon-santos-lugares-16/2.jpg", "/propiedades/galpon-santos-lugares-16/3.jpg"],
    destacada: false,
  },
  {
    id: "quinta-paso-del-rey-17",
    operacion: "venta",
    tipo: "Quinta",
    direccion: "Los Aromos 500",
    barrio: "Paso del Rey",
    zona: "Moreno, Buenos Aires",
    precio: 162000,
    moneda: "USD",
    expensas: null,
    ambientes: 4,
    dormitorios: 3,
    banos: 2,
    cocheras: 3,
    m2Cubiertos: 130,
    m2Terreno: 1000,
    antiguedad: 20,
    descripcion:
      "Quinta sobre lote de 1000 m² con pileta, parque parquizado y arboleda añosa. Casa principal de tres dormitorios, galería con parrilla, quincho cerrado y cochera para tres autos. Perforación propia. Ideal fin de semana o vivienda permanente.",
    amenities: ["Pileta", "Parque", "Parrilla", "Quincho", "Cochera", "Perforación", "Galería"],
    fotos: ["/propiedades/quinta-paso-del-rey-17/1.jpg", "/propiedades/quinta-paso-del-rey-17/2.jpg", "/propiedades/quinta-paso-del-rey-17/3.jpg", "/propiedades/quinta-paso-del-rey-17/4.jpg", "/propiedades/quinta-paso-del-rey-17/5.jpg"],
    destacada: true,
  },
  {
    id: "campo-san-luis-18",
    operacion: "venta",
    tipo: "Campo",
    direccion: "Ruta Provincial 9, km 12",
    barrio: "Nogolí",
    zona: "Belgrano, San Luis",
    precio: 92000,
    moneda: "USD",
    expensas: null,
    ambientes: null,
    dormitorios: null,
    banos: null,
    cocheras: null,
    m2Cubiertos: null,
    m2Terreno: 240000,
    antiguedad: null,
    descripcion:
      "Fracción de campo de 24 hectáreas al pie de la sierra, con acceso por camino consolidado. Loteado preliminar apto emprendimiento de chacras. Vistas panorámicas, tendido eléctrico sobre la ruta y buena disponibilidad de agua. Escritura al día.",
    amenities: ["Vista a la sierra", "Acceso consolidado", "Electricidad sobre ruta", "Apto loteo"],
    fotos: ["/propiedades/campo-san-luis-18/1.jpg", "/propiedades/campo-san-luis-18/2.jpg", "/propiedades/campo-san-luis-18/3.jpg", "/propiedades/campo-san-luis-18/4.jpg"],
    destacada: false,
  },
];

/* ---------------------------------------------------------------------------
   Helpers
   --------------------------------------------------------------------------- */

/** Título compuesto a partir de los datos de la propiedad. */
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
