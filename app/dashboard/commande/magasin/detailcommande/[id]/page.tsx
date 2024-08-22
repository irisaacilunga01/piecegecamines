import React from "react";
import { sql } from "@vercel/postgres";
import { Detailcommande } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;
  const { rows } =
    await sql<Detailcommande>`SELECT * from Detailcommande where numrecquisition=${idCl}`;
  const {
 bo,nomarticle,numarticle,numrecquisition,quantiteafournir,quantitedemandee
  } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une commande demandeur
      </h2>

    </div>
  );
}

export default Page;
