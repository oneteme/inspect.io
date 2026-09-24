# Architecture globale d'INSPECT

## Organisation en 3 piliers

INSPECT s'organise autour de **3 piliers** :

1. **Les Collecteurs (`inspect-core` & `inspect-ng-collector`)** : Des bibliothèques intégrées directement au cœur de vos applications (côté navigateur web Angular et côté serveurs d'applications Java). Elles capturent les événements techniques, les requêtes et les erreurs au fil de l'eau.
2. **Le Serveur (`inspect-server`)** : Le serveur central d'ingestion et de persistance. Il reçoit les flux télémétriques, régule les écritures grâce à une mémoire tampon, découpe les tables par partitionnement temporel pour des recherches instantanées, et applique les politiques de purge automatique.
3. **L'Application (`inspect-app`)** : L'interface web de restitution et d'analyse. Elle interroge le serveur pour afficher la cartographie dynamique des dépendances, rejouer l'arbre d'exécution des requêtes et fournir les indicateurs nécessaires.

---

## Vue d'ensemble des flux INSPECT

```mermaid
flowchart TD
  subgraph P1["Les Collecteurs"]
    direction LR
    subgraph EnvFront["Front-end (Client / Navigateur)"]
      AppFront["Application Web\n(Angular / Client)"] -->|Actions & Erreurs| ColFront["inspect-ng-collector\n(Collecteur Front-end)"]
    end
    subgraph EnvBack["Back-end (Serveur d'application)"]
      AppBack["Services Applicatifs\n(Java / Spring Boot)"] -->|Traces & Requêtes SQL| ColBack["inspect-core\n(Collecteur Back-end)"]
    end
    AppFront -.->|Requêtes HTTP corrélées| AppBack
  end

  subgraph P2["Le Serveur (Ingestion & Stockage)"]
    direction LR
    Server["inspect-server\n(Serveur central & API REST)"]
    BDD[("Base de données relationnelle\nPostgreSQL / H2\n(Partitionnement temporel)")]
    Server <-->|Écritures groupées & Indexation| BDD
  end

  subgraph P3["L'Application (Restitution & Analyse)"]
    App["inspect-app\n(Interface Web & Tableaux de bord)\n\n• Cartographie dynamique des flux\n• Arbre de traces & chronologie\n• Métriques APM, SLA & volumétrie\n• Analyse centralisée des incidents"]
  end

  subgraph Users["Utilisateurs"]
    direction LR
    Tech["💻 Profils Techniques\n(Devs, Ops, Architectes)\n\n• Diagnostic fin & piles d'appels\n• Résolution des goulots d'étranglement\n• Maîtrise de l'architecture logicielle"]
    Fonc["💼 Profils Fonctionnels\n(PO, QA, Support Métier)\n\n• Suivi des parcours utilisateur de bout en bout\n• Qualification & impact des anomalies\n• Respect des SLA & volumétrie métier"]
  end

  ColFront -->|Flux télémétrique HTTP| Server
  ColBack -->|Flux télémétrique HTTP| Server
  Server -->|API REST JSON| App

  App --> Tech & Fonc

  click ColFront "architecture/collector"
  click ColBack "architecture/collector"
  click Server "architecture/server"
  click App "architecture/application"

  classDef appNode fill:#F8FAFC,stroke:#64748B,stroke-width:2px,color:#1f2937;
  classDef colFront fill:#FEF3C7,stroke:#D97706,stroke-width:2px,color:#1f2937;
  classDef colBack fill:#D8EACD,stroke:#16A34A,stroke-width:2px,color:#1f2937;
  classDef server fill:#C5EEF1,stroke:#0891B2,stroke-width:2px,color:#1f2937;
  classDef bdd fill:#E0F2FE,stroke:#0284C7,stroke-width:2px,color:#1f2937;
  classDef app fill:#E3B2BF,stroke:#BE185D,stroke-width:2px,color:#1f2937;
  classDef userTech fill:#DBEAFE,stroke:#2563EB,stroke-width:2px,color:#1f2937;
  classDef userFonc fill:#FDE7F3,stroke:#9D174D,stroke-width:2px,color:#1f2937;

  class AppFront,AppBack appNode;
  class ColFront colFront;
  class ColBack colBack;
  class Server server;
  class BDD bdd;
  class App app;
  class Tech userTech;
  class Fonc userFonc;
```
