import { ModeToggle } from "@/components/toggletheme";
import { createClient } from "@/lib/supabase/server"; // Importez le client Supabase
import { Piece } from "@/lib/types";
import { DataTable } from "./dataTable";

export default async function Page() {
  // Créez une instance du client Supabase
  const supabase = await createClient();

  // Récupérez les données de la table 'piece'
  const { data: rows, error } = await supabase.from("piece").select("*");

  // Gérer les erreurs de récupération
  if (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return <div>Erreur lors du chargement des données.</div>;
  }

  // Assurez-vous que `rows` est un tableau de Piece
  const pieceData: Piece[] = rows || [];

  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page Gérer Pièce
        </h2>
        <ModeToggle />
      </header>

      <main>
        <DataTable data={pieceData} />
      </main>
    </div>
  );
}
// import React from "react";
// import { sql } from "@vercel/postgres";
// import { Piece } from "@/lib/types";
// import { DataTable } from "./dataTable";
// import { ModeToggle } from "@/components/toggletheme";

// export default async function Page() {
//   const { rows } = await sql<Piece>`SELECT * from piece`;

//   return (
//     <div className="flex flex-col">
//       <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
//         <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//           Page Gérer Pièce
//         </h2>
//         <ModeToggle />
//       </header>

//       <main>
//         <DataTable data={rows} />
//       </main>
//     </div>
//   );
// }
