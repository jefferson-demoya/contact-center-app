export async function GET() {
    const clients = [
      { id: 1, name: "María López", waitTime: "2 min" },
      { id: 2, name: "Juan Torres", waitTime: "7 min" },
      { id: 3, name: "Pedro Sánchez", waitTime: "12 min" },
    ];
  
    return Response.json(clients);
  }
  