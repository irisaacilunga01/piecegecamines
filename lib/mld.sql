--SUPABASE

-- Table Piece
CREATE TABLE Piece (
    numarticle bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nomarticle VARCHAR(255) NOT NULL,
    quantite INT NOT NULL,
    specification TEXT,
    uc VARCHAR(50),
    quantitealerte INT,
    butler VARCHAR(255),
    etagere VARCHAR(255),
    trave VARCHAR(255),
    rayon VARCHAR(255),
    poids DECIMAL(10, 2),
    imageurl TEXT -- Ajouté car utilisé dans actions.ts
);
ALTER TABLE Piece ENABLE ROW LEVEL SECURITY;
-- Politique de base : permettre la lecture publique (ajustez selon vos besoins de sécurité !)
CREATE POLICY "Public read access for Piece"
ON Piece FOR SELECT TO public
USING (true);

---

-- Table Demandeur
CREATE TABLE Demandeur (
    nummatricule bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nomdemandeur VARCHAR(255) NOT NULL,
    numfonction VARCHAR(255),
    numtel VARCHAR(50)
);
ALTER TABLE Demandeur ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for Demandeur"
ON Demandeur FOR SELECT TO public
USING (true);

---

-- Table Magasindestinataire
CREATE TABLE Magasindestinataire (
    nummagasin bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nommagasin VARCHAR(255) NOT NULL
);
ALTER TABLE Magasindestinataire ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for Magasindestinataire"
ON Magasindestinataire FOR SELECT TO public
USING (true);

---

-- Table Commande
CREATE TABLE Commande (
    numbon bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    datedemande DATE NOT NULL,
    numcompte VARCHAR(255),
    destination VARCHAR(255),
    motif TEXT,
    fichiermanle TEXT,
    quantiteservie INT,
    dateservie DATE,
    nummatricule INT REFERENCES Demandeur(nummatricule) ON DELETE RESTRICT,
    numarticle INT REFERENCES Piece(numarticle) ON DELETE RESTRICT
);
ALTER TABLE Commande ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for Commande"
ON Commande FOR SELECT TO public
USING (true);

---

-- Table Commandemagasin
CREATE TABLE Commandemagasin (
    numrecquisition bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    dateemission DATE NOT NULL,
    datelivraison DATE,
    typedemande VARCHAR(255),
    quantiteexpedie INT,
    justification TEXT,
    observation TEXT,
    numcompteadebite VARCHAR(255),
    nummagasin INT REFERENCES Magasindestinataire(nummagasin) ON DELETE RESTRICT
);
ALTER TABLE Commandemagasin ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for Commandemagasin"
ON Commandemagasin FOR SELECT TO public
USING (true);

---

-- Table Fournisseur
CREATE TABLE Fournisseur (
    idfour bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nomfournisseur VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    tel VARCHAR(50),
    num VARCHAR(50),
    avenue VARCHAR(255),
    commune VARCHAR(255),
    ville VARCHAR(255),
    province VARCHAR(255),
    pays VARCHAR(255)
);
ALTER TABLE Fournisseur ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for Fournisseur"
ON Fournisseur FOR SELECT TO public
USING (true);

---

-- Table Bonreception
CREATE TABLE Bonreception (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    datereception DATE NOT NULL,
    numcommande VARCHAR(255),
    numlivr VARCHAR(255),
    dateReceptionMarchandise DATE,
    quantitecommandee INT,
    quantiterecues INT,
    ps TEXT,
    litigeeventuel TEXT,
    numarticle INT REFERENCES Piece(numarticle) ON DELETE RESTRICT,
    idfour INT REFERENCES Fournisseur(idfour) ON DELETE RESTRICT
);
ALTER TABLE Bonreception ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for Bonreception"
ON Bonreception FOR SELECT TO public
USING (true);

---

-- Table Inventaire
CREATE TABLE Inventaire (
    idventaire bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    dateinv DATE NOT NULL
);
ALTER TABLE Inventaire ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for Inventaire"
ON Inventaire FOR SELECT TO public
USING (true);

---

-- Table InventaireDetail
CREATE TABLE InventaireDetail (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    stockphysique INT,
    ecart INT,
    numarticle INT REFERENCES Piece(numarticle) ON DELETE RESTRICT,
    idventaire INT REFERENCES Inventaire(idventaire) ON DELETE RESTRICT
);
ALTER TABLE InventaireDetail ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for InventaireDetail"
ON InventaireDetail FOR SELECT TO public
USING (true);

---

