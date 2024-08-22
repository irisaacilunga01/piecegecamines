CREATE TABLE Piece (
    numarticle SERIAL PRIMARY KEY,
    nomarticle VARCHAR(255) NOT NULL,
    quantite INT NOT NULL,
    specification TEXT,
    uc VARCHAR(50),
    quantitealerte INT,
    butler VARCHAR(255),
    etagere VARCHAR(255),
    trave VARCHAR(255),
    rayon VARCHAR(255),
    poids DECIMAL(10, 2)
);

CREATE TABLE Demandeur (
    nummatricule SERIAL PRIMARY KEY,
    nomdemandeur VARCHAR(255) NOT NULL,
    numfonction VARCHAR(255),
    numtel VARCHAR(50)
);

CREATE TABLE Commande (
    numbon SERIAL PRIMARY KEY,
    datedemande DATE NOT NULL,
    numcompte VARCHAR(255),
    destination VARCHAR(255),
    motif TEXT,
    fichiermanle TEXT,
    quantiteservie INT,
    dateservie DATE,
    nummatricule INT,
    numarticle INT,
    FOREIGN KEY (nummatricule) REFERENCES Demandeur(nummatricule),
    FOREIGN KEY (numarticle) REFERENCES Piece(numarticle)
);

CREATE TABLE Commandemagasin (
    numrecquisition SERIAL PRIMARY KEY,
    dateemission DATE NOT NULL,
    datelivraison DATE,
    typedemande VARCHAR(255),
    quantiteexpedie INT,
    justification TEXT,
    observation TEXT,
    numcompteadebite VARCHAR(255),
    nummagasin INT,
    FOREIGN KEY (nummagasin) REFERENCES Magasindestinataire(nummagasin)
);

CREATE TABLE Fournisseur (
    idfour SERIAL PRIMARY KEY,
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

CREATE TABLE Bonreception (
    id SERIAL PRIMARY KEY,
    datereception DATE NOT NULL,
    numcommande VARCHAR(255),
    numlivr VARCHAR(255),
    dateReceptionMarchandise DATE,
    quantitecommandee INT,
    quantiterecues INT,
    ps TEXT,
    litigeeventuel TEXT,
    numarticle INT,
    idfour INT,
    FOREIGN KEY (numarticle) REFERENCES Piece(numarticle),
    FOREIGN KEY (idfour) REFERENCES Fournisseur(idfour)
);

CREATE TABLE Inventaire (
    idventaire SERIAL PRIMARY KEY,
    dateinv DATE NOT NULL
);

CREATE TABLE InventaireDetail (
    id SERIAL PRIMARY KEY,
    stockphysique INT,
    ecart INT,
    numarticle INT,
    idventaire INT,
    FOREIGN KEY (numarticle) REFERENCES Piece(numarticle),
    FOREIGN KEY (idventaire) REFERENCES Inventaire(idventaire)
);

CREATE TABLE Detailcommande (
    numarticle INT,
    nomarticle VARCHAR(255) NOT NULL,
    bo TEXT,
    quantiteafournir INT,
    quantitedemandee INT,
    numrecquisition INT,
    PRIMARY KEY (numarticle, numrecquisition),
    FOREIGN KEY (numarticle) REFERENCES Piece(numarticle),
    FOREIGN KEY (numrecquisition) REFERENCES Commandemagasin(numrecquisition)
);

CREATE TABLE Magasindestinataire (
    nummagasin SERIAL PRIMARY KEY,
    nommagasin VARCHAR(255) NOT NULL
);
