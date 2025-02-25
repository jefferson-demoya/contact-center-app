"use client";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ClientStatusChart({ clients }) {
  const [selectedStatus, setSelectedStatus] = useState(""); // Filtro por estado
  const [minCount, setMinCount] = useState(0); 

  const statusColors = {
    Nuevo: "#34D399", 
    Atendiendo: "#FBBF24", 
    Atendido: "#60A5FA", 
    Finalizando: "#F87171", 
  };

  const statusCounts = clients.reduce((acc, client) => {
    acc[client.status] = (acc[client.status] || 0) + 1;
    return acc;
  }, {});

  let filteredCounts = { ...statusCounts };
  if (selectedStatus) {
    filteredCounts = { [selectedStatus]: statusCounts[selectedStatus] || 0 };
  }

  // Filtrar por cantidad mínima de clientes
  filteredCounts = Object.fromEntries(
    Object.entries(filteredCounts).filter(([_, count]) => count >= minCount)
  );

  // Obtener  colores dinámicos según  estados 
  const backgroundColors = Object.keys(filteredCounts).map(status => statusColors[status]);

  // Config graf
  const data = {
    labels: Object.keys(filteredCounts),
    datasets: [
      {
        label: "Clientes por Estado",
        data: Object.values(filteredCounts),
        backgroundColor: backgroundColors, // Colores dinámicos 
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Estado de los Clientes</h2>

      {/* Controles de filtro */}
      <div className="flex space-x-4 mb-4">
        {/* Filtro por estado */}
        {/* <select
          className="p-2 border rounded w-full"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Nuevo">Nuevo</option>
          <option value="Atendiendo">Atendiendo</option>
          <option value="Atendido">Atendido</option>
          <option value="Finalizando">Finalizando</option>
        </select> */}

      </div>

      {/* Gráfico */}
      <Pie data={data} />
    </div>
  );
}
