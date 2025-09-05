import { createClient } from "@/lib/supabase/server"; // Importez le client Supabase
import { Piece } from "@/lib/types";
import { StaticImageData } from "next/image"; // Importez le type StaticImageData

export async function fetchAndMapCards() {
  const supabase = await createClient(); // Initialisez le client Supabase

  // Remplacez la requête SQL par un appel Supabase
  const { data: rows, error } = await supabase.from("piece").select("*");

  // Gérez les erreurs de récupération
  if (error) {
    console.error("Erreur lors de la récupération des pièces:", error);
    // Retournez un tableau vide pour éviter une erreur de l'interface utilisateur
    return [];
  }

  // Assurez-vous que les données sont du bon type
  const pieces: Piece[] = rows as Piece[];

  const cards = pieces.map((piece) => ({
    description: piece.nomarticle,
    title: `Article: ${piece.numarticle}`,
    src: (piece.imageurl || "/piece.jpg") as string,
    ctaText: "Détails",
    ctaLink: ``,
    content: (
      <p>
        L&apos;article {piece.nomarticle} (Numéro: {piece.numarticle}) a une
        quantité disponible de {piece.quantite}.
        <br /> <br />
        Spécification: {piece.specification}.
        <br /> <br />
        Il est stocké dans l&apos;unité {piece.uc}, sur l&apos;étagère{" "}
        {piece.etagere}, trave {piece.trave}, rayon {piece.rayon}.
        <br /> <br />
        Son poids est de {piece.poids} kg et la quantité d&apos;alerte est de{" "}
        {piece.quantitealerte}.
      </p>
    ),
  }));

  return cards;
}
// import { Piece } from "@/lib/types";
// import { sql } from "@vercel/postgres";

// export async function fetchAndMapCards() {
//   const { rows } = await sql<Piece>`SELECT * FROM piece`;

//   const cards = rows.map((piece) => ({
//     description: piece.nomarticle,
//     title: `Article: ${piece.numarticle}`,
//     src: piece.imageurl || "/piece.jpg",
//     ctaText: "Détails",
//     ctaLink: ``,
//     content: (
//       <p>
//         L&apos;article {piece.nomarticle} (Numéro: {piece.numarticle}) a une
//         quantité disponible de {piece.quantite}.
//         <br /> <br />
//         Spécification: {piece.specification}.
//         <br /> <br />
//         Il est stocké dans l&apos;unité {piece.uc}, sur l&apos;étagère{" "}
//         {piece.etagere}, trave {piece.trave}, rayon {piece.rayon}.
//         <br /> <br />
//         Son poids est de {piece.poids} kg et la quantité d&apos;alerte est de{" "}
//         {piece.quantitealerte}.
//       </p>
//     ),
//   }));

//   return cards;
// }
