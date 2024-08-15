import { Piece } from "@/lib/types";
import { sql } from "@vercel/postgres";

export async function fetchAndMapCards() {
  const { rows } = await sql<Piece>`SELECT * FROM piece`;

  const cards = rows.map((piece) => ({
    description: piece.nomarticle,
    title: `Article: ${piece.numarticle}`,
    src: piece.imageurl || "/piece.jpg",
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
