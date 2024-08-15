import React from "react";
import { DataTable } from "./dataTable";
import { ModeToggle } from "@/components/toggletheme";
import { users as rows } from "@/lib/data";

export default async function Page() {
  //   const { rows } = await sql<Personnel>`SELECT * from personnel`;
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page Gérer Utilisateur
        </h2>
        <ModeToggle />
      </header>
      <main>
        <DataTable data={rows} />
      </main>
    </div>
  );
}
