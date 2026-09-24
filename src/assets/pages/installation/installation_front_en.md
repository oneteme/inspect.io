## Projets

- [Front-end (inspect-ng-collector)](#inspect-ng-collector)
- [Back-end (inspect-core)](#inspect-core)


## inspect-ng-collector

### Import the Module

In your `app.module.ts`:

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

### (Optional) Add Custom Tracing

Use the `@TraceableStage()` decorator to track custom application stages:

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

### (Optional) Log Application Events

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

## inspect-core

### Quick Start
-----------
Maven
```xml
<dependency>
  <groupId>io.github.oneteme</groupId>
  <artifactId>inspect-core</artifactId>
  <version>REPLACE_WITH_VERSION</version>
</dependency>
```

Configuration (example application.yml)
```yaml
inspect:
  collector:
    enabled: true
    debug-mode: false
    scheduling:
      interval: 5s
    monitoring:
      http-route:
        excludes:
          method: OPTIONS
          path: /favicon.ico, /actuator/info
      resources:
        enabled: true
      exception:
        max-stack-trace-rows: -1
        max-cause-depth: -1
    tracing:
      queue-capacity: 1000
      delay-if-pending: 0
      dump:
        enabled: false
      remote:
        mode: REST
        host: https://inspect-server.example.com
        retention-max-age: 30d
```

Key Concepts
------------
- Session: Logical processing unit (app startup, batch job, incoming request) that groups related events.
- Request: Interaction with external/local resources with metadata (type, duration, status, error).
- Thread correlation: Propagate session context across threads to maintain continuity.
- Resource monitoring: Periodic basic system metrics (memory, disk) aligned with trace timelines.

Integration Notes
-----------------
- Spring Boot: add dependency and enable collector via configuration.
- Web clients: supports both blocking (ClientHttpRequestInterceptor) and reactive (ExchangeFilterFunction) capture.
- Sensitive data: redact Authorization headers, PII and large payloads before dispatch.

Build & Test
------------
Maven:
```bash
mvn clean test
mvn -DskipTests package
```

<div id="platform-section"></div>

## Using the INSPECT UI & Server

In the `inspect-app` directory, install dependencies:
```shell
npm install
```
Then launch the application:
```shell
npm run start
``` 
The UI is available on port 4200 (http://localhost:4200).

In the `inspect-server` directory, run a Maven build:
```shell
mvn clean install
```

Prepare an `application.yml` configuration file in the `src/main/resources` directory:

```yaml
server:
  port: 8080

inspect:
  server:
    enabled: true
    storage:
      path: ./data
```

Then start the server:
```shell
mvn spring-boot:run
```
