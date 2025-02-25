export async function GET() {
  const agents = [
    { id: 1, name: "Carlos Pérez", status: "Disponible", waitTime: "0 min" },
    { id: 2, name: "Ana Gómez", status: "En llamada", waitTime: "5 min" },
    { id: 3, name: "Luis Martínez", status: "Pausa", waitTime: "10 min" },
  ];

  return Response.json(agents);
}
