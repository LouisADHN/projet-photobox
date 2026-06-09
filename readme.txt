===========================================================
  PHOTOBOX - TD7 : fetch et promesses
  Programmation web en JS - IUT Nancy-Charlemagne

  ARDHUIN Louis
  TOLKACHEVA Anastasia
  JACQUET Arthur
===========================================================

Application web permettant de parcourir et d'afficher les galeries
d'images de l'API Photobox (webetu).

-----------------------------------------------------------
  INSTALLATION ET LANCEMENT
-----------------------------------------------------------

1. Installer les dependances :
     npm install

2. Construire le bundle JavaScript :
     npm run build

3. Ouvrir index.html dans un navigateur.

REMARQUE : Il faut etre connecte au VPN de l'univ, ou être sur le reseau de l'IUT pour que les images se chargent.


-----------------------------------------------------------
  STRUCTURE DU PROJET
-----------------------------------------------------------

  index.html        page principale + templates Handlebars
  src/              code source TypeScript
  js/index.js       bundle genere par ESBuild

  Modules src/ :
    config.ts        point d'entree de l'API et URL de base
    photoloader.ts   interactions avec l'API + interfaces TS
    ui.ts            affichage d'une photo, categorie, commentaires
    gallery.ts       chargement et pagination des galeries
    gallery_ui.ts    affichage des vignettes
    lightbox.ts      mode plein ecran
    index.ts         module principal (listeners + orchestration)


-----------------------------------------------------------
  CE QUI A ETE REALISE
-----------------------------------------------------------

Exercice 1 - Afficher une image
  - Module photoloader avec loadPicture(id) qui retourne une promesse.
  - Valeurs de configuration isolees dans config.ts.
  - getPicture(id) : recupere l'id depuis l'URL (window.location.hash)
    ou utilise la photo 105 par defaut.
  - Affichage de la photo dans la page via un template Handlebars.
  - loadResource(uri) pour les requetes complementaires (links).
  - Ajout de la categorie (#la_categorie) et des commentaires
    (#les_commentaires) avec des requetes supplementaires.

Exercice 2 - Afficher une galerie
  - Module gallery avec load() qui charge la liste de photos,
    stocke les donnees et retourne la galerie.
  - Module gallery_ui avec display_galerie() qui construit le markup
    des vignettes (attribut data-photoId) et l'insere dans le DOM.
  - Bouton "load" relie a l'action de chargement + affichage.

Exercice 3 - Naviguer dans les galeries
  - Stockage des liens de navigation (first/last/next/prev) au
    chargement de la galerie.
  - Methodes next(), prev(), first(), last().
  - Boutons correspondants relies dans la barre de navigation,
    desactives quand le lien n'existe pas.

Exercice 4 - Afficher une photo de la galerie
  - Un clic sur une vignette recupere l'id (data-photoId) et affiche
    la photo. Reutilisation du code de l'exercice 1.

Exercice 5 (bonus) - Lightbox
  - Affichage de la photo en plein ecran par-dessus la galerie.
  - Bouton de fermeture (+ fermeture par clic sur le fond).
  - Boutons precedent / suivant pour naviguer sans revenir a la
    galerie.
  - Bouton "Voir les details" qui ferme la lightbox et affiche la
    photo complete (titre, categorie, commentaires) plus bas.
