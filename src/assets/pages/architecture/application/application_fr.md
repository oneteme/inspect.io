# L'Application INSPECT (`inspect-app`)

## Rôle d'inspect-app dans l'architecture

Stocker des millions d'enregistrements techniques dans une base de données ne suffit pas : pour que ces données soient exploitables aussi bien par les équipes techniques (développeurs, DevOps, architectes) que fonctionnelles (Product Owners, recetteurs/QA, support métier), il faut une interface graphique claire et interactive.

Le composant **`inspect-app`** est l'application web front-end d'INSPECT, développée avec le framework Angular. Elle interroge l'API REST de `inspect-server` pour restituer l'ensemble des métriques, des traces et des dépendances sous forme de tableaux de bord visuels (générés par les librairies de @oneteme/jquery-charts).

Dans l'architecture globale d'INSPECT, le pilier "Application" désigne également **les applications surveillées** (vos propres applications web et services back-end) que vous instrumentez à l'aide des collecteurs.

---

## Vue d'ensemble du rôle d'inspect-app

```mermaid
flowchart LR
  subgraph BackHub["Serveur d'ingestion"]
    Server["inspect-server\n(Serveur central & API REST)"]
  end

  subgraph Visualisation["Interface Web (inspect-app)"]
    direction TB
    Carto["Cartographie dynamique\n(Flux & dépendances inter-services)"]
    Arbre["Arbre de traces & Chronologie\n(Parcours bout en bout & requêtes)"]
    KPIs["Métriques & KPIs\n(SLA, volumétrie & temps de réponse)"]
    Erreurs["Analyse des incidents\n(Piles d'appels & impacts utilisateurs)"]
  end

  subgraph Utilisateurs["Deux cibles aux besoins complémentaires"]
    direction TB
    Tech["💻 Profils Techniques\n(Devs, Ops, Architectes)\n\n• Diagnostic fin & piles d'appels\n• Résolution des goulots d'étranglement\n• Maîtrise de l'architecture logicielle"]
    Fonc["💼 Profils Fonctionnels\n(PO, QA, Support Métier)\n\n• Suivi des parcours utilisateur\n• Qualification & impact des anomalies\n• Respect des SLA & volumétrie métier"]
  end

  Server -->|API REST JSON| Carto
  Server -->|API REST JSON| Arbre
  Server -->|API REST JSON| KPIs
  Server -->|API REST JSON| Erreurs

  Carto --> Tech & Fonc
  Arbre --> Tech & Fonc
  KPIs --> Tech & Fonc
  Erreurs --> Tech & Fonc

  classDef srv fill:#C5EEF1,stroke:#0891B2,stroke-width:2px,color:#1f2937;
  classDef app fill:#E3B2BF,stroke:#BE185D,stroke-width:2px,color:#1f2937;
  classDef userTech fill:#DBEAFE,stroke:#2563EB,stroke-width:2px,color:#1f2937;
  classDef userFonc fill:#FDE7F3,stroke:#9D174D,stroke-width:2px,color:#1f2937;

  class Server srv;
  class Carto,Arbre,KPIs,Erreurs app;
  class Tech userTech;
  class Fonc userFonc;
```


---

## Comment intégrer vos propres applications ?

L'intégration d'INSPECT dans votre système applicatif est directe :
1. **Dans votre Front-end (Angular)** : ajoutez la dépendance `@oneteme/inspect-ng-collector` et déclarez le module à la racine de l'application.
2. **Dans votre Back-end (Java / Spring Boot)** : ajoutez la dépendance `inspect-core` dans votre fichier Maven (`pom.xml`) ou Gradle.
3. **Configuration du point de contact** : renseignez l'URL de votre instance `inspect-server` dans les fichiers de configuration de vos applications.

Dès leur lancement, vos applications transmettent leurs données télémétriques et apparaissent automatiquement dans l'interface `inspect-app`.

