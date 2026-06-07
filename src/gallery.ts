import { loadResource, GalleryResponse, GalleryPhotoItem } from "./photoloader";

let currentGallery: GalleryResponse | null = null;

export async function load(): Promise<GalleryResponse> {
  const data = await loadResource<GalleryResponse>("/www/canals5/phox/api/photos/");
  currentGallery = data;
  return data;
}

async function loadPage(href: string): Promise<GalleryResponse> {
  const data = await loadResource<GalleryResponse>(href);
  currentGallery = data;
  return data;
}

export async function next(): Promise<GalleryResponse> {
  if (!currentGallery?.links.next) throw new Error("Pas de page suivante");
  return loadPage(currentGallery.links.next.href);
}

export async function prev(): Promise<GalleryResponse> {
  if (!currentGallery?.links.prev) throw new Error("Pas de page précédente");
  return loadPage(currentGallery.links.prev.href);
}

export async function first(): Promise<GalleryResponse> {
  if (!currentGallery?.links.first) throw new Error("Pas de première page");
  return loadPage(currentGallery.links.first.href);
}

export async function last(): Promise<GalleryResponse> {
  if (!currentGallery?.links.last) throw new Error("Pas de dernière page");
  return loadPage(currentGallery.links.last.href);
}

export function getCurrentPhotos(): GalleryPhotoItem[] {
  return currentGallery?.photos ?? [];
}