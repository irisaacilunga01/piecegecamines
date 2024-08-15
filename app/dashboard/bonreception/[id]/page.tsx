import React from "react";
import { sql } from "@vercel/postgres";
// import { Animation } from "@/lib/types";
// import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  //   const { rows } = await sql<Programme>`SELECT * from client where id=${idCl}`;
  //   const { description,nom,id } = rows[0];
  // const { presentateurid, programmeid, role, id } = animations[idCl - 1];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier stock
      </h2>
      {/* <Formulaire
        id={id}
        presentateurid={presentateurid}
        programmeid={programmeid}
        role={role}
        presentateurs={presentateurs}
        programmes={programmes}
      /> */}
    </div>
  );
}

export default Page;
