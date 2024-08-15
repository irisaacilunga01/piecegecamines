import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
import { Commande, Piece } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;
  const { rows: nomarticles } = await sql<{
    numarticle: number;
    nomarticle: string;
  }>`SELECT numarticle,nomarticle from piece`;
  const { rows: nomdemandeurs } = await sql<{
    nummatricule: number;
    nomdemandeur: string;
  }>`SELECT nummatricule,nomdemandeur from demandeur`;
  const { rows } =
    await sql<Commande>`SELECT * from commande where numbon=${idCl}`;
  const {

  } = rows[0];

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      Formulaire modifier un détail sur la commande
      </h2>
      <Formulaire
     
      />
    </div>
  );
}

export default Page;
