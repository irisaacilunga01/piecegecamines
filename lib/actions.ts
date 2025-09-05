"use server";
// Supprimer : import { sql } from "@vercel/postgres";
import { createClient } from "@/lib/supabase/server"; // Importez le client Supabase
import bcrypt from "bcrypt"; // Importez la bibliothèque bcrypt
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  Bonreception,
  Commande,
  Commandemagasin,
  Demandeur,
  Detailcommande,
  Fournisseur,
  Inventaire,
  InventaireDetail,
  Magasindestinataire,
  Piece,
  User,
} from "./types";
function revalidate() {
  revalidatePath("/dashboard/piece");
  revalidatePath("/piece");
  revalidatePath("/dashboard/demandeur");
  revalidatePath("/dashboard/commande");
  revalidatePath("/dashboard/commandemagasin");
  revalidatePath("/dashboard/fournisseur");
  revalidatePath("/dashboard/bonreception");
  revalidatePath("/dashboard/inventaire");
  revalidatePath("/dashboard/inventairedetail");
  revalidatePath("/dashboard/detailcommande");
  revalidatePath("/dashboard/magasindestinataire");
  revalidatePath("/dashboard/users");
  revalidatePath("/dashboard");
}

// Fonction utilitaire obsolète car Supabase gère l'auto-incrémentation
// function generateRandomNumber(min: number, max: number): number {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

/* ---------------------------------------------------- */
/* PIECE CRUD                     */
/* ---------------------------------------------------- */

