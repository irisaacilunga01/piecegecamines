import { ModeToggle } from "@/components/toggletheme";
import { createClient } from "@/lib/supabase/server"; // Importez le client Supabase
import { Bonreception } from "@/lib/types";
import { DataTable } from "./dataTable";

export default async function Page() {
  const supabase = await createClient();

  // Récupérez les données de la table 'bonreception' en incluant le nom du fournisseur.
  const { data: rows, error } = await supabase
    .from("bonreception")
    .select("*, fournisseur(nomfournisseur)");

  if (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return <div>Erreur lors du chargement des données.</div>;
  }

  // Mappez les données pour avoir le nom du fournisseur directement sur l'objet
  const bonreceptionData: Bonreception[] = (rows || []).map((row: any) => ({
    ...row,
    nomfour: row.fournisseur?.nomfournisseur,
  }));

  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page gérer stock
        </h2>
        <ModeToggle />
      </header>

      <main>
        <DataTable data={bonreceptionData} />
      </main>
    </div>
  );
}
// import React from "react";
// import { sql } from "@vercel/postgres";
// import { Bonreception } from "@/lib/types";
// import { DataTable } from "./dataTable";
// import { ModeToggle } from "@/components/toggletheme";

// export default async function Page() {
//   const { rows } = await sql<Bonreception>`SELECT * from Bonreception`;
//   return (
//     <div className="flex flex-col">
//       <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
//         <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//           Page gérer stock
//         </h2>
//         <ModeToggle />
//       </header>

//       <main>
//         <DataTable data={rows} />
//       </main>
//     </div>
//   );
// }
