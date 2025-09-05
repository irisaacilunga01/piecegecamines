import React from "react";
import { createClient } from "@/lib/supabase/server";
import { Formulaire } from "../form";
import { Commande, Piece, Demandeur } from "@/lib/types";
import { notFound } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const numBon = params.id ? Number(params.id) : null;

  if (!numBon) {
    notFound();
  }

  // Requête pour récupérer tous les articles (pièces)
  const { data: nomarticles, error: articlesError } = await supabase
    .from("piece")
    .select("numarticle, nomarticle");

  // Requête pour récupérer tous les demandeurs
  const { data: nomdemandeurs, error: demandeursError } = await supabase
    .from("demandeur")
    .select("nummatricule, nomdemandeur");

  // Requête pour récupérer la commande spécifique
  const { data: commande, error: commandeError } = await supabase
    .from("commande")
    .select("*")
    .eq("numbon", numBon)
    .single();

  if (articlesError || demandeursError || commandeError) {
    console.error("Erreur de récupération des données:", {
      articlesError,
      demandeursError,
      commandeError,
    });
    return <div>Erreur lors du chargement des données.</div>;
  }

  if (!commande) {
    notFound();
  }

  // --- CONVERSION DES DONNÉES ICI ---
  const formattedNomArticles = nomarticles
    ? nomarticles.map((item) => ({
        numarticle: Number(item.numarticle),
        nomarticle: item.nomarticle,
      }))
    : [];

  const formattedNomDemandeurs = nomdemandeurs
    ? nomdemandeurs.map((item) => ({
        nummatricule: Number(item.nummatricule),
        nomdemandeur: item.nomdemandeur,
      }))
    : [];

  const {
    datedemande,
    dateservie,
    destination,
    fichiermanle,
    motif,
    numarticle,
    numbon,
    numcompte,
    nummatricule,
    quantiteservie,
  } = commande as Commande;

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une commande demandeur
      </h2>
      <Formulaire
        datedemande={datedemande || new Date().toISOString().split("T")[0]}
        dateservie={dateservie}
        destination={destination}
        fichiermanle={fichiermanle}
        motif={motif}
        // Passez les données converties
        nomarticles={formattedNomArticles}
        nomdemandeurs={formattedNomDemandeurs}
        numarticle={Number(numarticle)}
        numbon={Number(numbon)}
        numcompte={numcompte}
        nummatricule={Number(nummatricule)}
        quantiteservie={Number(quantiteservie)}
      />
    </div>
  );
}

export default Page;
// import React from "react";
// import { sql } from "@vercel/postgres";
// import { Formulaire } from "../form";
// import { Commande, Piece } from "@/lib/types";

// async function Page({ params }: { params: { id: string } }) {
//   const idCl = params.id ? Number(params.id) : 1;
//   const { rows: nomarticles } = await sql<{
//     numarticle: number;
//     nomarticle: string;
//   }>`SELECT numarticle,nomarticle from piece`;
//   const { rows: nomdemandeurs } = await sql<{
//     nummatricule: number;
//     nomdemandeur: string;
//   }>`SELECT nummatricule,nomdemandeur from demandeur`;
//   const { rows } =
//     await sql<Commande>`SELECT * from commande where numbon=${idCl}`;
//   const {
//     datedemande,
//     dateservie,
//     destination,
//     fichiermanle,
//     motif,
//     numarticle,
//     numbon,
//     numcompte,
//     nummatricule,
//     quantiteservie,
//   } = rows[0];

//   return (
//     <div className="flex flex-col gap-4 py-4 px-8">
//       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         Formulaire modifier une commande demandeur
//       </h2>
//       <Formulaire
//         datedemande={datedemande || new Date().toDateString()}
//         dateservie={dateservie}
//         destination={destination}
//         fichiermanle={fichiermanle}
//         motif={motif}
//         nomarticles={nomarticles}
//         nomdemandeurs={nomdemandeurs}
//         numarticle={Number(numarticle)}
//         numbon={Number(numbon)}
//         numcompte={numcompte}
//         nummatricule={Number(nummatricule)}
//         quantiteservie={Number(quantiteservie)}
//       />
//     </div>
//   );
// }

// export default Page;
