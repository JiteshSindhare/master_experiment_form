import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateExperimentFormComponent } from './components/create-experiment-form/create-experiment-form.component';
import { ExperimentComponent } from './components/experiment/experiment.component';
import { ManageExperimentComponent } from './components/manage-experiment/manage-experiment.component';
import { TopBarComponent } from './tiles/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateExperimentFormComponent,
    ExperimentComponent,
    ManageExperimentComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
