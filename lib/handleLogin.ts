// lib/actions.ts

// ... (vos autres imports)

import bcrypt from "bcrypt";
import { SupabaseClient } from "@supabase/supabase-js";

// Modifiez le type pour qu'il soit plus précis
type UserLoginData = {
  id: number;
  nom: string;
  email: string;
};

// Modifiez la signature de la fonction
export async function handlelogin(
  supabase: SupabaseClient,
  data: { email: string; mdp: string }
): Promise<{ data: UserLoginData | {}; role: string }> {
  const { email, mdp } = data;

  try {
    const { data: rows, error } = await supabase
      .from("users")
      .select("id, nom, email, password")
      .eq("email", email)
      .limit(1);

    if (error) {
      console.error("Supabase Error:", error);
      return { data: {}, role: "" };
    }

    if (rows && rows.length === 1) {
      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(mdp, user.password);

      if (isPasswordValid) {
        return {
          data: {
            id: user.id,
            nom: user.nom,
            email: user.email,
          },
          role: user.email,
        };
      }
    }

    return {
      data: {},
      role: "",
    };
  } catch (error) {
    console.error("Login Error:", error);
    return { data: {}, role: "" };
  }
}
