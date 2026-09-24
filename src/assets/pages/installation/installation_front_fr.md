## inspect-ng-collector

### Importer le Module

Dans le `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgCollectorModule } from '@oneteme/inspect-ng-collector';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ 
    BrowserModule,
    NgCollectorModule.forRoot({
      enabled: true,
      name: 'my-application',
      version: '1.0.0',
      env: 'production',
      tracing: {
        remote: {
          host: 'https://api.analytics.example.com'
        }
      }
    })
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

### Ajouter un traçage personnalisé

Utilisez le décorateur `@TraceableStage()` pour suivre les étapes personnalisées de l'application :

```typescript
import { Injectable } from '@angular/core';
import { TraceableStage } from '@oneteme/inspect-ng-collector';

@Injectable()
export class DataService {
  
  @TraceableStage()
  fetchUserData(userId: string) {
    // Your logic here
  }

  @TraceableStage()
  async processData(data: any) {
    // Async operations are supported
  }
}
```

### Journaliser les événements de l'application

```typescript
import { Injectable } from '@angular/core';
import { LogService } from '@oneteme/inspect-ng-collector';

@Injectable()
export class MyService {
  
  constructor(private logger: LogService) {}
  
  doSomething() {
    this.logger.info('Operation started');
    // ... operations ...
    this.logger.warn('Something unexpected');
    this.logger.error('An error occurred');
  }
}
```
___

## inspect-app

<p align="center">
  <a href="https://spring.io/">
    <img src="https://img.shields.io/badge/Angular-16-$.svg?logo=Angular&color=red" alt="Angular 16" style="border-radius: 4px;">
  </a>
  <a href="https://www.npmjs.com/package/@oneteme/jquery-apexcharts">
    <img src="https://img.shields.io/badge/npm-v1.0.0-cb3837.svg?logo=npm&logoColor=white" alt="NPM Version" style="border-radius: 4px;">
  </a>
  <a href="https://github.com/oneteme/jquery-charts/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/jquerycharts-0.0.15-blue.svg" alt="License" style="border-radius: 4px;">
  </a>
</p>

## 📋 Table of Contents

- ## [Integration](#%EF%B8%8F-integration)
  - ### [Setup](#setup-1)

---

# 🛠️ Integration

## Setup

```ts
// environement.ts
export const app: Application = {
    host : "http://localhost:9000",
    defaultEnv : "dev",
    gridViewPeriod:  "LAST_60",
    kpiViewPeriod: "LAST_1440"
}
```


## API Reference

| VARIABLE | TYPE   | REQUIRED  | 
|------|------------|----------|
| INSPECT_SERVER_URL | **string** | x        | 
| DEFAULT_ENV | **string** | dev      | 
| DEFAULT_GRID_VIEW_PERIOD | **string** | LAST_30  |
| DEFAULT_KPI_VIEW_PERIOD  | **string** | LAST_1440  | 

## Authentification

---

