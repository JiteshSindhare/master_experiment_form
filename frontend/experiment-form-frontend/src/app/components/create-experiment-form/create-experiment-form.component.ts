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
  questionOfOption: string;
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
      response.data['questions'] = [];
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
    });
  }

  createQuestion(expId){
    if (this.selectedValue == '0' || this.selectedValue == '1'){
      // this.questions.push(this.newQues);
      
      const questionData = {
        question : this.newQues,
        type: this.selectedValue
      }
      this.dataService.addQuestion(questionData,expId).subscribe((response)=>{
        console.log('resposne after adding question',response);
        console.log('experiment is',this.experiment);
        this.experiment[0]['questions'].push(response.data);
        this.questions.push(response.data);
      },(error) => {
        // const responseError = this.dataService.handleError(error);
        this.messageService.add({ severity: 'error', summary: error });
      });
      this.newQues = '';
    }else if(this.selectedValue == '2'){
      this.questions.push(this.options);
      this.options = [];
    }
  }

  createQuestionForOption(){

  }

  createOption(){
    
    this.options.push(this.newOption);
    this.newOption = '';
  }

}
