import Handlebars from "handlebars";
import { Photo, Categorie, Comment } from "./photoloader";
import { BASE_URL } from "./config";

export function displayPicture(photo: Photo): void {
    const templateSource = document.getElementById("photoTemplate")!.innerHTML;
    const template = Handlebars.compile(templateSource);
    const html = template({
        titre: photo.titre,
        descr: photo.descr,
        type: photo.type,
        width: photo.width,
        height: photo.height,
        imageUrl: BASE_URL + photo.url.href
    });
    document.getElementById("la_photo")!.innerHTML = html;
}

export function displayCategorie(categorie: Categorie): void {
    document.getElementById("la_categorie")!.textContent =
        `categorie : ${categorie.nom}`;
}

export function displayComments(comments: Comment[]): void {
    const ul = document.getElementById("les_commentaires")!;
    ul.innerHTML = comments
        .map(c => `<li>(${c.pseudo}) ${c.content}</li>`)
        .join("");
}