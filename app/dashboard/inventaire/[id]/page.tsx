import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
import { Inventaire } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Inventaire>`SELECT * from inventaire where idventaire=${idCl}`;
  const { dateinv, idventaire } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un inventaire
      </h2>
      <Formulaire dateinv={dateinv} idventaire={Number(idventaire)} />
    </div>
  );
}

export default Page;
