"use server";
import { sql } from "@vercel/postgres";
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

  try {
    await sql`
    INSERT INTO piece (butler,etagere,nomarticle,poids,quantite,quantitealerte,rayon,specification,trave,uc,imageurl)
    VALUES (${butler},${etagere},${nomarticle},${poids},${quantite},${quantitealerte},${rayon},${specification},${trave},${uc},${imageurl});
  `;
  } catch (error) {
    console.log({ error });

    throw new Error("erreur lors de l'opération");
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
  try {
    await sql`
    UPDATE piece
SET butler=${butler},etagere=${etagere},nomarticle=${nomarticle},poids=${poids},quantite=${quantite},quantitealerte=${quantitealerte},rayon=${rayon},specification=${specification},trave=${trave},uc=${uc}
WHERE numarticle=${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/piece");
}
export async function deletePiece(id: number) {
  try {
    await sql`
    DELETE FROM piece
    WHERE numarticle = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/piece");
}

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
  try {
    await sql`
    INSERT INTO commande (datedemande,dateservie,destination,fichiermanle,motif,numarticle,numcompte,nummatricule,quantiteservie)
    VALUES (${datedemande},${dateservie},${destination},${fichiermanle},${motif},${numarticle},${numcompte},${nummatricule},${quantiteservie});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
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
  console.log({
    datedemande,
    dateservie,
    destination,
    fichiermanle,
    motif,
    numarticle,
    numcompte,
    nummatricule,
    quantiteservie,
  });

  try {
    await sql`
        UPDATE commade
    SET datedemande=${datedemande},dateservie=${dateservie},destination=${destination},fichiermanle=${fichiermanle},motif=${motif},numcompte=${numcompte},nummatricule=${nummatricule},quantiteservie=${quantiteservie} numarticle=${numarticle}
    WHERE numbon = ${id};
      `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/commande");
}
export async function deleteCommande(id: number) {
  try {
    await sql`
    DELETE FROM commande
    WHERE numbon = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/commande");
}

export async function addDemandeur(data: Omit<Demandeur, "nummatricule">) {
  const { nomdemandeur, numfonction, numtel } = data;
  try {
    await sql`
    INSERT INTO demandeur (nomdemandeur,numfonction,numtel)
    VALUES (${nomdemandeur},${numfonction},${numtel});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/demandeur");
}
export async function upDateDemandeur(
  id: number,
  data: Omit<Demandeur, "nummatricule">
) {
  const { nomdemandeur, numfonction, numtel } = data;
  try {
    await sql`
    UPDATE demandeur
SET  nomdemandeur=${nomdemandeur},numfonction=${numfonction},numtel=${numtel}
WHERE nummatricule = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/demandeur");
}
export async function deleteDemandeur(id: number) {
  try {
    await sql`
    DELETE FROM demandeur
    WHERE nummatricule = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/demandeur");
}

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

  try {
    await sql`
    INSERT INTO commandemagasin (dateemission,datelivraison,justification,numcompteadebite,nummagasin,observation,quantiteexpedie,typedemande)
    VALUES (${dateemission},${datelivraison},${justification},${numcompteadebite},${nummagasin},${observation},${quantiteexpedie},${typedemande});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/commandemagazin");
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
  try {
    await sql`
    UPDATE commandemagasin
SET  dateemission=${dateemission},datelivraison=${datelivraison},justification=${justification},numcompteadebite=${numcompteadebite},nummagasin=${nummagasin},observation=${observation},quantiteexpedie=${quantiteexpedie},typedemande=${typedemande} WHERE numrecquisition = ${id};`;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/commandemagasin");
}
export async function deleteCommandeMagazin(id: number) {
  try {
    await sql`
    DELETE FROM commandemagasin
    WHERE numrecquisition = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/commandemagasin");
}

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
  try {
    await sql`
    INSERT INTO fournisseur (avenue, commune, email, nomfournisseur, num,pays,province,tel,ville)
    VALUES (${avenue},${commune},${email},${nomfournisseur},${num},${pays},${province},${tel},${ville});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
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
  try {
    await sql`
    UPDATE fournisseur
SET  avenue=${avenue}, commune=${commune}, email=${email}, nomfournisseur=${nomfournisseur}, num=${num},pays=${pays},province=${province},tel=${tel},ville=${ville}
WHERE idfour = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/fournisseur");
}
export async function deleteFournisseur(id: number) {
  try {
    await sql`
    DELETE FROM fournisseur
    WHERE idfour = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/fournisseur");
}

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
  try {
    await sql`
    INSERT INTO fournisseur (dateReceptionMarchandise,datereception,idfour,litigeeventuel,numarticle,numcommande,numlivr,ps,quantitecommandee,quantiterecues)
    VALUES (${dateReceptionMarchandise},${datereception},${idfour},${litigeeventuel},${numarticle},${numcommande},${numlivr},${ps},${quantitecommandee},${quantiterecues});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
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
  try {
    await sql`
    UPDATE bonreception
SET  dateReceptionMarchandise=${dateReceptionMarchandise},datereception=${datereception},idfour=${idfour},litigeeventuel=${litigeeventuel},numarticle=${numarticle},numcommande=${numcommande},numlivr=${numlivr},ps=${ps},quantitecommandee=${quantitecommandee},quantiterecues=${quantiterecues}
WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/bonreception");
}
export async function deleteBonreception(id: number) {
  try {
    await sql`
    DELETE FROM bonreception
    WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/fournisseur");
}

export async function addInventaireDetail(data: InventaireDetail) {
  const { idventaire, numarticle, stockphysique } = data;
  try {
    await sql`
    INSERT INTO Inventairedetail (idventaire,numarticle,stockphysique)
    VALUES (${idventaire},${numarticle},${stockphysique});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/inventairedetail");
}
export async function upDateInventaireDetail(
  id: number,
  data: InventaireDetail
) {
  const { idventaire, numarticle, stockphysique } = data;
  try {
    await sql`
    UPDATE inventairedetail
SET idventaire=${idventaire},numarticle=${numarticle},stockphysique=${stockphysique}
WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/inventairedetail");
}
export async function deleteInventaireDetail(id: number) {
  try {
    await sql`
    DELETE FROM inventairedetail
    WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/inventairedetail");
}

export async function addInventaire(data: Omit<Inventaire, "idventaire">) {
  const { dateinv } = data;
  try {
    await sql`
    INSERT INTO inventaire (dateinv)
    VALUES (${dateinv});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/inventaire");
}
export async function upDateInventaire(
  id: number,
  data: Omit<Inventaire, "idventaire">
) {
  const { dateinv } = data;
  try {
    await sql`UPDATE inventaire
SET  dateinv=${dateinv}
WHERE idventaire = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/inventaire");
}
export async function deleteInventaire(id: number) {
  try {
    await sql`
    DELETE FROM inventaire
    WHERE idventaire = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/inventaire");
}

export async function addDetailCommande(data: Detailcommande) {
  const {
    bo,
    nomarticle,
    numarticle,
    numrecquisition,
    quantiteafournir,
    quantitedemandee,
  } = data;
  try {
    await sql`
    INSERT INTO detailcommande (bo,nomarticle,numarticle,numrecquisition,quantiteafournir,quantitedemandee)
    VALUES (${bo},${nomarticle},${numarticle},${numrecquisition},${quantiteafournir},${quantitedemandee});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
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
  try {
    await sql`
    UPDATE detailcommande
SET bo=${bo},nomarticle=${nomarticle},numarticle=${numarticle},numrecquisition=${numrecquisition},quantiteafournir=${quantiteafournir},quantitedemandee=${quantitedemandee}
WHERE numrecquisition = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/detailcommande");
}
export async function deleteDetailCommande(id: number, idpiece: number) {
  try {
    await sql`
    DELETE FROM detailcommande
    WHERE numrecquisition = ${id} AND numarticle=${idpiece};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/detailcommande");
}

export async function addMagasinDestinataire(
  data: Omit<Magasindestinataire, "nummagasin">
) {
  const { nommagasin } = data;
  try {
    await sql`
    INSERT INTO magasindestinataire (nommagasin)
    VALUES (${nommagasin});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/magasindestinataire");
}
export async function upDateMagasinDestinataire(
  id: number,
  data: Omit<Magasindestinataire, "nummagasin">
) {
  const { nommagasin } = data;
  try {
    await sql`
    UPDATE magasindestinataire SET nommagasin=${nommagasin} WHERE nummagasin = ${id}; `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/magasindestinataire");
}
export async function deleteMagasinDestinataire(id: number) {
  try {
    await sql`
    DELETE FROM magasindestinataire
    WHERE nummagasin = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/magasindestinataire");
}

export async function addUser(data: Omit<User, "id">) {
  const { nom, email, password } = data;
  try {
    await sql`
    INSERT INTO users (nom, email, password,niveauautorisation)
    VALUES (${nom}, ${email}, ${password});
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/users");
}
export async function upDateUser(id: number, data: Omit<User, "id">) {
  const { nom, email, password } = data;
  try {
    await sql`
    UPDATE users
SET nom = ${nom},
    email = ${email},
    password = ${password},
WHERE id = ${id};  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/users");
}
export async function deleteUser(id: number) {
  try {
    await sql`
    DELETE FROM users
    WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/users");
}

export async function handlelogin(data: { email: string; mdp: string }) {
  const { email, mdp } = data;

  const { rows, rowCount } =
    await sql<User>`SELECT * from users WHERE email=${email} AND password=${mdp};`;

  if (rowCount != null && rowCount >= 1) {
    const { id, nom, email } = rows[0];
    return {
      data: {
        id,
        nom,
      },
      role: email,
    };
  } else {
    return {
      data: {},
      role: "",
    };
  }
}
