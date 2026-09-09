/**
 * `template` (no `layout`) se re-monta en cada navegación: sirve para un fade
 * suave al cambiar de página. Solo opacidad, sin transform, para no mover el
 * layout ni afectar el CLS.
 */
export default function SitioTemplate({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