export async function addPiece(data: Omit<Piece, "numarticle">) {
  const {
    butler,
    etagere,
    nomarticle,
    poids,
    quantite,
    quantitealerte,
    rayon,
    specification,
    trave,
    uc,
    imageurl,
  } = data;
  // Suppression de la génération de numarticle car Supabase gère l'auto-incrémentation

  const supabase = await createClient();
  try {
    const { error } = await supabase.from("piece").insert([
      {
        butler,
        etagere,
        nomarticle,
        poids,
        quantite,
        quantitealerte,
        rayon,
        specification,
        trave,
        uc,
        imageurl,
      },
    ]);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    console.log({ error });
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/piece");
}

export async function upDatePiece(id: number, data: Omit<Piece, "numarticle">) {
  const {
    butler,
    etagere,
    nomarticle,
    poids,
    quantite,
    quantitealerte,
    rayon,
    specification,
    trave,
    uc,
  } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("piece")
      .update({
        butler,
        etagere,
        nomarticle,
        poids,
        quantite,
        quantitealerte,
        rayon,
        specification,
        trave,
        uc,
      })
      .eq("numarticle", id); // Égal à numarticle = id

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/piece");
}

export async function deletePiece(id: number) {
  const supabase = await createClient();
  try {
    // Note : Supabase ne lancera pas une erreur si des dépendances existent
    // mais le SGBD PostgreSQL (que Supabase utilise) le fera.
    const { error } = await supabase
      .from("piece")
      .delete()
      .eq("numarticle", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/piece");
}

/* ---------------------------------------------------- */
/* COMMANDE CRUD                  */
/* ---------------------------------------------------- */

export async function addCommande(data: Omit<Commande, "numbon">) {
  const {
    datedemande,
    dateservie,
    destination,
    fichiermanle,
    motif,
    numarticle,
    numcompte,
    nummatricule,
    quantiteservie,
  } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase.from("commande").insert([
      {
        datedemande,
        dateservie,
        destination,
        fichiermanle,
        motif,
        numarticle,
        numcompte,
        nummatricule,
        quantiteservie,
      },
    ]);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/commande");
}

export async function upDateCommande(
  id: number,
  data: Omit<Commande, "numbon">
) {
  const {
    datedemande,
    dateservie,
    destination,
    fichiermanle,
    motif,
    numarticle,
    numcompte,
    nummatricule,
    quantiteservie,
  } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("commande")
      .update({
        datedemande,
        dateservie,
        destination,
        fichiermanle,
        motif,
        numarticle,
        numcompte,
        nummatricule,
        quantiteservie,
      })
      .eq("numbon", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/commande");
}

export async function deleteCommande(id: number) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from("commande").delete().eq("numbon", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/commande");
}

/* ---------------------------------------------------- */
/* DEMANDEUR CRUD                  */
/* ---------------------------------------------------- */

export async function addDemandeur(data: Omit<Demandeur, "nummatricule">) {
  const { nomdemandeur, numfonction, numtel } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("demandeur")
      .insert([{ nomdemandeur, numfonction, numtel }]);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/demandeur");
}

export async function upDateDemandeur(
  id: number,
  data: Omit<Demandeur, "nummatricule">
) {
  const { nomdemandeur, numfonction, numtel } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("demandeur")
      .update({ nomdemandeur, numfonction, numtel })
      .eq("nummatricule", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/demandeur");
}

export async function deleteDemandeur(id: number) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("demandeur")
      .delete()
      .eq("nummatricule", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/demandeur");
}

/* ---------------------------------------------------- */
/* COMMANDEMAGASIN CRUD                */
/* ---------------------------------------------------- */

export async function addCommandeMagazin(
  data: Omit<Commandemagasin, "numrecquisition">
) {
  const {
    dateemission,
    datelivraison,
    justification,
    numcompteadebite,
    nummagasin,
    observation,
    quantiteexpedie,
    typedemande,
  } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase.from("commandemagasin").insert([
      {
        dateemission,
        datelivraison,
        justification,
        numcompteadebite,
        nummagasin,
        observation,
        quantiteexpedie,
        typedemande,
      },
    ]);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/commande");
}

export async function upDateCommandeMagazin(
  id: number,
  data: Omit<Commandemagasin, "numrecquisition">
) {
  const {
    dateemission,
    datelivraison,
    justification,
    numcompteadebite,
    nummagasin,
    observation,
    quantiteexpedie,
    typedemande,
  } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("commandemagasin")
      .update({
        dateemission,
        datelivraison,
        justification,
        numcompteadebite,
        nummagasin,
        observation,
        quantiteexpedie,
        typedemande,
      })
      .eq("numrecquisition", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/commande");
}

export async function deleteCommandeMagazin(id: number) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("commandemagasin")
      .delete()
      .eq("numrecquisition", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/commande");
}

/* ---------------------------------------------------- */
/* FOURNISSEUR CRUD                 */
/* ---------------------------------------------------- */

export async function addFournisseur(data: Omit<Fournisseur, "idfour">) {
  const {
    avenue,
    commune,
    email,
    nomfournisseur,
    num,
    pays,
    province,
    tel,
    ville,
  } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase.from("fournisseur").insert([
      {
        avenue,
        commune,
        email,
        nomfournisseur,
        num,
        pays,
        province,
        tel,
        ville,
      },
    ]);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/fournisseur");
}

export async function upDateFournisseur(
  id: number,
  data: Omit<Fournisseur, "idfour">
) {
  const {
    avenue,
    commune,
    email,
    nomfournisseur,
    num,
    pays,
    province,
    tel,
    ville,
  } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("fournisseur")
      .update({
        avenue,
        commune,
        email,
        nomfournisseur,
        num,
        pays,
        province,
        tel,
        ville,
      })
      .eq("idfour", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/fournisseur");
}

export async function deleteFournisseur(id: number) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("fournisseur")
      .delete()
      .eq("idfour", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/fournisseur");
}

/* ---------------------------------------------------- */
/* BONRECEPTION CRUD                 */
/* ---------------------------------------------------- */

export async function addBonreception(data: Omit<Bonreception, "id">) {
  const {
    dateReceptionMarchandise,
    datereception,
    idfour,
    litigeeventuel,
    numarticle,
    numcommande,
    numlivr,
    ps,
    quantitecommandee,
    quantiterecues,
  } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase.from("bonreception").insert([
      {
        dateReceptionMarchandise,
        datereception,
        idfour,
        litigeeventuel,
        numarticle,
        numcommande,
        numlivr,
        ps,
        quantitecommandee,
        quantiterecues,
      },
    ]);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    console.log({ error });
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/bonreception");
}

export async function upDateBonreception(
  id: number,
  data: Omit<Bonreception, "id">
) {
  const {
    dateReceptionMarchandise,
    datereception,
    idfour,
    litigeeventuel,
    numarticle,
    numcommande,
    numlivr,
    ps,
    quantitecommandee,
    quantiterecues,
  } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("bonreception")
      .update({
        dateReceptionMarchandise,
        datereception,
        idfour,
        litigeeventuel,
        numarticle,
        numcommande,
        numlivr,
        ps,
        quantitecommandee,
        quantiterecues,
      })
      .eq("id", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/bonreception");
}

export async function deleteBonreception(id: number) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from("bonreception").delete().eq("id", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/fournisseur");
}

/* ---------------------------------------------------- */
/* INVENTAIREDETAIL CRUD               */
/* ---------------------------------------------------- */

export async function addInventaireDetail(data: InventaireDetail) {
  const { idventaire, numarticle, stockphysique } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("Inventairedetail")
      .insert([{ idventaire, numarticle, stockphysique }]);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/inventairedetail");
}

export async function upDateInventaireDetail(
  id: number,
  data: InventaireDetail
) {
  const { idventaire, numarticle, stockphysique } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("inventairedetail")
      .update({ idventaire, numarticle, stockphysique })
      .eq("id", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/inventairedetail");
}

export async function deleteInventaireDetail(id: number) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("inventairedetail")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/inventairedetail");
}

/* ---------------------------------------------------- */
/* INVENTAIRE CRUD                  */
/* ---------------------------------------------------- */

export async function addInventaire(data: Omit<Inventaire, "idventaire">) {
  const { dateinv } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase.from("inventaire").insert([{ dateinv }]);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/inventaire");
}

export async function upDateInventaire(
  id: number,
  data: Omit<Inventaire, "idventaire">
) {
  const { dateinv } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("inventaire")
      .update({ dateinv })
      .eq("idventaire", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/inventaire");
}

export async function deleteInventaire(id: number) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("inventaire")
      .delete()
      .eq("idventaire", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/inventaire");
}

/* ---------------------------------------------------- */
/* DETAILCOMMANDE CRUD                */
/* ---------------------------------------------------- */

export async function addDetailCommande(data: Detailcommande) {
  const {
    bo,
    nomarticle,
    numarticle,
    numrecquisition,
    quantiteafournir,
    quantitedemandee,
  } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase.from("detailcommande").insert([
      {
        bo,
        nomarticle,
        numarticle,
        numrecquisition,
        quantiteafournir,
        quantitedemandee,
      },
    ]);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/detailcommande");
}

export async function upDateDetailCommande(id: number, data: Detailcommande) {
  const {
    bo,
    nomarticle,
    numarticle,
    numrecquisition,
    quantiteafournir,
    quantitedemandee,
  } = data;

  const supabase = await createClient();
  try {
    // La mise à jour est basée sur numrecquisition car c'est l'ID dans votre code d'origine
    // mais attention, la clé primaire est (numarticle, numrecquisition)
    // Si numarticle change, il faut cibler les deux :
    const { error } = await supabase
      .from("detailcommande")
      .update({
        bo,
        nomarticle,
        quantiteafournir,
        quantitedemandee,
      })
      .eq("numrecquisition", id)
      .eq("numarticle", numarticle); // On utilise numarticle pour cibler

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/detailcommande");
}

export async function deleteDetailCommande(id: number, idpiece: number) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("detailcommande")
      .delete()
      .eq("numrecquisition", id)
      .eq("numarticle", idpiece);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/detailcommande");
}

/* ---------------------------------------------------- */
/* MAGASINDESTINATAIRE CRUD              */
/* ---------------------------------------------------- */

export async function addMagasinDestinataire(
  data: Omit<Magasindestinataire, "nummagasin">
) {
  const { nommagasin } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("magasindestinataire")
      .insert([{ nommagasin }]);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/magasindestinataire");
}

export async function upDateMagasinDestinataire(
  id: number,
  data: Omit<Magasindestinataire, "nummagasin">
) {
  const { nommagasin } = data;

  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("magasindestinataire")
      .update({ nommagasin })
      .eq("nummagasin", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/magasindestinataire");
}

export async function deleteMagasinDestinataire(id: number) {
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from("magasindestinataire")
      .delete()
      .eq("nummagasin", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Erreur lors de l'opération");
    }
  } catch (error) {
    throw new Error("Erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/magasindestinataire");
}

/* ---------------------------------------------------- */
/* USER CRUD */
/* ---------------------------------------------------- */

export async function addUser(data: Omit<User, "id">) {
  const { nom, email, password } = data;
  const saltRounds = 10; // Un coût de hachage standard, plus la valeur est élevée, plus le hachage est lent et sécurisé.
  const supabase = await createClient();

  try {
    // Hacher le mot de passe avant de l'insérer
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { error } = await supabase
      .from("users")
      .insert([{ nom, email, password: hashedPassword }]); // Utiliser le mot de passe haché

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Opération fail");
    }
  } catch (error) {
    throw new Error("Opération fail");
  }
  revalidate();
  redirect("/dashboard/users");
}

export async function upDateUser(id: number, data: Omit<User, "id">) {
  const { nom, email, password } = data;
  const saltRounds = 10;

  try {
    // Hacher le nouveau mot de passe s'il est fourni
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const supabase = await createClient();

    const { error } = await supabase
      .from("users")
      .update({ nom, email, password: hashedPassword }) // Utiliser le mot de passe haché
      .eq("id", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Opération fail");
    }
  } catch (error) {
    console.log({ error });
    throw new Error("Opération fail");
  }
  revalidate();
  redirect("/dashboard/users");
}

export async function deleteUser(id: number) {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      console.error("Supabase Error:", error);
      throw new Error("Opération fail");
    }
  } catch (error) {
    throw new Error("Opération fail");
  }
  revalidate();
  redirect("/dashboard/users");
}

// /* ---------------------------------------------------- */
// /* AUTHENTIFICATION */
// /* ---------------------------------------------------- */

// export async function handlelogin(data: { email: string; mdp: string }) {
//   const { email, mdp } = data;
//   const supabase = await createClient();

//   try {
//     // Récupérer l'utilisateur par son email
//     const { data: rows, error } = await supabase
//       .from("users")
//       .select("id, nom, email, password") // Il faut aussi récupérer le mot de passe haché
//       .eq("email", email)
//       .limit(1);

//     if (error) {
//       console.error("Supabase Error:", error);
//       return { data: {}, role: "" };
//     }

//     if (rows && rows.length === 1) {
//       const user = rows[0];
//       // Comparer le mot de passe fourni par l'utilisateur avec le mot de passe haché de la base de données
//       const isPasswordValid = await bcrypt.compare(mdp, user.password);

//       if (isPasswordValid) {
//         // Le mot de passe est correct
//         return {
//           data: {
//             id: user.id,
//             nom: user.nom,
//             email: user.email,
//           },
//           role: user.email,
//         };
//       }
//     }

//     // Si l'utilisateur n'est pas trouvé ou si le mot de passe est invalide
//     return {
//       data: {},
//       role: "",
//     };
//   } catch (error) {
//     console.error("Login Error:", error);
//     return { data: {}, role: "" };
//   }
// }
