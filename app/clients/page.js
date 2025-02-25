"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ClientCard from "../components/ClientCard";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const waitTimeFilter = searchParams.get("waitTime") || "";
  const statusFilter = searchParams.get("status") || "";

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      let filteredClients = data.clients;

      // Filtrar por tiempo de espera
      if (waitTimeFilter) {
        filteredClients = filteredClients.filter((c) => {
          if (waitTimeFilter === "0-5 min") return parseInt(c.waitTime) <= 5;
          if (waitTimeFilter === "5-10 min") return parseInt(c.waitTime) > 5 && parseInt(c.waitTime) <= 10;
          if (waitTimeFilter === "10+ min") return parseInt(c.waitTime) > 10;
          return true;
        });
      }

      // Filtrar por estado
      if (statusFilter) {
        filteredClients = filteredClients.filter((c) => c.status === statusFilter);
      }

      setClients(filteredClients);
    };

    return () => ws.close();
  }, [waitTimeFilter, statusFilter]);

  const handleWaitTimeChange = (event) => {
    const value = event.target.value;
    router.push(value ? `/clients?waitTime=${value}&status=${statusFilter}` : `/clients?status=${statusFilter}`);
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    router.push(value ? `/clients?waitTime=${waitTimeFilter}&status=${value}` : `/clients?waitTime=${waitTimeFilter}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de Clientes en Espera</h1>

      <div className="flex space-x-4 mb-4">
        {/* tiempo de espera */}
        <select className="p-2 border rounded" onChange={handleWaitTimeChange} value={waitTimeFilter}>
          <option value="">Tiempo de Espera: Todos</option>
          <option value="0-5 min">0-5 min</option>
          <option value="5-10 min">5-10 min</option>
          <option value="10+ min">10+ min</option>
        </select>

        {/* estado */}
        <select className="p-2 border rounded" onChange={handleStatusChange} value={statusFilter}>
          <option value="">Estado: Todos</option>
          <option value="Nuevo">Nuevo</option>
          <option value="Atendiendo">Atendiendo</option>
          <option value="Atendido">Atendido</option>
          <option value="Finalizando">Finalizando</option>
        </select>
      </div>

      <ul className="space-y-4 max-h-96 overflow-y-auto border p-2 rounded-lg shadow-inner">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </ul>

    </div>
  );
}
