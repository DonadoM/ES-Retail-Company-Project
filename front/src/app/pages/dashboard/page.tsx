import React from "react";
import Dashboard from "@/components/dashboard/dashboard";

export const metadata = {
  title: "Dashboard | Tu Empresa",
  description:
    "Panel de control para gestionar productos, clientes, pedidos, cadena de suministro y promociones.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#222831]">
      <Dashboard />
    </div>
  );
}
