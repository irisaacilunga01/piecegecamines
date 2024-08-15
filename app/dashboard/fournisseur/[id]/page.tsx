import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
import { Fournisseur } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Fournisseur>`SELECT * from fournisseur where idfour=${idCl}`;
  const {
    avenue,
    commune,
    email,
    idfour,
    nomfournisseur,
    num,
    pays,
    province,
    tel,
    ville,
  } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un fournisseur
      </h2>
      <Formulaire
        avenue={avenue}
        commune={commune}
        email={email}
        idfour={Number(idfour)}
        nomfournisseur={nomfournisseur}
        num={num}
        pays={pays}
        province={province}
        tel={tel}
        ville={ville}
      />
    </div>
  );
}

export default Page;
