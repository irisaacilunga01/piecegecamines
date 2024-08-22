import React from "react";
import { Formulaire } from "../form";
import { sql } from "@vercel/postgres";

async function Page() {
  const { rows: nommagasins } = await sql<{
    nummagasin: number;
    nommagasin: string;
  }>`SELECT nummagasin,nommagasin from magasindestinataire`;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter une commande magasin
      </h2>
      <Formulaire nommagasins={nommagasins} />
    </div>
  );
}

export default Page;
