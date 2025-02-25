export default function ClientCard({ client }) {
  // Colores según el estado
  const statusColors = {
    Nuevo: "bg-blue-200 text-blue-800",
    Atendiendo: "bg-yellow-200 text-yellow-800",
    Atendido: "bg-green-200 text-green-800",
    Finalizando: "bg-red-200 text-red-800",
  };

  return (
    <li className="border p-4 rounded-lg shadow-md bg-white">
      <p className="text-lg font-bold">{client.name}</p>
      <p className="text-gray-600">Tiempo de espera: {client.waitTime}</p>
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[client.status]}`}>
        {client.status}
      </span>
    </li>
  );
}
