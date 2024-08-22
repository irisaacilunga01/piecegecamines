export type Piece = {
  numarticle: string | number;
  nomarticle: string;
  quantite: number;
  specification: string;
  uc: string;
  quantitealerte: number;
  butler: string;
  etagere: string;
  trave: string;
  rayon: string;
  poids: number;
  imageurl?: string;
};

export type Demandeur = {
  nummatricule: string | number;
  nomdemandeur: string;
  numfonction: string;
  numtel: string;
};

export type Commande = {
  numbon: string | number;
  datedemande: string;
  numcompte: string;
  destination: string;
  motif: string;
  fichiermanle: string;
  quantiteservie: number;
  dateservie: string;
  nummatricule: string | number; // Foreign key
  nomarticle?: string;
  nomdemandeur?: string;
  numarticle: string | number; // Foreign key
};

export type Commandemagasin = {
  numrecquisition: string | number;
  dateemission: string;
  datelivraison: string;
  typedemande: string;
  quantiteexpedie: number;
  justification: string;
  observation: string;
  numcompteadebite: string;
  nummagasin: string | number; // Foreign key
  nommagasin?: string;
};

export type Fournisseur = {
  idfour: string | number;
  nomfournisseur: string;
  email: string;
  tel: string;
  num: string;
  avenue: string;
  commune: string;
  ville: string;
  province: string;
  pays: string;
};

export type Bonreception = {
  id: string | number;
  datereception: string;
  numcommande: string;
  numlivr: string;
  dateReceptionMarchandise: string;
  quantitecommandee: number;
  quantiterecues: number;
  ps: string;
  litigeeventuel: string;
  numarticle: string | number; // Foreign key
  nomarticle?: string; // Foreign key
  nomfour?: string; // Foreign key
  idfour: string | number; // Foreign key
};

export type Inventaire = {
  idventaire: string | number;
  dateinv: string;
};

export type InventaireDetail = {
  stockphysique: number;
  id?: number;
  ecart?: number;
  numarticle: string | number; // Foreign key
  idventaire: string | number; // Foreign key
};

export type Detailcommande = {
  numarticle: string | number; // Foreign key
  nomarticle?: string;
  bo: string;
  quantiteafournir: number;
  quantitedemandee: number;
  numrecquisition: string | number; // Foreign key
};

export type Magasindestinataire = {
  nummagasin: string | number;
  nommagasin: string;
};
export type User = {
  id: number;
  nom: string;
  email: string;
  password: string;
};
