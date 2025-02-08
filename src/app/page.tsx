import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";

export default function Home() {
  return (
    <main className="flex bg-offwhite h-screen">
      <Sidebar />
      <Navbar />
      <Table/>
    </main>
  );
}
