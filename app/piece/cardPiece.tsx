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
"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ExpandableCard } from "../piece";
import { Input } from "@/components/ui/input";

// Définition du type pour les cartes
type CardType = {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: JSX.Element;
};

function Search({ cards }: { cards: CardType[] }) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtrer les cartes en fonction du terme de recherche
  const filteredCards = cards.filter((card) =>
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between flex-wrap items-center p-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Liste des pièces
        </h2>
        {/* Barre de recherche */}
        <Input
          type="text"
          placeholder="Rechercher nom piece..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded mb-4 max-w-sm"
        />
      </div>

      <Card className="bg-secondary">
        <ExpandableCard cards={filteredCards} />
      </Card>
    </div>
  );
}

export default Search;
