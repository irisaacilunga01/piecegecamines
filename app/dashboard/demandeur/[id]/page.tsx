import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
import { Demandeur } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Demandeur>`SELECT * from demandeur where nummatricule=${idCl}`;
  const { nomdemandeur, numfonction, nummatricule, numtel } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un demandeur
      </h2>
      <Formulaire
        nomdemandeur={nomdemandeur}
        numfonction={numfonction}
        numtel={numtel}
        nummatricule={Number(nummatricule)}
      />
    </div>
  );
}

export default Page;
