import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
import { Demandeur, Magasindestinataire } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Magasindestinataire>`SELECT * from magasindestinataire where nummagasin=${idCl}`;
  const { nummagasin, nommagasin } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un magasin
      </h2>
      <Formulaire nommagasin={nommagasin} nummagasin={Number(nummagasin)} />
    </div>
  );
}

export default Page;
