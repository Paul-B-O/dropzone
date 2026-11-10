# Changelog

Les changements importants du projet sont notés ici.

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versions : [semver](https://semver.org/lang/fr/).

## [Unreleased]

### Added

- `backend/Dockerfile` : image multi-stage de l'API, lancée par un utilisateur non-root.
- `frontend/Dockerfile` : build du front avec Node, servi par nginx sur le port 8080.
- `compose.yml` : stack complète (PostgreSQL 16 avec volume et healthcheck, API, front).
- `.env.example` et un `.dockerignore` par image.
- Section « Lancer avec Docker » dans le README.
- `.github/workflows/ci.yml` : intégration continue sur chaque pull request et sur `main`, avec quatre jobs (lint, tests backend, tests frontend, puis E2E), cache pip et npm, permissions en lecture seule.
- Rapport HTML de Playwright conservé en artefact `playwright-report`, même en cas d'échec.
- `backend/tests/test_orders.py` : tests des commandes (décrément du stock, dernière paire, drop épuisé ou pas encore ouvert, drop inconnu).
- `frontend/src/components/DropCard.test.tsx` : test du composant `DropCard` (produit, prix, stock restant, statut).
- `frontend/e2e/orders.spec.ts` : scénarios « commander décrémente le stock » et « un drop épuisé désactive le bouton ».
- Badge de la CI et section « Intégration continue » dans le README.

## [0.1.0] - 2026-11-09

### Added

- `AUDIT.md` : audit du dépôt de départ.
- `CONTRIBUTING.md` : nommage des branches, format des commits, étapes d'une pull request.
- `CHANGELOG.md`.
- Section « Contribuer » dans le README.
- Protection de la branche `main` : pull request obligatoire.
