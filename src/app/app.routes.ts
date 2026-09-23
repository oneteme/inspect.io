import { RouterModule, Routes } from '@angular/router';
import { InstallationComponent } from './components/pages/installation/installation.component';
import { NgModule } from '@angular/core';
import { ApplicationComponent } from './components/pages/architecture/application/application.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ArchitectureComponent } from './components/pages/architecture/architecture.component';
import { FeaturesComponent } from '@app/components/pages/features/features.component';
import { CollectorComponent } from './components/pages/architecture/collector/collector.component';
import { ServerComponent } from './components/pages/architecture/server/server.component';
import { CompatibilitiesComponent } from './components/pages/compatibilities/compatibilities.component';
import { MonitoringComponent } from '@app/components/pages/features/monitoring/monitoring.component';
import { E2eComponent } from '@app/components/pages/features/e2e/e2e.component';
import { MetricsComponent } from '@app/components/pages/features/metrics/metrics.component';
import { HealthComponent } from '@app/components/pages/features/health/health.component';
import { AutonomyComponent } from '@app/components/pages/features/autonomy/autonomy.component';
import {
  MonitoringEventComponent
} from '@app/components/pages/features/monitoring/monitoring-event/monitoring-event.component';
import { MonitoringWorkflowComponent } from './components/pages/features/monitoring/monitoring-workflow/monitoring-workflow.component';
import { MonitoringUserComponent } from './components/pages/features/monitoring/monitoring-user/monitoring-user.component';
import { TraceTreeComponent } from './components/pages/features/e2e/trace-tree/trace-tree.component';
import { ThreadTrackingComponent } from './components/pages/features/e2e/thread-tracking/thread-tracking.component';
import { DynamicCartographyComponent } from './components/pages/features/e2e/dynamic-cartography/dynamic-cartography.component';
import { AvailabilitySlaComponent } from './components/pages/features/metrics/availability-sla/availability-sla.component';
import { PerformanceResponseComponent } from './components/pages/features/metrics/performance-response/performance-response.component';
import { VolumeThroughputComponent } from './components/pages/features/metrics/volume-throughput/volume-throughput.component';
import { SystemResourcesComponent } from './components/pages/features/metrics/system-resources/system-resources.component';
import { ApplicationInventoryComponent } from './components/pages/features/health/inventory/application-inventory.component';
import { LifecycleEventsComponent } from './components/pages/features/health/events/lifecycle-events.component';
import { DataPartitioningComponent } from './components/pages/features/autonomy/data-partitioning/data-partitioning.component';
import { SmartRetentionComponent } from './components/pages/features/autonomy/smart-retention/smart-retention.component';
import { SelfReportingComponent } from './components/pages/features/autonomy/self-reporting/self-reporting.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'features/monitoring', component: MonitoringComponent },
  { path: 'features/monitoring/events', component: MonitoringEventComponent },
  { path: 'features/monitoring/workflow', component: MonitoringWorkflowComponent },
  { path: 'features/monitoring/user', component: MonitoringUserComponent },
  { path: 'features/e2e', component: E2eComponent },
  { path: 'features/e2e/tree', component: TraceTreeComponent },
  { path: 'features/e2e/thread', component: ThreadTrackingComponent },
  { path: 'features/e2e/architecture', component: DynamicCartographyComponent },
  { path: 'features/metrics', component: MetricsComponent },
  { path: 'features/metrics/availability', component: AvailabilitySlaComponent },
  { path: 'features/metrics/performance', component: PerformanceResponseComponent },
  { path: 'features/metrics/volume', component: VolumeThroughputComponent },
  { path: 'features/metrics/resources', component: SystemResourcesComponent },
  { path: 'features/health', component: HealthComponent },
  { path: 'features/health/inventory', component: ApplicationInventoryComponent },
  { path: 'features/health/events', component: LifecycleEventsComponent },
  { path: 'features/autonomy', component: AutonomyComponent },
  { path: 'features/autonomy/partitioning', component: DataPartitioningComponent },
  { path: 'features/autonomy/purge', component: SmartRetentionComponent },
  { path: 'features/autonomy/self-reporting', component: SelfReportingComponent },
  { path: 'installation', component: InstallationComponent },
  { path: 'compatibilities', component: CompatibilitiesComponent },
  { path: 'architecture', component: ArchitectureComponent },
  { path: 'architecture/application', component: ApplicationComponent },
  { path: 'architecture/collector', component: CollectorComponent },
  { path: 'architecture/server', component: ServerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
