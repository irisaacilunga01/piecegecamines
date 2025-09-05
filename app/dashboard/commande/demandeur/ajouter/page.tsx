import React from "react";
import { Formulaire } from "../form";
import { createClient } from "@/lib/supabase/server"; // Import the Supabase client

async function Page() {
  const supabase = await createClient(); // Initialize the Supabase client

  // Fetch data for articles using Supabase
  const { data: nomarticles, error: articlesError } = await supabase
    .from("piece")
    .select("numarticle, nomarticle");

  // Fetch data for demandeurs using Supabase
  const { data: nomdemandeurs, error: demandeursError } = await supabase
    .from("demandeur")
    .select("nummatricule, nomdemandeur");

  if (articlesError || demandeursError) {
    console.error("Error fetching data:", { articlesError, demandeursError });
    return <div>Erreur lors du chargement des données.</div>;
  }

  // Ensure data is not null before passing it to the component
  const articlesData = nomarticles || [];
  const demandeursData = nomdemandeurs || [];

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter une commande demandeur
      </h2>
      <Formulaire nomarticles={articlesData} nomdemandeurs={demandeursData} />
    </div>
  );
}

export default Page;
// import React from "react";
// import { Formulaire } from "../form";
// import { sql } from "@vercel/postgres";

// async function Page() {
//   const { rows: nomarticles } = await sql<{
//     numarticle: number;
//     nomarticle: string;
//   }>`SELECT numarticle,nomarticle from piece`;
//   const { rows: nomdemandeurs } = await sql<{
//     nummatricule: number;
//     nomdemandeur: string;
//   }>`SELECT nummatricule,nomdemandeur from demandeur`;
//   return (
//     <div className="flex flex-col gap-4 py-4 px-8">
//       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         Formulaire ajouter une commande demandeur
//       </h2>
//       <Formulaire nomarticles={nomarticles} nomdemandeurs={nomdemandeurs} />
//     </div>
//   );
// }

// export default Page;
