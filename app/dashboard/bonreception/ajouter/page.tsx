import React from "react";
import { Formulaire } from "../form";
import { sql } from "@vercel/postgres";
async function Page() {
  const { rows: nomarticles } = await sql<{
    numarticle: number;
    nomarticle: string;
  }>`SELECT numarticle,nomarticle from piece`;
  const { rows: nomsfourni } = await sql<{
    idfour: number;
    nomfournisseur: string;
  }>`SELECT idfour,nomfournisseur from fournisseur`;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter une bon de reception
      </h2>
      <Formulaire fournisseurs={nomsfourni} nomarticles={nomarticles} />
    </div>
  );
}

export default Page;
