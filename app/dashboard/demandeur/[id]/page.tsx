import { createClient } from "@/lib/supabase/server";
import { Demandeur } from "@/lib/types";
import { notFound } from "next/navigation";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : null;

  if (!idCl) {
    notFound();
  }

  const supabase = await createClient();
  const { data: row, error } = await supabase
    .from("demandeur")
    .select("*")
    .eq("nummatricule", idCl)
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    if (error.code === "PGRST116") {
      notFound();
    }
    return <div>Erreur lors du chargement des données.</div>;
  }

  const { nomdemandeur, numfonction, nummatricule, numtel } = row as Demandeur;

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
// import React from "react";
// import { sql } from "@vercel/postgres";
// import { Formulaire } from "../form";
// import { Demandeur } from "@/lib/types";

// async function Page({ params }: { params: { id: string } }) {
//   const idCl = params.id ? Number(params.id) : 1;

//   const { rows } =
//     await sql<Demandeur>`SELECT * from demandeur where nummatricule=${idCl}`;
//   const { nomdemandeur, numfonction, nummatricule, numtel } = rows[0];
//   return (
//     <div className="flex flex-col gap-4 py-4 px-8">
//       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         Formulaire modifier un demandeur
//       </h2>
//       <Formulaire
//         nomdemandeur={nomdemandeur}
//         numfonction={numfonction}
//         numtel={numtel}
//         nummatricule={Number(nummatricule)}
//       />
//     </div>
//   );
// }

// export default Page;
