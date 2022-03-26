import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MessageService } from 'primeng-lts';

@Component({
  selector: 'app-create-experiment-form',
  templateUrl: './create-experiment-form.component.html',
  styleUrls: ['./create-experiment-form.component.scss']
})
export class CreateExperimentFormComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private messageService: MessageService) { }
  newOption:string;
  experiments =[];
  questions = [];
  selectedValue = '';
  name = '';
  newQues = '';
  experiment = [];
  addExperiment:boolean;
  experimentName:string;
  experimentStruct = {};
  questionType = {
    1:'single',
    2:'multi',
    3:'options'
  };
  options = [];
  ngOnInit() {
    console.log('in create expeirment form');
  }

  getExperiments(id){
    this.dataService.deleteExperimentName(id).subscribe((response)=>{

    },
    (error) => {
      // const responseError = this.dataService.handleError(error);
      this.messageService.add({ severity: 'error', summary: error });
    });
  }

  addQuestion(questionVal,type){
    const question ={
      questionName: questionVal,
      questionType: type
    }
    this.questions.push(question);
  }
  updateQuestion(id,val){

  }
  createExperiment(){
    const expName = {
      name:this.experimentName
    }
    this.dataService.addExperimentName(expName).subscribe((response)=>{
      console.log('response----',response)
      const newChild = {
        'question' : '',
        'type' : ''
      }
      response.data['newChild'] = newChild;
      this.experiment.push(response.data);
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: error });
    })
    this.name = this.experimentName;
    this.experimentStruct['name'] = this.experimentName;
    this.experimentStruct['childs'] = [1,2,3,];
    this.experimentStruct['newChild'] = [{
      'question':'',
      'type' : ''
    }];
    console.log('experiment structurew',this.experimentStruct);
  }

  deleteExperiment(id){
    this.dataService.deleteExperimentName(id).subscribe((response)=>{

    },(error) => {
      // const responseError = this.dataService.handleError(error);
      this.messageService.add({ severity: 'error', summary: error });
    })
  }

  createQuestion(){
    if (this.selectedValue == '1' || this.selectedValue == '2'){
      this.questions.push(this.newQues);
      this.newQues = ''
    }else if(this.selectedValue == '3'){
      this.questions.push(this.options);
      this.options = [];
    }
  }
  createOption(){
    
    this.options.push(this.newOption);
    this.newOption = '';
  }

}
