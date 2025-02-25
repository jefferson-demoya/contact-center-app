const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });

let agents = [
    { id: 1, name: "Jefersson De moya", status: "Disponible" },
    { id: 2, name: "Ana Gómez", status: "En llamada" },
    { id: 3, name: "Maria Martínez", status: "Pausa" },
    { id: 4, name: "Angel De Perez", status: "En llamada" },
    { id: 5, name: "Andres Montoya", status: "Pausa" },
    { id: 6, name: "Lucas Méndez", status: "En llamada" },
    { id: 7, name: "Valeria Soto", status: "En llamada" },
    { id: 8, name: "Emilia Rojas", status: "Pausa" },
    { id: 9, name: "Diego Fernández", status: "Pausa" },
    { id: 10, name: "Sofía Herrera", status: "Disponible" },
    { id: 11, name: "Mateo González", status: "Pausa" },
    { id: 12, name: "Camila Vargas", status: "En llamada" },
    { id: 13, name: "Javier Ramírez", status: "En llamada" },
    { id: 14, name: "Natalia Pérez", status: "Pausa" },
    { id: 15, name: "Andrés Castillo", status: "Disponible" }
  // { id: 6, name: "Rachel Rosas", status: "Pausa", waitTime: "0 min" },
];

let clients = [];
let clientIdCounter = 1;

// Agrega un nuevo cliente con un ID único y lo coloca en la lista
function generateClient() {
  clients.push({
    id: clientIdCounter++,
    name: `Cliente ${clientIdCounter - 1}`,
    waitTime: `${Math.floor(Math.random() * 15)} min`,
    status: "Nuevo",
  });

  // Mantener el límite de clientes en la lista (máximo 10)
  if (clients.length > 10) {
    clients.shift();
  }

  updateClientStatuses();
}

// Ajusta el estado de los clientes según su posición en la cola
function updateClientStatuses() {
  const totalClients = clients.length;

  clients.forEach((client, index) => {
    if (index >= totalClients - 3) {
      client.status = "Nuevo";
    } else if (index >= totalClients - 6) {
      client.status = "Atendiendo";
    } else if (index >= totalClients - 9) {
      client.status = "Atendido";
    }

    if (index === 0) {
      client.status = "Finalizando";
    }
  });
}

// Cambia el estado de un agente aleatoriamente
function updateAgentStatus() {
  const possibleStatuses = ["Disponible", "En llamada", "Pausa"];

  agents.forEach(agent => {
    const randomIndex = Math.floor(Math.random() * possibleStatuses.length);
    agent.status = possibleStatuses[randomIndex];
  });

  sendUpdates();

  // Programar la próxima actualización en un tiempo aleatorio entre 10 y 30 segundos
  const randomTime = Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;
  setTimeout(updateAgentStatus, randomTime);
}

// Envía la lista actualizada de agentes y clientes a todos los clientes conectados
function sendUpdates() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ agents, clients }));
    }
  });
}

// Genera clientes en intervalos aleatorios entre 5 y 20 segundos
function startClientGeneration() {
  generateClient();
  sendUpdates();

  const randomTime = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
  setTimeout(startClientGeneration, randomTime);
}

// Maneja nuevas conexiones WebSocket
wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  ws.send(JSON.stringify({ agents, clients }));

  ws.on("close", () => console.log("Cliente desconectado"));
});

// Iniciar la generación de clientes y actualización de agentes
startClientGeneration();
updateAgentStatus();

console.log("Servidor WebSocket corriendo en ws://localhost:3001");
