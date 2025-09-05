import { createClient } from "@/lib/supabase/server"; // Import the Supabase client
import { Piece } from "@/lib/types";
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
  const { data: rows, error } = await supabase
    .from("piece")
    .select("*")
    .eq("numarticle", idCl)
    .single(); // Use .single() to get a single object instead of an array

  if (error) {
    console.error("Supabase Error:", error);
    // If the piece is not found, show a 404 page
    if (error.code === "PGRST116") {
      // Specific code for no results found
      notFound();
    }
    // For other errors, you can display a generic error message
    return <div>Erreur lors du chargement des données.</div>;
  }

  // Destructure directly from the returned object `rows`
  const {
    butler,
    etagere,
    nomarticle,
    numarticle,
    poids,
    quantite,
    quantitealerte,
    rayon,
    specification,
    trave,
    uc,
    imageurl,
  } = rows as Piece; // Type-cast the single object

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une pièce
      </h2>
      <Formulaire
        butler={butler}
        etagere={etagere}
        nomarticle={nomarticle}
        numarticle={Number(numarticle)}
        poids={poids}
        quantite={quantite}
        quantitealerte={quantitealerte}
        rayon={rayon}
        specification={specification}
        trave={trave}
        uc={uc}
        imageurl={imageurl}
      />
    </div>
  );
}

export default Page;
// import React from "react";
// import { sql } from "@vercel/postgres";
// import { Formulaire } from "../form";
// import { Piece } from "@/lib/types";

// async function Page({ params }: { params: { id: string } }) {
//   const idCl = params.id ? Number(params.id) : 1;

//   const { rows } =
//     await sql<Piece>`SELECT * from piece where numarticle=${idCl}`;
//   const {
//     butler,
//     etagere,
//     nomarticle,
//     numarticle,
//     poids,
//     quantite,
//     quantitealerte,
//     rayon,
//     specification,
//     trave,
//     uc,
//     imageurl,
//   } = rows[0];
//   return (
//     <div className="flex flex-col gap-4 py-4 px-8">
//       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         Formulaire modifier une pièce
//       </h2>
//       <Formulaire
//         butler={butler}
//         etagere={etagere}
//         nomarticle={nomarticle}
//         numarticle={Number(numarticle)}
//         poids={poids}
//         quantite={quantite}
//         quantitealerte={quantitealerte}
//         rayon={rayon}
//         specification={specification}
//         trave={trave}
//         uc={uc}
//         imageurl={imageurl}
//       />
//     </div>
//   );
// }

// export default Page;
