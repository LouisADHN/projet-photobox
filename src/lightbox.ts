import { GalleryPhotoItem } from "./photoloader";
import { BASE_URL } from "./config";

// État interne de la lightbox
let photos: GalleryPhotoItem[] = [];
let currentIndex: number = 0;

// Affiche la photo à l'index donné dans le contenu de la lightbox
function showAtIndex(index: number): void {
  currentIndex = index;
  const item = photos[currentIndex];

  document.getElementById("lightbox-content")!.innerHTML = `
    <img src="${BASE_URL}${item.photo.original.href}" alt="${item.photo.titre}">
    <p>${item.photo.titre}</p>
  `;

  (document.getElementById("lightbox-prev") as HTMLButtonElement).disabled =
    currentIndex === 0;
  (document.getElementById("lightbox-next") as HTMLButtonElement).disabled =
    currentIndex === photos.length - 1;
}

export function open(photoId: number, galleryPhotos: GalleryPhotoItem[]): void {
  photos = galleryPhotos;
  currentIndex = photos.findIndex(item => item.photo.id === photoId);
  document.getElementById("lightbox")!.classList.remove("hidden");
  showAtIndex(currentIndex);
}

export function close(): void {
  document.getElementById("lightbox")!.classList.add("hidden");
}

export function next(): void {
  if (currentIndex < photos.length - 1) showAtIndex(currentIndex + 1);
}

export function prev(): void {
  if (currentIndex > 0) showAtIndex(currentIndex - 1);
}

export function getCurrentId(): number {
  return photos[currentIndex].photo.id;
}