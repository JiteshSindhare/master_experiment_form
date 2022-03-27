import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import {SelectItem} from 'primeng-lts/api';

import { ConfirmationService, MessageService } from 'primeng-lts/api';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ExperimentComponent implements OnInit {

  experimentName: string;
  experiment: any;
  dummy: string;
  experimentOptions = [];
  experimentOption:SelectItem[];
  allExperiments = [];
  selectedExperiment:string;
  noExperimentSelected = false ;
  constructor(
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.params.subscribe((params) => {
      console.log('params', params, 'par.exp',params.experiment);
      if (params.experiment === '1' || params.experiment === 1 || params.experiment == ''){
        this.getAllExperiments();
        this.noExperimentSelected = true;
      }else{
        this.experimentName = params.experiment;
        this.getExperimentToPerform(this.getExperimentToPerform(this.experimentName));
      }

    });
  }

  ngOnInit(): void {
    this.getAllExperiments();
  }
  getExperimentToPerform(name){
    this.dataService.getExperimentByName(this.experimentName).subscribe((response)=>{
      this.experiment = response.data;
    },(error) => {
          // const responseError = this.dataService.handleError(error);
          this.messageService.add({ severity: 'error', summary: error });
      });
  }
  getExperimentById(expId){
    this.dataService.getExperiment(expId.code).subscribe((response)=>{
      console.log(response);
      this.experiment = response.data;
      let exp_name = response.data.experiment_name.replace(' ','-');
      exp_name = exp_name.toLowerCase()
      this.router.navigate(['/experiment/'+exp_name]);
      this.noExperimentSelected = false;
    })
  }
  submitExperiment(expId){
    this.confirmationService.confirm({
      message: 'Do you want to submit response ?',
      accept: () => {
        const response = {
          response : this.experiment
        }
          this.dataService.submitExperimentResponse(expId,response).subscribe((response)=>{
          this.messageService.add({ severity: 'success', summary: response.message });
          this.router.navigate(['/submit']);
          this.ngOnInit();
        },(error) => {
          // const responseError = this.dataService.handleError(error);
          this.messageService.add({ severity: 'error', summary: error });
        });
      },
    });
  }
  getAllExperiments(){
    this.dataService.getAllExperiments().subscribe((response)=>{
      let options = [];
      options.push({name:'Select experiment', code:null});
      for(let i =0;i<response.data.length;i++){
        const data={
          name:response.data[i].experiment_name,code:response.data[i].id
        }
        options.push(data);
      }
      this.experimentOptions = response.data;
      this.allExperiments = response.data;
      this.experimentOptions = options;
      // this.experimentOption = options;
      // console.log('options',this.experimentOptions,this.experimentOption);
    })
  }
}
