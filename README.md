# TDD Poker

Évaluateur et comparateur de mains de Texas Hold'em réalisé en JavaScript avec Vitest

## Objectif

Le programme permet de :

- déterminer la meilleure main de 5 cartes possible à partir de 7 cartes
- comparer plusieurs joueurs
- retourner le ou les gagnants en cas d’égalité
- retourner pour chaque joueur la catégorie reconnue et les 5 cartes retenues

## Technologies

- JavaScript
- Node.js
- Vitest

## Format des cartes

Chaque carte est représentée sous forme de chaîne de 2 caractères :

- rang + couleur

Exemples :

- `AC` = As de trèfle
- `TD` = 10 de carreau
- `7H` = 7 de cœur
- `KS` = Roi de pique

### Rangs autorisés

- `2 3 4 5 6 7 8 9 T J Q K A`

### Couleurs autorisées

- `C` = Clubs
- `D` = Diamonds
- `H` = Hearts
- `S` = Spades

## Ordre des catégories

De la plus forte à la plus faible :

1. Straight flush
2. Four of a kind
3. Full house
4. Flush
5. Straight
6. Three of a kind
7. Two pair
8. One pair
9. High card

## Ordre de chosen5

Les 5 cartes retournées sont ordonnées de manière déterministe selon l’importance de la main :

- Straight flush / Straight : de la plus haute à la plus basse
- Four of a kind : les 4 cartes du carré puis le kicker
- Full house : le brelan puis la paire
- Flush : ordre décroissant
- Three of a kind : le brelan puis les kickers décroissants
- Two pair : paire la plus haute, paire la plus basse, kicker
- One pair : la paire puis les kickers décroissants
- High card : ordre décroissant

Cas particulier :
- la suite `A 2 3 4 5` est reconnue comme une suite valide
- elle est retournée dans l’ordre `5 4 3 2 A`

## Lancer les tests

```bash
npm test