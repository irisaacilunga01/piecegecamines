import { createClient } from "@/lib/supabase/server"; // Import the Supabase client
import { Magasindestinataire } from "@/lib/types";
import { notFound } from "next/navigation";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  // Use a more robust way to get the ID from params
  const idCl = params.id ? Number(params.id) : null;

  // Handle cases where the ID is not a valid number
  if (!idCl) {
    notFound();
  }

  const supabase = await createClient(); // Initialize the Supabase client

  // Replace the Vercel Postgres query with a Supabase query
  const { data: row, error } = await supabase
    .from("magasindestinataire")
    .select("*")
    .eq("nummagasin", idCl)
    .single(); // Use .single() to get a single object

  if (error) {
    console.error("Supabase Error:", error);
    // If the magasin is not found, show a 404 page
    if (error.code === "PGRST116") {
      // Specific code for no results found
      notFound();
    }
    // For other errors, display a generic error message
    return <div>Erreur lors du chargement des données.</div>;
  }

  // Destructure directly from the returned object `row`
  const { nummagasin, nommagasin } = row as Magasindestinataire;

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un magasin
      </h2>
      <Formulaire nommagasin={nommagasin} nummagasin={Number(nummagasin)} />
    </div>
  );
}

export default Page;
// import React from "react";
// import { sql } from "@vercel/postgres";
// import { Formulaire } from "../form";
// import { Demandeur, Magasindestinataire } from "@/lib/types";

// async function Page({ params }: { params: { id: string } }) {
//   const idCl = params.id ? Number(params.id) : 1;

//   const { rows } =
//     await sql<Magasindestinataire>`SELECT * from magasindestinataire where nummagasin=${idCl}`;
//   const { nummagasin, nommagasin } = rows[0];
//   return (
//     <div className="flex flex-col gap-4 py-4 px-8">
//       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         Formulaire modifier un magasin
//       </h2>
//       <Formulaire nommagasin={nommagasin} nummagasin={Number(nummagasin)} />
//     </div>
//   );
// }

// export default Page;
