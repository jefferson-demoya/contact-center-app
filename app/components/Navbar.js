import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="hover:underline">
          <h1 className="text-xl font-bold">Contact Center</h1>
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/agents" className="hover:underline">Agentes</Link>
          </li>
          <li>
            <Link href="/clients" className="hover:underline">Clientes</Link>
          </li>
          <li>
            <Link href="/dashboard" className="hover:underline">Vista General</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
