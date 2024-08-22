// import { Card } from "@/components/ui/card";
// import { ExpandableCard } from "../piece";
// import { fetchAndMapCards } from "../card";

// async function Page() {
//   const cards = await fetchAndMapCards();
//   return (
//     <div>
//       <div>Liste d&apos;article</div>
//       <Card className="bg-secondary">
//         <ExpandableCard cards={cards} />
//       </Card>
//     </div>
//   );
// }

// export default Page;

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ExpandableCard } from "../piece";
import { fetchAndMapCards } from "../card";
import Search from "./cardPiece";

// Définition du type pour les cartes
type CardType = {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: JSX.Element;
};

async function Page() {
  const cards: CardType[] = await fetchAndMapCards();

  return <Search cards={cards} />;
}

export default Page;
