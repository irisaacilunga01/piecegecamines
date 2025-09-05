import { ChartRound } from "@/components/chartRound";
import { ChartTimes } from "@/components/chartTimes";
import { ModeToggle } from "@/components/toggletheme";
import { createClient } from "@/lib/supabase/server";

// Types de données
interface CountsResult {
  nombre_piece: number;
  nombre_utilisateurs: number;
  nombre_demandeurs: number;
  nombre_commandes: number;
}

interface StockFlowData {
  date: string;
  quantite_commandee: number;
  quantite_recue: number;
}

async function Page() {
  const supabase = await createClient();

  // Récupérer les comptages des tables
  const { count: pieceCount, error: pieceError } = await supabase
    .from("piece")
    .select("*", { count: "exact" });

  const { count: usersCount, error: usersError } = await supabase
    .from("users")
    .select("*", { count: "exact" });

  const { count: demandeurCount, error: demandeurError } = await supabase
    .from("demandeur")
    .select("*", { count: "exact" });

  const { count: commandeCount, error: commandeError } = await supabase
    .from("commande")
    .select("*", { count: "exact" });

  // Exécuter la fonction RPC pour les données de tendances
  const { data: stockFlowData, error: stockFlowError } = await supabase.rpc(
    "get_daily_stock_flow"
  );

  if (
    pieceError ||
    usersError ||
    demandeurError ||
    commandeError ||
    stockFlowError
  ) {
    console.error("Erreur de chargement des données:", {
      pieceError,
      usersError,
      demandeurError,
      commandeError,
      stockFlowError,
    });
    return <div>Erreur lors du chargement des données du tableau de bord.</div>;
  }

  // Préparez les données pour les graphiques
  const counts = {
    nombre_piece: pieceCount || 0,
    nombre_utilisateurs: usersCount || 0,
    nombre_demandeurs: demandeurCount || 0,
    nombre_commandes: commandeCount || 0,
  };

  const chartData: StockFlowData[] = (stockFlowData || []).map((row: any) => ({
    date: row.date,
    quantite_commandee: row.quantite_commandee,
    quantite_recue: row.quantite_recue,
  }));

  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page Tableau de bord
        </h2>
        <ModeToggle />
      </header>
      <main className="gap-4 p-4 lg:gap-6 lg:p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
        <ChartRound
          nb={counts.nombre_piece}
          title="Total Pièces"
          label="pièces"
        />
        <ChartRound
          nb={counts.nombre_demandeurs}
          title="Total Demandeurs"
          label="demandeurs"
        />
        <ChartRound
          nb={counts.nombre_commandes}
          title="Total Commandes"
          label="commandes"
        />
        <ChartRound
          nb={counts.nombre_utilisateurs}
          title="Total Utilisateurs"
          label="utilisateurs"
        />
      </main>
      <div>
        <ChartTimes chartData={chartData} />
      </div>
    </div>
  );
}

export default Page;
// // import { ChartRound } from "@/components/chartRound";
// // import { ChartTimes } from "@/components/chartTimes";
// // import { ModeToggle } from "@/components/toggletheme";
// // import { CountsResult } from "@/lib/types";
// // import { sql } from "@vercel/postgres";
// // import React from "react";

// // async function Page() {
// //   const { rows: counts } = await sql<CountsResult>`SELECT
// //         (SELECT COUNT(*) FROM Chambre) AS nombre_chambres,
// //         (SELECT COUNT(*) FROM Personnel) AS nombre_utilisateurs,
// //         (SELECT COUNT(*) FROM Client) AS nombre_clients,
// //         (SELECT COUNT(*) FROM Reservation) AS nombre_reservations,
// //         (SELECT COUNT(*) FROM Hotel) AS nombre_hotels`;

// //   const { rows: revenueData } = await sql<{
// //     date: Date;
// //     revenu_total: number;
// //   }>`SELECT
// //         DATE(date) AS date,
// //         SUM(montant) AS revenu_total
// //       FROM
// //           paiement
// //       GROUP BY
// //           DATE(date)
// //       ORDER BY
// //           DATE(date);`;

// //   // Convert the `revenueData` rows into a format expected by `ChartTimes`
// //   const chartData = revenueData.map((row) => ({
// //     date: `${row.date?.getFullYear()}-${
// //       row.date?.getMonth() + 1
// //     }-${row.date?.getDate()}`,
// //     revenu_total: row.revenu_total,
// //   }));

// //   return (
// //     <div className="flex flex-col">
// //       <main className="gap-4 p-4 lg:gap-6 lg:p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
// //         <ChartRound
// //           nb={counts[0].nombre_chambres}
// //           title="Total Chambres"
// //           label="chambres"
// //         />
// //         <ChartRound
// //           nb={counts[0].nombre_clients}
// //           title="Total Clients"
// //           label="clients"
// //         />
// //         <ChartRound
// //           nb={counts[0].nombre_reservations}
// //           title="Total Reservations"
// //           label="reservations"
// //         />
// //         <ChartRound
// //           nb={counts[0].nombre_utilisateurs}
// //           title="Total Utilisateurs"
// //           label="utilisateurs"
// //         />
// //       </main>
// //       <div>
// //         <ChartTimes chartData={chartData} />
// //       </div>
// //     </div>
// //   );
// // }

// // export default Page;
// import React from "react";

// function Page() {
//   return <div>Page</div>;
// }

// export default Page;
