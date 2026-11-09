# Audit

## Présent

- Une API en Python et un front en React
- Un README qui explique comment lancer le projet
- Des tests : pytest pour l'API, Vitest et un test Playwright pour le front
- Un `.gitignore` qui exclut le `.env`, le `.venv`, `node_modules` et la base SQLite.
- Des routes `/health` et `/health/ready` pour savoir si l'API fonctionne.

## Ce qui manque

- Pas de protection de la branche `main`.
- Pas de `CONTRIBUTING.md` ni de `CHANGELOG.md`, et aucune version taguée.
- Pas de Dockerfile ni de `compose.yml` : il faut installer Python et Node pour lancer le projet.
- Pas de `.env.example`.
- Pas de tests sur les commandes (`test_orders.py`) ni sur le composant `DropCard`.
- Pas de déploiement automatique.
- Pas de supervision : on ne sait pas quand l'application tombe.

## Ce qui est risqué

- N'importe qui peut pousser directement sur `main`, même du code cassé.
- La commande d'une paire n'est pas testée : si quelqu'un casse la règle du stock, personne ne s'en rend compte.
- Les tests utilisent SQLite alors que la vraie base sera PostgreSQL.
- L'API n'a pas d'authentification : n'importe qui peut créer un drop.
- Le README parle d'une licence MIT, mais il n'y a pas de fichier `LICENSE`.
