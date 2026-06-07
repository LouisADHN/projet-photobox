import { loadPicture, loadResource, PhotoResponse, CategorieResponse, CommentsResponse } from "./photoloader";
import { displayPicture, displayCategorie, displayComments } from "./ui";
import { load, next, prev, first, last, getCurrentPhotos } from "./gallery";
import { display_galerie } from "./gallery_ui";
import * as Lightbox from "./lightbox";

function getCategorie(data: PhotoResponse): Promise<CategorieResponse> {
  return loadResource<CategorieResponse>(data.links.categorie.href);
}

async function getPicture(id: number | string): Promise<void> {
  try {
    const data = await loadPicture(id);
    displayPicture(data.photo);

    const categorieData = await getCategorie(data);
    displayCategorie(categorieData.categorie);

    const commentsData = await loadResource<CommentsResponse>(data.links.comments.href);
    displayComments(commentsData.comments);
  } catch (error) {
    console.error("Erreur :", error);
  }
}

async function loadAndDisplay(action: () => Promise<any>): Promise<void> {
  try {
    const gallery = await action();
    display_galerie(gallery);
  } catch (error) {
    console.error("Erreur navigation :", error);
  }
}

document.getElementById("btn-load")!.addEventListener("click",  () => loadAndDisplay(load));
document.getElementById("btn-next")!.addEventListener("click",  () => loadAndDisplay(next));
document.getElementById("btn-prev")!.addEventListener("click",  () => loadAndDisplay(prev));
document.getElementById("btn-first")!.addEventListener("click", () => loadAndDisplay(first));
document.getElementById("btn-last")!.addEventListener("click",  () => loadAndDisplay(last));

document.getElementById("les_vignettes")!.addEventListener("click", (event) => {
  const figure = (event.target as HTMLElement).closest("[data-photoId]");
  if (!figure) return;
  const photoId = Number(figure.getAttribute("data-photoId"));
  if (photoId) Lightbox.open(photoId, getCurrentPhotos());
});

document.getElementById("lightbox-close")!.addEventListener("click",   () => Lightbox.close());
document.getElementById("lightbox-prev")!.addEventListener("click",    () => Lightbox.prev());
document.getElementById("lightbox-next")!.addEventListener("click",    () => Lightbox.next());

document.getElementById("lightbox-details")!.addEventListener("click", async () => {
  const id = Lightbox.getCurrentId();
  Lightbox.close();
  await getPicture(id);
  document.getElementById("photo")!.scrollIntoView({ behavior: "smooth" });
});

document.getElementById("lightbox")!.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) Lightbox.close();
});

const id = window.location.hash ? window.location.hash.substring(1) : 105;
getPicture(id);