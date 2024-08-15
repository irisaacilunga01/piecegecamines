import React from "react";
import { Formulaire } from "../form";
import { sql } from "@vercel/postgres";

async function Page() {
  const { rows: nomarticles } = await sql<{
    numarticle: number;
    nomarticle: string;
  }>`SELECT numarticle,nomarticle from piece`;
  const { rows: nomdemandeurs } = await sql<{
    nummatricule: number;
    nomdemandeur: string;
  }>`SELECT nummatricule,nomdemandeur from demandeur`;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter une commande demandeur
      </h2>
      <Formulaire nomarticles={nomarticles} nomdemandeurs={nomdemandeurs} />
    </div>
  );
}

export default Page;
