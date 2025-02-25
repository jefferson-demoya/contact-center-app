"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ClientChart({ clients }) {
  const timeCategories = { "0-5 min": 0, "5-10 min": 0, "10+ min": 0 };

  clients.forEach(client => {
    const waitTime = parseInt(client.waitTime);
    if (waitTime <= 5) timeCategories["0-5 min"]++;
    else if (waitTime <= 10) timeCategories["5-10 min"]++;
    else timeCategories["10+ min"]++;
  });

  const data = {
    labels: Object.keys(timeCategories),
    datasets: [
      {
        label: "Clientes por Tiempo de Espera",
        data: Object.values(timeCategories),
        backgroundColor: ["#60A5FA", "#FBBF24", "#F87171"], 
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Tiempo de Espera de los Clientes</h2>
      <Pie data={data} />
    </div>
  );
}
