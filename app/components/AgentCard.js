export default function AgentCard({ agent }) {
  const statusColors = {
    Disponible: "bg-green-200 text-green-800",
    "En llamada": "bg-yellow-200 text-yellow-800",
    Pausa: "bg-red-200 text-red-800",
  };

  return (
    // agente y estado 
    <li className="border p-4 rounded-lg shadow-md bg-white flex justify-between items-center">
      <span className="text-lg font-bold">{agent.name}</span>
      <span className={`px-3 py-1 rounded-full text-sm font-semibold text-center min-w-[120px] ${statusColors[agent.status]}`}>
        {agent.status}
      </span>
    </li>
  );
}
