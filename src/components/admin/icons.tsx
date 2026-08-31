type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconResumen = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="5" rx="1.5" />
    <rect x="13" y="11" width="8" height="10" rx="1.5" />
    <rect x="3" y="14" width="8" height="7" rx="1.5" />
  </svg>
);

export const IconPropiedades = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M3 21h18M5 21V8l7-5 7 5v13" />
    <path d="M9 21v-6h6v6" />
  </svg>
);

export const IconSalir = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </svg>
);

export const IconMas = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconBuscar = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const IconBasura = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 7h16M10 11v6M14 11v6M5 7l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13M9 7V4h6v3" />
  </svg>
);

export const IconPausa = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M10 4H7v16h3zM17 4h-3v16h3z" />
  </svg>
);

export const IconPlay = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 4l14 8-14 8z" />
  </svg>
);

export const IconCheck = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m5 13 4 4L19 7" />
  </svg>
);

export const IconArriba = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

export const IconAbajo = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

export const IconFlechaArribaDerecha = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
