import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {PanelModule} from 'primeng-lts/panel';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';
import { DialogModule} from 'primeng-lts/dialog';
import {InputTextModule} from 'primeng-lts/inputtext';
import { DropdownModule } from 'primeng-lts/dropdown';
import { RadioButtonModule } from 'primeng-lts/radiobutton';
import { ButtonModule } from 'primeng-lts/button';
import { ToastModule } from 'primeng-lts/toast';
import { ToggleButtonModule } from 'primeng-lts/togglebutton';
import {InputTextareaModule} from 'primeng-lts/inputtextarea';
import {CardModule} from 'primeng-lts/card';
import { MessageService } from 'primeng-lts/api';
import { MessageModule } from 'primeng-lts/message';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateExperimentFormComponent } from './components/create-experiment-form/create-experiment-form.component';
import { ExperimentComponent } from './components/experiment/experiment.component';
import { ManageExperimentComponent } from './components/manage-experiment/manage-experiment.component';
import { TopBarComponent } from './tiles/top-bar/top-bar.component';
import { MenuComponent } from './tiles/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateExperimentFormComponent,
    ExperimentComponent,
    ManageExperimentComponent,
    TopBarComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonModule,
    RadioButtonModule,
    ToastModule,
    ToggleButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    DropdownModule,
    PanelModule,
    InputTextareaModule,
    CardModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
