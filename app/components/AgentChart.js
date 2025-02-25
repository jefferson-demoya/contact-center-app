"use client";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AgentChart({ agents }) {
  const [selectedStatus, setSelectedStatus] = useState(""); // Filtro por estado
  const [minCount, setMinCount] = useState(0); // Filtro por cantidad mínima

  // Colores por estado
  const statusColors = {
    Disponible: "#34D399", // Verde
    "En llamada": "#FBBF24", // Amarillo
    Pausa: "#F87171", // Rojo
  };

  // Contar cuántos agentes hay 
  const statusCounts = agents.reduce((acc, agent) => {
    acc[agent.status] = (acc[agent.status] || 0) + 1;
    return acc;
  }, {});

  // Filtrar por estado 
  let filteredCounts = { ...statusCounts };
  if (selectedStatus) {
    filteredCounts = { [selectedStatus]: statusCounts[selectedStatus] || 0 };
  }

  // Filtrar por cantidad mínima 
  filteredCounts = Object.fromEntries(
    Object.entries(filteredCounts).filter(([_, count]) => count >= minCount)
  );

  // Obtener los colores dinámicos segun filtro
  const backgroundColors = Object.keys(filteredCounts).map(status => statusColors[status]);

  // Configuración gráfico
  const data = {
    labels: Object.keys(filteredCounts),
    datasets: [
      {
        label: "Agentes por Estado",
        data: Object.values(filteredCounts),
        backgroundColor: backgroundColors, //  Colores dinámicos 
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Estado de los Agentes</h2>

      {/* Controles de filtro */}
      <div className="flex space-x-4 mb-4">
        {/* Filtro */}
        <select
          className="p-2 border rounded"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Disponible">Disponible</option>
          <option value="En llamada">En llamada</option>
          <option value="Pausa">Pausa</option>
        </select>

        {/* Filtro por cantidad mínima */}
        <input
          type="number"
          className="p-2 border rounded w-24"
          placeholder="Min. agentes"
          value={minCount}
          onChange={(e) => setMinCount(Number(e.target.value))}
        />
      </div>

      {/* Gráfico */}
      <Bar data={data} />
    </div>
  );
}
