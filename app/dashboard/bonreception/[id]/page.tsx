import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
import { Bonreception } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Bonreception>`SELECT * from bonreception where id=${idCl}`;
  const {
    dateReceptionMarchandise,
    datereception,
    id,
    idfour,
    litigeeventuel,
    numarticle,
    numcommande,
    numlivr,
    ps,
    quantitecommandee,
    quantiterecues,
  } = rows[0];
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
        Formulaire modifier stock
      </h2>
      <Formulaire
        dateReceptionMarchandise={dateReceptionMarchandise}
        datereception={datereception}
        fournisseurs={nomsfourni}
        nomarticles={nomarticles}
        id={Number(id)}
        idfour={Number(idfour)}
        litigeeventuel={litigeeventuel}
        numarticle={Number(numarticle)}
        numcommande={numcommande}
        numlivr={numlivr}
        ps={ps}
        quantitecommandee={quantitecommandee}
        quantiterecues={quantiterecues}
      />
    </div>
  );
}

export default Page;
