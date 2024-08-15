import React from "react";
import { sql } from "@vercel/postgres";
import { Category } from "@/lib/types";
import { categories } from "@/lib/data";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  //   const { rows } = await sql<Category>`SELECT * from client where id=${idCl}`;
  //   const { description,nom,id } = rows[0];
  const { description, nom, id } = categories[idCl - 1];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une catégorie
      </h2>
      <Formulaire id={id} nom={nom} description={description} />
    </div>
  );
}

export default Page;
