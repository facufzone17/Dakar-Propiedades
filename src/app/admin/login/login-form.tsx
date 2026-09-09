"use client";

import { useActionState } from "react";
import { BotonPrimario } from "@/components/admin/ui";
import { iniciarSesion } from "../actions";

export function LoginForm({ next }: { next: string }) {
  const [estado, accion, pendiente] = useActionState(iniciarSesion, null);

  return (
    <form action={accion} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next} />

      <label className="block">
        <span className="text-sm font-semibold text-muted">Usuario</span>
        <input
          name="usuario"
          autoComplete="username"
          required
          defaultValue="admin"
          className="mt-1.5 min-h-[48px] w-full rounded-brand border border-line bg-white px-3.5 text-[15px] focus-visible:outline-offset-2"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-muted">Contraseña</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1.5 min-h-[48px] w-full rounded-brand border border-line bg-white px-3.5 text-[15px] focus-visible:outline-offset-2"
        />
      </label>

      {estado?.error && (
        <p className="rounded-brand bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-inset ring-red-600/20">
          {estado.error}
        </p>
      )}

      <BotonPrimario type="submit" disabled={pendiente} className="w-full">
        {pendiente ? "Entrando…" : "Entrar"}
      </BotonPrimario>
    </form>
  );
}
