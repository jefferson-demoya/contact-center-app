"use client"; 

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AgentCard from "../components/AgentCard";

export default function AgentsPage() {
  // almacenar la lista de agentes
  const [agents, setAgents] = useState([]);

  // obtener parámetros de búsqueda
  const searchParams = useSearchParams();
  const router = useRouter();

  const filter = searchParams.get("status") || "";

  // conectarse al servidor WebSocket
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001"); 

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data); // parsear a js
      setAgents(filter ? data.agents.filter(a => a.status === filter) : data.agents);
    };

    return () => ws.close(); // Cierra  WebSocket c
  }, [filter]); 

  const handleFilterChange = (event) => {
    const value = event.target.value;
    router.push(value ? `/agents?status=${value}` : "/agents"); 
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de Agentes</h1>

      {/*  filtrar agentes */}
      <select className="mb-4 p-2 border rounded" onChange={handleFilterChange} value={filter}>
        <option value="">Todos</option>
        <option value="Disponible">Disponible</option>
        <option value="En llamada">En llamada</option>
        <option value="Pausa">Pausa</option>
      </select>

      {/* Lista de agentes */}
      <ul className="space-y-4 max-h-96 overflow-y-auto border p-2 rounded-lg shadow-inner">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} /> 
        ))}
      </ul>
    </div>
  );
}
