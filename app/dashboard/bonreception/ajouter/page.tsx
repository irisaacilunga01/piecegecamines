import { createClient } from "@/lib/supabase/server"; // Import the Supabase client
import { Formulaire } from "../form";

async function Page() {
  const supabase = await createClient(); // Initialize the Supabase client

  // Fetch the list of articles from Supabase
  const { data: nomarticles, error: articlesError } = await supabase
    .from("piece")
    .select("numarticle, nomarticle");

  // Fetch the list of suppliers from Supabase
  const { data: nomsfourni, error: fournisseursError } = await supabase
    .from("fournisseur")
    .select("idfour, nomfournisseur");

  if (articlesError || fournisseursError) {
    console.error("Error fetching data:", { articlesError, fournisseursError });
    return <div>Error loading data.</div>;
  }

  // Format the data to match the expected types for the Formulaire component
  const formattedNomArticles =
    nomarticles?.map((item) => ({
      numarticle: Number(item.numarticle),
      nomarticle: item.nomarticle,
    })) || [];

  const formattedNomsFourni =
    nomsfourni?.map((item) => ({
      idfour: Number(item.idfour),
      nomfournisseur: item.nomfournisseur,
    })) || [];

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter une bon de reception
      </h2>
      <Formulaire
        fournisseurs={formattedNomsFourni}
        nomarticles={formattedNomArticles}
      />
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
//   const { rows: nomsfourni } = await sql<{
//     idfour: number;
//     nomfournisseur: string;
//   }>`SELECT idfour,nomfournisseur from fournisseur`;
//   return (
//     <div className="flex flex-col gap-4 py-4 px-8">
//       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         Formulaire ajouter une bon de reception
//       </h2>
//       <Formulaire fournisseurs={nomsfourni} nomarticles={nomarticles} />
//     </div>
//   );
// }

// export default Page;
