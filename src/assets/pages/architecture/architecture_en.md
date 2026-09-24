# Global Architecture of INSPECT

## Organization into 3 Pillars

INSPECT is built around **3 complementary pillars** working in harmony:

1. **The Collectors (`inspect-core` & `inspect-ng-collector`)**: Embedded telemetry libraries integrated directly into your applications (browser-side Angular and Java server-side). They capture runtime events, outgoing requests, and exceptions as they occur.
2. **The Server (`inspect-server`)**: The central ingestion and persistence engine. It ingests incoming telemetry streams, cushions peak loads through in-memory buffering, partitions data in the database for instant searches, and automatically enforces retention purges.
3. **The Application (`inspect-app` & your business applications)**: The web-based monitoring dashboard. It queries the server API to render dynamic dependency cartography, sequential trace trees, and essential APM performance indicators.

---

## INSPECT Service Interactions

```mermaid
flowchart TD
  subgraph P1["Pillar 1: The Collectors (Instrumented Applications)"]
    direction LR
    subgraph EnvFront["Front-end (Browser / Client)"]
      AppFront["Web Application\n(Angular / Browser)"] -->|User actions & Errors| ColFront["inspect-ng-collector\n(Front-end Collector)"]
    end
    subgraph EnvBack["Back-end (Application Server)"]
      AppBack["Application Services\n(Java / Spring Boot)"] -->|Traces & SQL Queries| ColBack["inspect-core\n(Back-end Collector)"]
    end
    AppFront -.->|Correlated HTTP Requests| AppBack
  end

  subgraph P2["Pillar 2: The Server (Ingestion & Storage)"]
    direction LR
    Server["inspect-server\n(Central Ingestion Server & REST API)"]
    BDD[("Relational Database\nPostgreSQL / H2\n(Time-based Partitioning)")]
    Server <-->|Batch Writes & Indexing| BDD
  end

  subgraph P3["Pillar 3: The Application (Visualization & Analytics)"]
    App["inspect-app\n(Web UI & Interactive Dashboards)\n\n• Dynamic system cartography\n• Sequential trace trees & timeline\n• APM metrics, SLAs & volumetry\n• Centralized incident diagnostics"]
  end

  subgraph Users["Complementary Target Audiences"]
    direction LR
    Tech["💻 Technical Profiles\n(Devs, Ops, Architects)\n\n• Deep diagnostics & stack traces\n• Bottleneck resolution\n• Software architecture mastery"]
    Fonc["💼 Functional Profiles\n(Product Owners, QA, Support)\n\n• End-to-end user journey tracking\n• Fast incident qualification\n• SLA compliance & business metrics"]
  end

  ColFront -->|HTTP Telemetry Stream| Server
  ColBack -->|HTTP Telemetry Stream| Server
  Server -->|REST API JSON| App

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
