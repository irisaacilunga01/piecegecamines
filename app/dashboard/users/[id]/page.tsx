import { createClient } from "@/lib/supabase/server"; // Import the Supabase client
import { User } from "@/lib/types";
import { notFound } from "next/navigation";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const supabase = await createClient(); // Initialize the Supabase client

  const idCl = params.id ? params.id : null;

  if (!idCl) {
    notFound();
  }

  // Replace the Vercel Postgres query with a Supabase query
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", idCl)
    .single();

  if (error) {
    console.error("Supabase Error:", error);
    if (error.code === "PGRST116") {
      notFound();
    }
    return <div>Erreur lors du chargement des données.</div>;
  }

  // Destructure directly from the returned object
  const { email, id, nom, password } = user as User;

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un utilisateur
      </h2>
      <Formulaire email={email} id={id} nom={nom} password={password} />
    </div>
  );
}

export default Page;
// import React from "react";
// import { sql } from "@vercel/postgres";
// import { User } from "@/lib/types";
// import { Formulaire } from "../form";

// async function Page({ params }: { params: { id: string } }) {
//   const idCl = params.id ? Number(params.id) : 1;

//   const { rows } = await sql<User>`SELECT * from users where id=${idCl}`;
//   const { email, id, nom, password } = rows[0];
//   return (
//     <div className="flex flex-col gap-4 py-4 px-8">
//       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
//         Formulaire modifier un utilisateur
//       </h2>
//       <Formulaire email={email} id={id} nom={nom} password={password} />
//     </div>
//   );
// }

// export default Page;
