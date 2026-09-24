# Le Serveur INSPECT (`inspect-server`)

## Rôle d'inspect-server dans l'architecture

Dans une architecture distribuée, plusieurs applications clientes et serveurs émettent continuellement des données de télémétrie. Sans composant central pour ordonner et stocker ces flux, il serait impossible d'agréger les informations et d'en tirer des analyses globales.

Le composant **`inspect-server`** est le serveur central d'ingestion et de persistance d'INSPECT. Il reçoit les événements transmis par les collecteurs, les stocke de manière optimisée dans une base de données relationnelle, gère le cycle de vie des données et fournit une API pour la restitution.

---

## Vue d'ensemble du fonctionnement interne

```mermaid
flowchart TD
  subgraph Collecteurs["Sources de données"]
    Col1["inspect-ng-collector\n(Front-end)"]
    Col2["inspect-core\n(Back-end)"]
  end

  subgraph Server["inspect-server (Serveur central d'ingestion)"]
    direction TB
    Reception["1. Tampon mémoire d'ingestion\n(Buffer / Dispatch)"]
    MoteurStockage["2. Indexation & Partitionnement\n(Découpage temporel des tables)"]
    Nettoyeur["3. Planificateur de purge\n(Gestion de la rétention)"]
    ApiRest["4. Exposition des données\n(API REST)"]
  end

  subgraph Persistance["Base de données relationnelle"]
    BDD[("Base de données\nPostgreSQL / H2\n(Tables partitionnées par jour/mois)")]
  end

  subgraph Consommateur["Interface utilisateur"]
    App["inspect-app\n(Tableau de bord de supervision)"]
  end

  Col1 -->|Flux HTTP| Reception
  Col2 -->|Flux HTTP| Reception
  Reception -->|Écritures cadencées par blocs| MoteurStockage
  MoteurStockage -->|Insertion dans les partitions| BDD
  Nettoyeur -.->|Suppression des données expirées| BDD
  BDD -->|Requêtes de lecture| ApiRest
  ApiRest -->|Données JSON enrichies| App

  classDef col fill:#FEF3C7,stroke:#D97706,stroke-width:2px,color:#1f2937;
  classDef srv fill:#C5EEF1,stroke:#0891B2,stroke-width:2px,color:#1f2937;
  classDef db fill:#E0F2FE,stroke:#0284C7,stroke-width:2px,color:#1f2937;
  classDef app fill:#E3B2BF,stroke:#BE185D,stroke-width:2px,color:#1f2937;

  class Col1,Col2 col;
  class Reception,MoteurStockage,Nettoyeur,ApiRest srv;
  class BDD db;
  class App app;
```
