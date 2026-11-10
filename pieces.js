
import { ajoutListenersAvis } from "./avis.js";

const reponse = await fetch("http://localhost:8081/pieces");
const pieces = await reponse.json();

function genererPieces(listePieces) {
    const sectionFiches = document.querySelector(".fiches");

    for (let i = 0; i < listePieces.length; i++) {
        const article = listePieces[i];

        const pieceElement = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.src = article.image;

        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;

        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";

        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

        // Création du bouton Afficher les avis
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";

        // Ajout des éléments à la fiche produit
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(disponibiliteElement);
        pieceElement.appendChild(avisBouton);

        sectionFiches.appendChild(pieceElement);
    }

    // Activation des boutons Afficher les avis
    ajoutListenersAvis();
}

// Affichage initial des produits
genererPieces(pieces);

// Trier par prix croissants
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort((a, b) => a.prix - b.prix);

    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesOrdonnees);
});

// Filtrer les pièces abordables
const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter((piece) => piece.prix <= 35);

    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesFiltrees);
});

// Filtrer les pièces avec description
const boutonDescription = document.querySelector(".btn-description");

boutonDescription.addEventListener("click", () => {
    const piecesAvecDescription = pieces.filter((piece) => piece.description !== undefined);

    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesAvecDescription);
});

// Trier par prix décroissants
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort((a, b) => b.prix - a.prix);

    document.querySelector(".fiches").innerHTML = '';
    genererPieces(piecesOrdonnees);
});