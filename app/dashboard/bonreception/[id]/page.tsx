import { createClient } from "@/lib/supabase/server";
import { Bonreception } from "@/lib/types";
import { notFound } from "next/navigation";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const idCl = params.id ? Number(params.id) : null;

  if (!idCl) {
    notFound();
  }

  // Fetch all data concurrently using Promise.all for better performance
  const [
    { data: bonreception, error: bonreceptionError },
    { data: nomarticles, error: articlesError },
    { data: nomsfourni, error: fournisseursError },
  ] = await Promise.all([
    supabase.from("bonreception").select("*").eq("id", idCl).single(),
    supabase.from("piece").select("numarticle, nomarticle"),
    supabase.from("fournisseur").select("idfour, nomfournisseur"),
  ]);

  if (bonreceptionError || articlesError || fournisseursError) {
    console.error("Error fetching data:", {
      bonreceptionError,
      articlesError,
      fournisseursError,
    });
    return <div>Erreur lors du chargement des données.</div>;
  }

  if (!bonreception) {
    notFound();
  }

  // Format the data to match the expected types for the Formulaire component
  const formattedNomArticles =
    nomarticles?.map((item: any) => ({
      numarticle: Number(item.numarticle),
      nomarticle: item.nomarticle,
    })) || [];

  const formattedNomsFourni =
    nomsfourni?.map((item: any) => ({
      idfour: Number(item.idfour),
      nomfournisseur: item.nomfournisseur,
    })) || [];

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
  } = bonreception as Bonreception;

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier stock
      </h2>
      <Formulaire
        dateReceptionMarchandise={dateReceptionMarchandise}
        datereception={datereception}
        fournisseurs={formattedNomsFourni}
        nomarticles={formattedNomArticles}
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
// import React from "react";
// import { sql } from "@vercel/postgres";
// import { Formulaire } from "../form";
// import { Bonreception } from "@/lib/types";

// async function Page({ params }: { params: { id: string } }) {
//   const idCl = params.id ? Number(params.id) : 1;

//   const { rows } =
//     await sql<Bonreception>`SELECT * from bonreception where id=${idCl}`;
//   const {
//     dateReceptionMarchandise,
//     datereception,
//     id,
//     idfour,
//     litigeeventuel,
//     numarticle,
//     numcommande,
//     numlivr,
//     ps,
//     quantitecommandee,
//     quantiterecues,
//   } = rows[0];
//   const { rows: nomarticles } = await sql<{
//     numarticle: number;
//     nomarticle: string;
//   }>`SELECT numarticle,nomarticle from piece`;
//   const { rows: nomsfourni } = await sql<{
//     idfour: number;
//     nomfournisseur: string;
//   }>`SELECT idfour,nomfournisseur from fournisseur`;

//   return (
//     <div className="flex flex-col gap-4 py-4 px-8">
//       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         Formulaire modifier stock
//       </h2>
//       <Formulaire
//         dateReceptionMarchandise={dateReceptionMarchandise}
//         datereception={datereception}
//         fournisseurs={nomsfourni}
//         nomarticles={nomarticles}
//         id={Number(id)}
//         idfour={Number(idfour)}
//         litigeeventuel={litigeeventuel}
//         numarticle={Number(numarticle)}
//         numcommande={numcommande}
//         numlivr={numlivr}
//         ps={ps}
//         quantitecommandee={quantitecommandee}
//         quantiterecues={quantiterecues}
//       />
//     </div>
//   );
// }

// export default Page;
