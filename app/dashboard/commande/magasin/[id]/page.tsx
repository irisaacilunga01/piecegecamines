import React from "react";
import { createClient } from "@/lib/supabase/server";
import { Formulaire } from "../form";
import { Commandemagasin, Magasindestinataire } from "@/lib/types";
import { notFound } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const numRecquisition = params.id ? Number(params.id) : null;

  if (!numRecquisition) {
    notFound();
  }

  // Fetch the list of destination stores from Supabase
  const { data: nommagasins, error: magasinsError } = await supabase
    .from("magasindestinataire")
    .select("nummagasin, nommagasin");

  // Fetch the specific 'magasin' command based on the ID
  const { data: commande, error: commandeError } = await supabase
    .from("commandemagasin")
    .select("*")
    .eq("numrecquisition", numRecquisition)
    .single();

  if (magasinsError || commandeError) {
    console.error("Error fetching data:", { magasinsError, commandeError });
    return <div>Error loading data.</div>;
  }

  if (!commande) {
    notFound();
  }

  // Format the data to match the expected types for the Formulaire component
  const formattedNomMagasins =
    nommagasins?.map((item) => ({
      nummagasin: Number(item.nummagasin),
      nommagasin: item.nommagasin,
    })) || [];

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
  } = commande as Commandemagasin;

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une commande magasin
      </h2>
      <Formulaire
        dateemission={new Date(dateemission).toDateString()}
        datelivraison={new Date(datelivraison).toDateString()}
        justification={justification}
        nommagasins={formattedNomMagasins}
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
// import React from "react";
// import { sql } from "@vercel/postgres";
// import { Formulaire } from "../form";
// import { Commandemagasin } from "@/lib/types";

// async function Page({ params }: { params: { id: string } }) {
//   const idCl = params.id ? Number(params.id) : 1;
//   const { rows: nommagasins } = await sql<{
//     nummagasin: number;
//     nommagasin: string;
//   }>`SELECT nummagasin,nommagasin from magasindestinataire`;
//   const { rows } =
//     await sql<Commandemagasin>`SELECT * from commandemagasin where numrecquisition
// =${idCl}`;
//   const {
//     dateemission,
//     datelivraison,
//     justification,
//     numcompteadebite,
//     nummagasin,
//     numrecquisition,
//     observation,
//     quantiteexpedie,
//     typedemande,
//   } = rows[0];

//   return (
//     <div className="flex flex-col gap-4 py-4 px-8">
//       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         Formulaire modifier une commande magasin
//       </h2>
//       <Formulaire
//         dateemission={new Date(dateemission).toDateString()}
//         datelivraison={new Date(datelivraison).toDateString()}
//         justification={justification}
//         nommagasins={nommagasins}
//         numcompteadebite={numcompteadebite}
//         nummagasin={Number(nummagasin)}
//         numrecquisition={Number(numrecquisition)}
//         observation={observation}
//         quantiteexpedie={quantiteexpedie}
//         typedemande={typedemande}
//       />
//     </div>
//   );
// }

// export default Page;
