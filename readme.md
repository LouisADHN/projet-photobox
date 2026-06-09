# Photobox - TD7 : fetch et promesses
Programmation web en JS - IUT Nancy-Charlemagne

Projet realisé par:
- ARDHUIN Louis
- TOLKACHEVA Anastasia
- JACQUET Arthur

---

## Presentation de l'application

Photobox est une petite application web sympa qui permet de parcourir et d'afficher les differentes galeries d'images provenant de l'API Photobox (du serveur webetu). Le but principal de ce TD etait de s'entrainer avec `fetch` pour faire des requetes asynchrones et d'apprendre a manipuler les promesses en Javascript et Typescript.

## Installation et lancement

Pour tester notre projet sur votre machine, il suffit de suivre ces quelques etapes:

1. **Installer les dependances** :
   ```bash
   npm install
   ```
   Ca va telecharger tous les modules necessaires pour faire tourner le projet.

2. **Construire le bundle Javascript** :
   ```bash
   npm run build
   ```
   Cette commande lance ESBuild pour compiler notre code Typescript et creer le fichier `js/index.js` final.

3. **Lancer le projet** :
   Vous avez juste a ouvrir le fichier `index.html` directement dans un navigateur.

> **Remarque super importante** : Vu que l'API est hebergé sur les serveurs de l'université, il faut absolument etre connecte au VPN de l'Univ Lorraine, ou alors etre physiquement sur le reseau de l'IUT. Sinon les images ne se chargeront pas et vous aurez des erreurs.

---

## Structure du projet

Voici comment on a decoupé notre code pour que ca soit propre :

- `index.html` : C'est notre page principale. Elle contient aussi les templates Handlebars qu'on utilise pour generer l'affichage dynamiquement.
- `src/` : Ce dossier contient tout notre code source de l'application, ecrit en TypeScript.
- `js/index.js` : C'est le bundle genere par ESBuild à partir de nos fichiers `.ts`. 

**Le detail de nos modules dans `src/`** :
- `config.ts` : Point d'entree de l'API et l'URL de base. C'est un fichier tres utile qui regroupe toutes les constantes de configuration qu'on utilise dans l'app.
- `photoloader.ts` : C'est ici ou on a mis toutes les interactions avec l'API. La class  gere les requetes fetch et on a aussi mis les interfaces TypeScript pour typer les donnees qu'on recoit.
- `ui.ts` : Ce module s'occupe specifiquement de l'affichage d'une photo detaille, de sa categorie et des commentaires dans la page.
- `gallery.ts` : s'occupe de gerer la logique des galeries: chargement depuis l'api, stockage des donnes, et gestion de la pagination.
- `gallery_ui.ts` : La class se concentre globalement sur l'affichage et la creation des petites vignettes de la galerie.
- `lightbox.ts` : Le module qui gere le plein ecran (lightbox).
- `index.ts` : C'est notre module principal. Il sert de chef d'orchestre, initialise l'application et met en place les differents eventlisteners.

---

## Ce qu'on a realisé

On a reussi a faire tous les exercices demandés, plus le bonus :

### Exercice 1 - Afficher une image
- On a cree le module `photoloader` avec la methode `loadPicture(id)` qui fait la requete et retourne une promesse.
- On a extrait les valeurs de configuration (comme les urls) pour les stocker proprement dans `config.ts`.
- La fonction `getPicture(id)` est en place : elle essaye de recuperer l'id de l'image directement depuis l'URL de la page. Si y a pas d'id ou que l'API plante, on affiche la photo 105 par defaut.
- La photo est affichée dynamiquement dans la page via un template Handlebars qu'on a preparé.
- On a ajoute `loadResource(uri)` pour gerer proprement les requetes complementaires via les liens de l'API.
- L'exercice 1 est validé avec l'ajout de la categorie (dans `#la_categorie`) et des commentaires (dans `#les_commentaires`) qu'on recupere avec des requetes supplementaire.

### Exercice 2 - Afficher une galerie
- Le module `gallery` est fonctionnel avec sa methode `load()` qui telecharge la liste complete des photos, stocke tout les donnée necessaire et nous retourne la galerie prete a l'emploi.
- On a ajoute la fonction `display_galerie()` dans `gallery_ui`. Elle construit tout le code HTML de nos vignettes, ajoute un attribut `data-photoId`, et les insere dans la page.
- le bouton load declenche le chargement et l'affichage de la grille.

### Exercice 3 - Naviguer dans les galeries
- Des le chargement d'une galerie, on recupere et on stocke les liens de navigation (`first`, `last`, `next`, `prev`) donnes par l'API.
- On a developpe les methodes pour parcourir la galerie : `next()`, `prev()`, `first()`, et `last()`.
- La barre de navigation contient les boutons associes. De plus ils se desactives tout quand le lien n'existe pas (par exemple on peut pas faire suivant si on est deja sur la derniere page).

### Exercice 4 - Afficher une photo de la galerie
- On a branché un eventlistener de clic sur les vignettes : quand on clique → recupere l'id grace au `data-photoId` → affiche la photo en grand. 
- on a pu reutiliser le code de l'exercice 1.

### Exercice 5 (bonus) - La Lightbox
- On a mis en place une interface plein ecran qui vient s'afficher en gros par dessus la galerie quand on clique sur une miniature.
- Pour en sortir, on a mis un bouton de fermeture et on peut aussi juste cliquer n'importe ou sur le fond de l'app.
- On a rajouté des boutons precedent/suivant directement dans la lightbox, ca evite de devoir revenir a la galerie a chaque fois.
- On a mis un bouton "Voir les details". Quand on clique dessus, la lightbox se ferme direct et scrolle la page pour afficher la photo avec toutes ses infos (titre, categorie, commentaires) juste en dessous.