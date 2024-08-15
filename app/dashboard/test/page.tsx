// import React from "react";
// import { sql } from "@vercel/postgres";
// import { cookies } from "next/headers";
// import { Users, verifyToken } from "@/lib/verification";

// // Définir le type pour les données du payload du JWT

// export default async function Page() {
//   const cookieStore = cookies();
//   const tokenCookie = cookieStore.get("token")?.value;

//   let verificationcookie: Users | null = null;
//   if (tokenCookie) {
//     verificationcookie = verifyToken(tokenCookie);
//   }

//   const { rows } = await sql`SELECT * FROM personnel;`;
//   console.log({ rows });

//   return (
//     <div className="overflow-auto">
//       <code>verificationcookie role: {verificationcookie?.role}</code>
//     </div>
//   );
// }
