# API League of Legends (LOL)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and react.

## Widgets disponible

Dans la partie API League of Legends, nous avons réalisé en tout 5 widgets.

### Instructions

- Se connecter/créer un compte sur https://developer.riotgames.com/ 
- Une fois connecté, demander une clé d'API
- Placer la clé d'API dans le fichier API.js à la ligne 10
- Démarrer le npm depuis le fichier "frontend"
  - Si cela ne fonctionne pas, assurez-vous d'avoir l'extension CORS (Cross-origin ressource sharing) sur Chrome. 
- Une fois arrivé sur le dashboard, entrer un pseudo riot, voici quelque exemples (Rekkles, BlitsKay, Eslatyre) puis appuyer sur "Rechercher".
- Enfin, selectionner un mode de jeu à l'aide du dropdown menu.

### Information du joueur

Dans cette partie, nous avons comme widgets :
- L'icône du profil du joueur avec son pseudo et son niveau actuel.
- L'affichage du rang joueur avec sa division et l'emblème de cette dernière.
- Un graphique représentant le nombre de partie gagné ou de partie perdu dans la saison du joueur.

### Informations des parties

Ici, nous avons un menu déroulant ainsi qu'un ensemble de "carte" où chacune d'entre-elle représente une partie du joueur.
- menu déroulant : ce menu permet de sélectionner les parties du mode de jeu que l'on souhaite affichées 3 choix sont proposés :
  - All : les 6 dernières parties.
  - Normal : les 6 dernières parties dans le mode de jeu "Normal".
  - Aram : les 6 dernières parties dans le mode de jeu "Aram".
  - Attention : le choix "Normal" ou "Aram" peut mettre du temps à s'afficher à cause du temps de réponses de l'API LOL.
- Carte : Chaque carte représente une partie jouée, sur chacune d'entre elle  on peut voir les informations suivantes :
  - L'image de fond représente le personnage joué.
  - Le texte écrit par dessus affiche :
    - Le nom du champion utilisé.
    - son KDA (Kill, Death, Assist) sur la partie.