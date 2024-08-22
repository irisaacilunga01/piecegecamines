import {
  Commandemagasin,
  Bonreception,
  Commande,
  Demandeur,
  Detailcommande,
  Fournisseur,
  Inventaire,
  InventaireDetail,
  Magasindestinataire,
  Piece,
} from "./types";
export const pieces: Piece[] = [
  {
    numarticle: 1,
    nomarticle: "Vis M5",
    quantite: 100,
    specification: "Vis à tête hexagonale, 5mm de diamètre",
    uc: "pièce",
    quantitealerte: 20,
    butler: "A1",
    etagere: "E1",
    trave: "T1",
    rayon: "R1",
    poids: 0.01,
  },
  {
    numarticle: 2,
    nomarticle: "Écrou M5",
    quantite: 200,
    specification: "Écrou hexagonal, 5mm de diamètre",
    uc: "pièce",
    quantitealerte: 30,
    butler: "A2",
    etagere: "E2",
    trave: "T2",
    rayon: "R2",
    poids: 0.005,
  },
  {
    numarticle: 3,
    nomarticle: "Rondelle M5",
    quantite: 300,
    specification: "Rondelle plate, 5mm de diamètre intérieur",
    uc: "pièce",
    quantitealerte: 50,
    butler: "A3",
    etagere: "E3",
    trave: "T3",
    rayon: "R3",
    poids: 0.002,
  },
];
export const demandeurs: Demandeur[] = [
  {
    nummatricule: 1,
    nomdemandeur: "Jean KABAMBA",
    numfonction: "Responsable Achats",
    numtel: "+243812345678",
  },
  {
    nummatricule: 2,
    nomdemandeur: "Marie LUKUSA",
    numfonction: "Chef de Projet",
    numtel: "+243815678910",
  },
  {
    nummatricule: 3,
    nomdemandeur: "Alain MBUYI",
    numfonction: "Technicien Maintenance",
    numtel: "+243822345678",
  },
];
export const commandes: Commande[] = [
  {
    numbon: 1,
    datedemande: new Date("2024-01-15"),
    numcompte: "CPT-001",
    destination: "Magasin Central",
    motif: "Réapprovisionnement",
    fichiermanle: "manle1.pdf",
    quantiteservie: 50,
    dateservie: new Date("2024-01-18"),
    nummatricule: 1, // Jean KABAMBA
    numarticle: 1, // Vis M5
  },
  {
    numbon: 2,
    datedemande: new Date("2024-02-20"),
    numcompte: "CPT-002",
    destination: "Atelier de Production",
    motif: "Nouvelle commande",
    fichiermanle: "manle2.pdf",
    quantiteservie: 150,
    dateservie: new Date("2024-02-22"),
    nummatricule: 2, // Marie LUKUSA
    numarticle: 2, // Écrou M5
  },
  {
    numbon: 3,
    datedemande: new Date("2024-03-05"),
    numcompte: "CPT-003",
    destination: "Entrepôt Nord",
    motif: "Stock de sécurité",
    fichiermanle: "manle3.pdf",
    quantiteservie: 200,
    dateservie: new Date("2024-03-08"),
    nummatricule: 3, // Alain MBUYI
    numarticle: 3, // Rondelle M5
  },
];
export const commandemagasins: Commandemagasin[] = [
  {
    numrecquisition: 1,
    dateemission: new Date("2024-01-10"),
    datelivraison: new Date("2024-01-15"),
    typedemande: "Réapprovisionnement",
    quantiteexpedie: 100,
    justification: "Besoin urgent de pièces pour la maintenance",
    observation: "Livré à temps",
    numcompteadebite: "CPT-001",
    nummagasin: 1, // Magasin Central
  },
  {
    numrecquisition: 2,
    dateemission: new Date("2024-02-05"),
    datelivraison: new Date("2024-02-10"),
    typedemande: "Nouvelle commande",
    quantiteexpedie: 150,
    justification: "Production en cours",
    observation: "Rien à signaler",
    numcompteadebite: "CPT-002",
    nummagasin: 2, // Atelier de Production
  },
  {
    numrecquisition: 3,
    dateemission: new Date("2024-03-01"),
    datelivraison: new Date("2024-03-06"),
    typedemande: "Stock de sécurité",
    quantiteexpedie: 200,
    justification: "Préparation pour la saison haute",
    observation: "Livré en avance",
    numcompteadebite: "CPT-003",
    nummagasin: 3, // Entrepôt Nord
  },
];
export const fournisseurs: Fournisseur[] = [
  {
    idfour: 1,
    nomfournisseur: "Matériaux Industriels",
    email: "contact@mindustries.cd",
    tel: "+243810123456",
    num: "5",
    avenue: "Avenue de l'Industrie",
    commune: "Kampumpi",
    ville: "Likasi",
    province: "Haut Katanga",
    pays: "RDC",
  },
  {
    idfour: 2,
    nomfournisseur: "Technologie Minérale",
    email: "sales@techmin.cd",
    tel: "+243811234567",
    num: "10",
    avenue: "Avenue de la Mine",
    commune: "Kampumpi",
    ville: "Kolwezi",
    province: "Lualaba",
    pays: "RDC",
  },
  {
    idfour: 3,
    nomfournisseur: "Fournitures Générales",
    email: "info@fourgene.cd",
    tel: "+243812345678",
    num: "22",
    avenue: "Avenue des Entrepreneurs",
    commune: "Kampumpi",
    ville: "Lubumbashi",
    province: "Haut Katanga",
    pays: "RDC",
  },
];
export const bonreceptions: Bonreception[] = [
  {
    id: 1,
    datereception: new Date("2024-01-20"),
    numcommande: "CMD-001",
    numlivr: "LIV-001",
    dateReceptionMarchandise: new Date("2024-01-21"),
    quantitecommandee: 100,
    quantiterecues: 98,
    ps: "2 pièces manquantes",
    litigeeventuel: "Litige en cours",
    numarticle: 1, // Vis M5
    idfour: 1, // Matériaux Industriels
  },
  {
    id: 2,
    datereception: new Date("2024-02-25"),
    numcommande: "CMD-002",
    numlivr: "LIV-002",
    dateReceptionMarchandise: new Date("2024-02-26"),
    quantitecommandee: 150,
    quantiterecues: 150,
    ps: "Aucun problème",
    litigeeventuel: "Aucun",
    numarticle: 2, // Écrou M5
    idfour: 2, // Technologie Minérale
  },
  {
    id: 3,
    datereception: new Date("2024-03-10"),
    numcommande: "CMD-003",
    numlivr: "LIV-003",
    dateReceptionMarchandise: new Date("2024-03-11"),
    quantitecommandee: 200,
    quantiterecues: 200,
    ps: "Parfait état",
    litigeeventuel: "Aucun",
    numarticle: 3, // Rondelle M5
    idfour: 3, // Fournitures Générales
  },
];
export const inventaires: Inventaire[] = [
  {
    idventaire: 1,
    dateinv: new Date("2024-04-01"),
  },
  {
    idventaire: 2,
    dateinv: new Date("2024-05-01"),
  },
  {
    idventaire: 3,
    dateinv: new Date("2024-06-01"),
  },
];
export const detailcommandes: Detailcommande[] = [
  {
    numarticle: 1, // Vis M5
    nomarticle: "Vis M5",
    bo: "Bon de Commande 001",
    quantiteafournir: 50,
    quantitedemandee: 50,
    numrecquisition: 1, // Réquisition 001
  },
  {
    numarticle: 2, // Écrou M5
    nomarticle: "Écrou M5",
    bo: "Bon de Commande 002",
    quantiteafournir: 150,
    quantitedemandee: 150,
    numrecquisition: 2, // Réquisition 002
  },
  {
    numarticle: 3, // Rondelle M5
    nomarticle: "Rondelle M5",
    bo: "Bon de Commande 003",
    quantiteafournir: 200,
    quantitedemandee: 200,
    numrecquisition: 3, // Réquisition 003
  },
];
export const magasindestinataires: Magasindestinataire[] = [
  {
    nummagasin: 1,
    nommagasin: "Magasin Central",
  },
  {
    nummagasin: 2,
    nommagasin: "Atelier de Production",
  },
  {
    nummagasin: 3,
    nommagasin: "Entrepôt Nord",
  },
];
export const inventaireDetails: InventaireDetail[] = [
  {
    id: 1,
    stockphysique: 98,
    ecart: 2,
    numarticle: 1, // Vis M5
    idventaire: 1, // Inventaire du 2024-04-01
  },
  {
    id: 2,
    stockphysique: 150,
    ecart: 0,
    numarticle: 2, // Écrou M5
    idventaire: 2, // Inventaire du 2024-05-01
  },
  {
    id: 3,
    stockphysique: 198,
    ecart: 2,
    numarticle: 3, // Rondelle M5
    idventaire: 3, // Inventaire du 2024-06-01
  },
];
