"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AgentCard from "../components/AgentCard";
import ClientCard from "../components/ClientCard";
import AgentChart from "../components/AgentChart";
import ClientChart from "../components/ClientChart";
import ClientStatusChart from "../components/ClientStatusChart";

export default function DashboardPage() {
  const [agents, setAgents] = useState([]);
  const [clients, setClients] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const agentFilter = searchParams.get("status") || "";
  const waitTimeFilter = searchParams.get("waitTime") || "";
  const clientStatusFilter = searchParams.get("clientStatus") || "";

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      let filteredAgents = data.agents;
      let filteredClients = data.clients;

      if (agentFilter) {
        filteredAgents = filteredAgents.filter(a => a.status === agentFilter);
      }

      if (waitTimeFilter) {
        filteredClients = filteredClients.filter((c) => {
          if (waitTimeFilter === "0-5 min") return parseInt(c.waitTime) <= 5;
          if (waitTimeFilter === "5-10 min") return parseInt(c.waitTime) > 5 && parseInt(c.waitTime) <= 10;
          if (waitTimeFilter === "10+ min") return parseInt(c.waitTime) > 10;
          return true;
        });
      }

      if (clientStatusFilter) {
        filteredClients = filteredClients.filter((c) => c.status === clientStatusFilter);
      }

      setAgents(filteredAgents);
      setClients(filteredClients);
    };

    return () => ws.close();
  }, [agentFilter, waitTimeFilter, clientStatusFilter]);

  // Funciones para actualizar los filtros en la URL
  const updateFilter = (param, value) => {
    const query = new URLSearchParams({
      status: param === "status" ? value : agentFilter,
      waitTime: param === "waitTime" ? value : waitTimeFilter,
      clientStatus: param === "clientStatus" ? value : clientStatusFilter,
    }).toString();

    router.push(`/dashboard?${query}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Vista General</h1>

      {/* Layout 50/50 para Agentes y Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Columna de Agentes */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Agentes</h2>

          {/* Filtros de Agentes */}
          <div className="mb-4">
            <select className="p-2 border rounded w-full" onChange={(e) => updateFilter("status", e.target.value)} value={agentFilter}>
              <option value="">Todos</option>
              <option value="Disponible">Disponible</option>
              <option value="En llamada">En llamada</option>
              <option value="Pausa">Pausa</option>
            </select>
          </div>

          {/* Lista de Agentes */}
          <ul className="space-y-4 max-h-96 overflow-y-auto border p-2 rounded-lg shadow-inner">
            {agents.map((agent) => <AgentCard key={agent.id} agent={agent} />)}
          </ul>

          {/* Gráfico de Agentes */}
          <div className="mt-6">
            <AgentChart agents={agents} />
          </div>
        </div>

        {/* Columna de Clientes */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Clientes</h2>

          {/* Filtros de Clientes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <select className="p-2 border rounded w-full" onChange={(e) => updateFilter("waitTime", e.target.value)} value={waitTimeFilter}>
              <option value="">Tiempo de Espera: Todos</option>
              <option value="0-5 min">0-5 min</option>
              <option value="5-10 min">5-10 min</option>
              <option value="10+ min">10+ min</option>
            </select>

            <select className="p-2 border rounded w-full" onChange={(e) => updateFilter("clientStatus", e.target.value)} value={clientStatusFilter}>
              <option value="">Estado: Todos</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Atendiendo">Atendiendo</option>
              <option value="Atendido">Atendido</option>
              <option value="Finalizando">Finalizando</option>
            </select>
          </div>

          {/* Lista de Clientes */}
          <ul className="space-y-4 max-h-96 overflow-y-auto border p-2 rounded-lg shadow-inner">
            {clients.map((client) => <ClientCard key={client.id} client={client} />)}
          </ul>

          {/* Gráficos de Clientes */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ClientChart clients={clients} />
            <ClientStatusChart clients={clients} />
          </div>
        </div>
      </div>
    </div>
  );
}
