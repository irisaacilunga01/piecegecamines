import React from "react";
import { createClient } from "@/lib/supabase/server"; // Import the Supabase client
import { Formulaire } from "../form";
import { Fournisseur } from "@/lib/types";
import { notFound } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const supabase = await createClient(); // Initialize the Supabase client

  const idFour = params.id ? Number(params.id) : null;

  if (!idFour) {
    notFound();
  }

  // Replace the Vercel Postgres query with a Supabase query
  const { data: fournisseur, error } = await supabase
    .from("fournisseur")
    .select("*")
    .eq("idfour", idFour)
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    if (error.code === "PGRST116") {
      notFound();
    }
    return <div>Erreur lors du chargement des données.</div>;
  }

  // Destructure directly from the returned object
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
  } = fournisseur as Fournisseur;

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
// import React from "react";
// import { sql } from "@vercel/postgres";
// import { Formulaire } from "../form";
// import { Fournisseur } from "@/lib/types";

// async function Page({ params }: { params: { id: string } }) {
//   const idCl = params.id ? Number(params.id) : 1;

//   const { rows } =
//     await sql<Fournisseur>`SELECT * from fournisseur where idfour=${idCl}`;
//   const {
//     avenue,
//     commune,
//     email,
//     idfour,
//     nomfournisseur,
//     num,
//     pays,
//     province,
//     tel,
//     ville,
//   } = rows[0];
//   return (
//     <div className="flex flex-col gap-4 py-4 px-8">
//       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         Formulaire modifier un fournisseur
//       </h2>
//       <Formulaire
//         avenue={avenue}
//         commune={commune}
//         email={email}
//         idfour={Number(idfour)}
//         nomfournisseur={nomfournisseur}
//         num={num}
//         pays={pays}
//         province={province}
//         tel={tel}
//         ville={ville}
//       />
//     </div>
//   );
// }

// export default Page;