-- Table Detailcommande
CREATE TABLE Detailcommande (
    numarticle INT REFERENCES Piece(numarticle) ON DELETE RESTRICT,
    nomarticle VARCHAR(255) NOT NULL,
    bo TEXT,
    quantiteafournir INT,
    quantitedemandee INT,
    numrecquisition INT REFERENCES Commandemagasin(numrecquisition) ON DELETE RESTRICT,
    PRIMARY KEY (numarticle, numrecquisition)
);
ALTER TABLE Detailcommande ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for Detailcommande"
ON Detailcommande FOR SELECT TO public
USING (true);

---

-- Table users (pour l'authentification/gestion des utilisateurs)
CREATE TABLE users (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for users"
ON users FOR SELECT TO public
USING (true);
-- CREATE TABLE Piece (
--     numarticle SERIAL PRIMARY KEY,
--     nomarticle VARCHAR(255) NOT NULL,
--     quantite INT NOT NULL,
--     specification TEXT,
--     uc VARCHAR(50),
--     quantitealerte INT,
--     butler VARCHAR(255),
--     etagere VARCHAR(255),
--     trave VARCHAR(255),
--     rayon VARCHAR(255),
--     poids DECIMAL(10, 2)
-- );

-- CREATE TABLE Demandeur (
--     nummatricule SERIAL PRIMARY KEY,
--     nomdemandeur VARCHAR(255) NOT NULL,
--     numfonction VARCHAR(255),
--     numtel VARCHAR(50)
-- );

-- CREATE TABLE Commande (
--     numbon SERIAL PRIMARY KEY,
--     datedemande DATE NOT NULL,
--     numcompte VARCHAR(255),
--     destination VARCHAR(255),
--     motif TEXT,
--     fichiermanle TEXT,
--     quantiteservie INT,
--     dateservie DATE,
--     nummatricule INT,
--     numarticle INT,
--     FOREIGN KEY (nummatricule) REFERENCES Demandeur(nummatricule),
--     FOREIGN KEY (numarticle) REFERENCES Piece(numarticle)
-- );

-- CREATE TABLE Commandemagasin (
--     numrecquisition SERIAL PRIMARY KEY,
--     dateemission DATE NOT NULL,
--     datelivraison DATE,
--     typedemande VARCHAR(255),
--     quantiteexpedie INT,
--     justification TEXT,
--     observation TEXT,
--     numcompteadebite VARCHAR(255),
--     nummagasin INT,
--     FOREIGN KEY (nummagasin) REFERENCES Magasindestinataire(nummagasin)
-- );

-- CREATE TABLE Fournisseur (
--     idfour SERIAL PRIMARY KEY,
--     nomfournisseur VARCHAR(255) NOT NULL,
--     email VARCHAR(255),
--     tel VARCHAR(50),
--     num VARCHAR(50),
--     avenue VARCHAR(255),
--     commune VARCHAR(255),
--     ville VARCHAR(255),
--     province VARCHAR(255),
--     pays VARCHAR(255)
-- );

-- CREATE TABLE Bonreception (
--     id SERIAL PRIMARY KEY,
--     datereception DATE NOT NULL,
--     numcommande VARCHAR(255),
--     numlivr VARCHAR(255),
--     dateReceptionMarchandise DATE,
--     quantitecommandee INT,
--     quantiterecues INT,
--     ps TEXT,
--     litigeeventuel TEXT,
--     numarticle INT,
--     idfour INT,
--     FOREIGN KEY (numarticle) REFERENCES Piece(numarticle),
--     FOREIGN KEY (idfour) REFERENCES Fournisseur(idfour)
-- );

-- CREATE TABLE Inventaire (
--     idventaire SERIAL PRIMARY KEY,
--     dateinv DATE NOT NULL
-- );

-- CREATE TABLE InventaireDetail (
--     id SERIAL PRIMARY KEY,
--     stockphysique INT,
--     ecart INT,
--     numarticle INT,
--     idventaire INT,
--     FOREIGN KEY (numarticle) REFERENCES Piece(numarticle),
--     FOREIGN KEY (idventaire) REFERENCES Inventaire(idventaire)
-- );

-- CREATE TABLE Detailcommande (
--     numarticle INT,
--     nomarticle VARCHAR(255) NOT NULL,
--     bo TEXT,
--     quantiteafournir INT,
--     quantitedemandee INT,
--     numrecquisition INT,
--     PRIMARY KEY (numarticle, numrecquisition),
--     FOREIGN KEY (numarticle) REFERENCES Piece(numarticle),
--     FOREIGN KEY (numrecquisition) REFERENCES Commandemagasin(numrecquisition)
-- );

-- CREATE TABLE Magasindestinataire (
--     nummagasin SERIAL PRIMARY KEY,
--     nommagasin VARCHAR(255) NOT NULL
-- );
