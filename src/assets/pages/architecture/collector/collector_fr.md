# Les Collecteurs INSPECT

## Qu'est-ce qu'un collecteur dans INSPECT ?

Un **collecteur** (ou agent de télémétrie) est une bibliothèque de code que l'on intègre directement à l'intérieur d'un programme pour mesurer son activité et enregistrer ce qui s'y passe en cours d'exécution.

Le collecteur fonctionne de manière autonome :
- Il observe les événements système (clics, requêtes réseau, requêtes en base de données, erreurs).
- Il mesure les durées d'exécution et les ressources consommées.
- Il enregistre ces informations sans modifier la logique métier de votre application et sans bloquer l'expérience utilisateur.

---

## Pourquoi deux collecteurs distincts ?

Une application web repose sur deux environnements d'exécution différents :
1. **Le côté client (Front-end)**
2. **Le côté serveur (Back-end)** 

Pour couvrir l'ensemble du cycle de vie d'un traitement, INSPECT propose deux modules de collecte spécialisés :

```mermaid
flowchart LR
  subgraph Client["1. Environnement Client (Navigateur Web)"]
    direction TB
    UI["Application Angular"] -->|Interactions & Appels HTTP| ColFront["inspect-ng-collector\n(Collecteur Front-end)"]
  end

  subgraph Serveur["2. Environnement Serveur (Machine distante)"]
    direction TB
    Backend["Application Java / Spring"] -->|Traitements - Threads| ColBack["inspect-core\n(Collecteur Back-end)"]
  end

  ColFront -->|Envoi périodique par lots| ServerHub[("inspect-server\n(Serveur central d'ingestion)")]
  ColBack -->|Envoi périodique par lots| ServerHub

  classDef front fill:#FEF3C7,stroke:#D97706,stroke-width:2px,color:#1f2937;
  classDef back fill:#D8EACD,stroke:#16A34A,stroke-width:2px,color:#1f2937;
  classDef server fill:#C5EEF1,stroke:#0891B2,stroke-width:2px,color:#1f2937;

  class ColFront front;
  class ColBack back;
  class ServerHub server;
```

---

## La corrélation de bout en bout (End-to-End)

Le point fort de cette architecture est la capacité à relier ce qui se passe dans le navigateur avec ce qui s'exécute sur le serveur :

1. L'utilisateur déclenche une action dans l'application Angular (par exemple, un clic pour charger un profil).
2. `inspect-ng-collector` génère un identifiant de corrélation et l'ajoute dans les en-têtes de la requête HTTP envoyée au serveur.
3. `inspect-core` reçoit cette requête sur le serveur Java, extrait l'identifiant et lui rattache toutes les opérations internes qui suivent (les requêtes SQL en base, les calculs métier, les éventuelles erreurs).
4. Les données envoyées à `inspect-server` partagent cette référence commune.

Le système est ainsi capable de relier directement l'action côté navigateur aux opérations correspondantes en base de données.

---
