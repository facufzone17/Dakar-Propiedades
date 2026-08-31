import { Card } from "@/components/admin/ui";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Ingresar — Panel Dakar",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="w-full">
      <div className="mb-6 flex items-baseline gap-1.5">
        <span className="text-xl font-semibold tracking-tight">Dakar</span>
        <span className="text-muted">Panel</span>
      </div>
      <Card>
        <h1 className="text-lg font-semibold tracking-tight">Ingresar al panel</h1>
        <p className="mt-1 text-sm text-muted">
          Gestión de propiedades y métricas de Dakar Propiedades.
        </p>
        <LoginForm next={next ?? "/admin"} />
      </Card>
    </div>
  );
}
