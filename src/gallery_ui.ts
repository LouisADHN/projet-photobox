import { GalleryResponse } from "./photoloader";
import { BASE_URL } from "./config";

export function display_galerie(gallery: GalleryResponse): void {
  const container = document.getElementById("les_vignettes")!;

  container.innerHTML = gallery.photos
    .map(item => `
      <figure data-photoId="${item.photo.id}">
        <img src="${BASE_URL}${item.photo.thumbnail.href}" alt="${item.photo.titre}">
      </figure>
    `)
    .join("");
}