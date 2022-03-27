import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateExperimentFormComponent } from './components/create-experiment-form/create-experiment-form.component';
import { ExperimentComponent } from './components/experiment/experiment.component';
import { TopBarComponent } from './tiles/top-bar/top-bar.component';
import { ManageExperimentComponent } from './components/manage-experiment/manage-experiment.component';
import { MenuComponent } from './tiles/menu/menu.component';
import { ThankYouComponent } from './tiles/thank-you/thank-you.component';

const routes: Routes = [
  {
  path: '',
  component: MenuComponent,
  // component: TopBarComponent,
  data: { stateName: 'home' },
  children: [
    { 
      path: 'experiment/:experiment',
      component: ExperimentComponent,
      children: [
        // {
        //   path: ':experiment',
        //   component: ExperimentComponent,
        // },
        // {
        //   path: '',
        //   component: CreateExperimentFormComponent,
        // },      {
        //   path: 'manage',
        //   component: ManageExperimentComponent,
        // },
      ] 
    },
    {
      path: 'create',
      component: CreateExperimentFormComponent,
    },      {
      path: 'manage',
      component: ManageExperimentComponent,
    },{
      path: 'submit',
      component: ThankYouComponent,
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
