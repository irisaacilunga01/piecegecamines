import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
import { Piece } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Piece>`SELECT * from piece where numarticle=${idCl}`;
  const {
    butler,
    etagere,
    nomarticle,
    numarticle,
    poids,
    quantite,
    quantitealerte,
    rayon,
    specification,
    trave,
    uc,
  } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une pièce
      </h2>
      <Formulaire
        butler={butler}
        etagere={etagere}
        nomarticle={nomarticle}
        numarticle={Number(numarticle)}
        poids={poids}
        quantite={quantite}
        quantitealerte={quantitealerte}
        rayon={rayon}
        specification={specification}
        trave={trave}
        uc={uc}
      />
    </div>
  );
}

export default Page;
