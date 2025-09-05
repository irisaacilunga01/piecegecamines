import React from "react";
import { createClient } from "@/lib/supabase/server";
import { Fournisseur } from "@/lib/types";
import { DataTable } from "./dataTable";
import { ModeToggle } from "@/components/toggletheme";

export default async function Page() {
  const supabase = await createClient();
  const { data: rows, error } = await supabase.from("fournisseur").select("*");

  if (error) {
    console.error("Erreur de récupération Fournisseur:", error);
    return <div>Erreur lors du chargement des données.</div>;
  }

  const fournisseurData: Fournisseur[] = rows || [];

  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page Gérer Fournisseur
        </h2>
        <ModeToggle />
      </header>
      <main>
        <DataTable data={fournisseurData} />
      </main>
    </div>
  );
}
// import React from "react";
// import { sql } from "@vercel/postgres";
// import { Fournisseur } from "@/lib/types";
// import { DataTable } from "./dataTable";
// import { ModeToggle } from "@/components/toggletheme";

// export default async function Page() {
//   const { rows } = await sql<Fournisseur>`SELECT * from fournisseur`;
//   return (
//     <div className="flex flex-col">
//       <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
//         <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//           Page Gérer Fournisseur
//         </h2>
//         <ModeToggle />
//       </header>

//       <main>
//         <DataTable data={rows} />
//       </main>
//     </div>
//   );
// }
