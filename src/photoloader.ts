import { API_ROOT, BASE_URL } from "./config";

export interface PhotoUrl {
  href: string;
}

export interface Photo {
  id: number;
  titre: string;
  file: string;
  descr: string;
  format: string;
  type: string;
  width: number;
  height: number;
  size: number;
  url: PhotoUrl;
}

export interface PhotoLinks {
  categorie: { href: string };
  comments:  { href: string };
}

export interface PhotoResponse {
  type: string;
  photo: Photo;
  links: PhotoLinks;
}

export interface Categorie {
  id: number;
  nom: string;
  descr: string;
}

export interface CategorieResponse {
  type: string;
  categorie: Categorie;
  links: { photos: { href: string } };
}

export interface Comment {
  id: number;
  titre: string;
  content: string;
  pseudo: string;
  date: string;
}

export interface CommentsResponse {
  type: string;
  count: number;
  size: number;
  comments: Comment[];
  links: {
    first: { href: string };
    last:  { href: string };
    next?: { href: string };
    prev?: { href: string };
  };
}

export interface GalleryPhoto {
  id: number;
  titre: string;
  file: string;
  thumbnail: { href: string };
  original:  { href: string };
}

export interface GalleryPhotoItem {
  photo: GalleryPhoto;
  links: { self: { href: string } };
}

export interface GalleryResponse {
  type: string;
  count: number;
  size: number;
  photos: GalleryPhotoItem[];
  links: {
    first: { href: string };
    last:  { href: string };
    next?: { href: string };
    prev?: { href: string };
  };
}

export async function loadPicture(id: number | string): Promise<PhotoResponse> {
  const url = `${API_ROOT}/photos/${id}`;
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
  return response.json();
}


export async function loadResource<T>(uri: string): Promise<T> {
  const url = `${BASE_URL}${uri}`;
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error(`Erreur HTTP ${response.status} pour ${uri}`);
  return response.json();
}