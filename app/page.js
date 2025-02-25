"use client"; 

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      <div className="bg-white text-gray-900 p-10 rounded-lg shadow-lg text-center w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Prueba Técnica - Visual Contact</h1>
        
        <h2 className="text-2xl font-semibold mb-6">por: Jefersson De moya</h2>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition"
          onClick={() => router.push("/dashboard")}
        >
          Ir al Dashboard
        </button>
      </div>
    </div>
  );
}
