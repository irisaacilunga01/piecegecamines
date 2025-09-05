import React from "react";
import { createClient } from "@/lib/supabase/server"; // Import the Supabase client
import { Formulaire } from "../form";
import { Magasindestinataire } from "@/lib/types";
import { notFound } from "next/navigation";

async function Page() {
  const supabase =await createClient(); // Initialize the Supabase client

  // Fetch the list of destination stores from Supabase
  const { data: nommagasins, error } = await supabase
    .from("magasindestinataire")
    .select("nummagasin, nommagasin");

  if (error) {
    console.error("Error fetching data:", error);
    // You can handle the error more gracefully if needed
    return <div>Error loading magasin data.</div>;
  }

  // Format the data to match the expected types for the Formulaire component
  const formattedNomMagasins = nommagasins?.map((item) => ({
    nummagasin: Number(item.nummagasin),
    nommagasin: item.nommagasin,
  })) || [];

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter une commande magasin
      </h2>
      <Formulaire nommagasins={formattedNomMagasins} />
    </div>
  );
}

export default Page;
// import React from "react";
// import { Formulaire } from "../form";
// import { sql } from "@vercel/postgres";

// async function Page() {
//   const { rows: nommagasins } = await sql<{
//     nummagasin: number;
//     nommagasin: string;
//   }>`SELECT nummagasin,nommagasin from magasindestinataire`;
//   return (
//     <div className="flex flex-col gap-4 py-4 px-8">
//       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         Formulaire ajouter une commande magasin
//       </h2>
//       <Formulaire nommagasins={nommagasins} />
//     </div>
//   );
// }

// export default Page;
