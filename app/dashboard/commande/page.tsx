import React from "react";
import { sql } from "@vercel/postgres";
import { Commande, Commandemagasin } from "@/lib/types";
import { ModeToggle } from "@/components/toggletheme";
import { DataTableDemandeur } from "./demandeur/dataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTableMagasin } from "./magasin/dataTable";

export default async function Page() {
  const { rows: magasin } = await sql<Commandemagasin>`SELECT 
    cm.numrecquisition AS numrecquisition,
    TO_CHAR(cm.dateemission, 'YYYY-MM-DD') AS dateemission,
    TO_CHAR(cm.datelivraison, 'YYYY-MM-DD') AS datelivraison,
    cm.typedemande AS typedemande,
    cm.quantiteexpedie AS quantiteexpedie,
    cm.justification AS justification,
    cm.observation AS observation,
    cm.numcompteadebite AS numcompteadebite,
    cm.nummagasin AS nummagasin,
    md.nommagasin AS nommagasin
FROM 
    Commandemagasin cm
LEFT JOIN 
    Magasindestinataire md ON cm.nummagasin = md.nummagasin;
`;
  const { rows: commande } = await sql<Commande>`SELECT 
    c.numbon AS numbon,
    TO_CHAR(c.datedemande, 'YYYY-MM-DD') AS datedemande,
    c.numcompte AS numcompte,
    c.destination AS destination,
    c.motif AS motif,
    c.fichiermanle AS fichiermanle,
    c.quantiteservie AS quantiteservie,
    TO_CHAR(c.dateservie, 'YYYY-MM-DD') AS dateservie,
    c.nummatricule AS nummatricule,
    p.nomarticle AS nomarticle,
    d.nomdemandeur AS nomdemandeur,
    c.numarticle AS numarticle
FROM 
    Commande c
LEFT JOIN 
    Piece p ON c.numarticle = p.numarticle
LEFT JOIN 
    Demandeur d ON c.nummatricule = d.nummatricule;`;
  return (
    <div className="flex flex-col">
      <main className="mt-2">
        <Tabs defaultValue="demandeur" className="w-full">
          <TabsList className="w-full flex justify-between items-center">
            <div>
              <TabsTrigger value="demandeur">
                Page Gérer Commande Demandeur
              </TabsTrigger>
              <TabsTrigger value="magasin">
                Page Gérer Commande Magasin
              </TabsTrigger>
            </div>
            <ModeToggle />
          </TabsList>
          <TabsContent value="demandeur">
            <DataTableDemandeur data={commande} />
          </TabsContent>
          <TabsContent value="magasin">
            <DataTableMagasin data={magasin} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
