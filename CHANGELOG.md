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

## [0.1.0] - 2026-11-09

### Added

- `AUDIT.md` : audit du dépôt de départ.
- `CONTRIBUTING.md` : nommage des branches, format des commits, étapes d'une pull request.
- `CHANGELOG.md`.
- Section « Contribuer » dans le README.
- Protection de la branche `main` : pull request obligatoire.
