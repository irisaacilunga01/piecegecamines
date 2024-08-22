import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
import { Commandemagasin } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;
  const { rows: nommagasins } = await sql<{
    nummagasin: number;
    nommagasin: string;
  }>`SELECT nummagasin,nommagasin from magasindestinataire`;
  const { rows } =
    await sql<Commandemagasin>`SELECT * from commandemagasin where numrecquisition
=${idCl}`;
  const {
    dateemission,
    datelivraison,
    justification,
    numcompteadebite,
    nummagasin,
    numrecquisition,
    observation,
    quantiteexpedie,
    typedemande,
  } = rows[0];

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une commande magasin
      </h2>
      <Formulaire
        dateemission={new Date(dateemission).toDateString()}
        datelivraison={new Date(datelivraison).toDateString()}
        justification={justification}
        nommagasins={nommagasins}
        numcompteadebite={numcompteadebite}
        nummagasin={Number(nummagasin)}
        numrecquisition={Number(numrecquisition)}
        observation={observation}
        quantiteexpedie={quantiteexpedie}
        typedemande={typedemande}
      />
    </div>
  );
}

export default Page;
