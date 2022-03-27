import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MessageService,ConfirmationService } from 'primeng-lts';

@Component({
  selector: 'app-manage-experiment',
  templateUrl: './manage-experiment.component.html',
  styleUrls: ['./manage-experiment.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ManageExperimentComponent implements OnInit {

  constructor(private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }
  
    experiments = [];
  ngOnInit(): void {
    this.getAllExperiments();
  }
  getAllExperiments(){
    this.dataService.getAllExperiments().subscribe((response)=>{
      this.experiments = response.data;
    })
  }
  deleteExperiment(id){
    this.confirmationService.confirm({
      message: 'Do you want to delete this experiment ?',
      accept: () => {
          this.dataService.deleteExperimentName(id).subscribe((response)=>{
          this.messageService.add({ severity: 'success', summary: response.message });
          this.ngOnInit();
        },(error) => {
          // const responseError = this.dataService.handleError(error);
          this.messageService.add({ severity: 'error', summary: error });
        });
      },
    });
  }
  toggleExperimentStatus(id){
    this.confirmationService.confirm({
      message: 'Do you want to change status of this experiment ?',
      accept: () => {
        this.dataService.changeExperimentStatus(id).subscribe((response)=>{
        this.ngOnInit()
        },(error) => {
          // const responseError = this.dataService.handleError(error);
          this.messageService.add({ severity: 'error', summary: error });
        });
      },
    });
  }
}
