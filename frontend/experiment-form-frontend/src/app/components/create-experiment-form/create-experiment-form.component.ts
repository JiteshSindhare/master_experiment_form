import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MessageService, ConfirmationService } from 'primeng-lts';

@Component({
  selector: 'app-create-experiment-form',
  templateUrl: './create-experiment-form.component.html',
  styleUrls: ['./create-experiment-form.component.scss'],
  providers: [MessageService, ConfirmationService]
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
  dummy:string;
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
      this.name = this.experimentName;
      this.experimentStruct['name'] = this.experimentName;
      this.experimentStruct['childs'] = [1,2,3,];
      this.experimentStruct['newChild'] = [{
        'question':'',
        'type' : ''
      }];
      this.messageService.add({ severity: 'success', summary: response.message });
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: error.error.message });
    })

  }

  deleteExperiment(id){
    this.dataService.deleteExperimentName(id).subscribe((response)=>{

    },(error) => {
      // const responseError = this.dataService.handleError(error);
      this.messageService.add({ severity: 'error', summary: error });
    });
  }

  createQuestion(expId){
    const questionData = {
      question : this.newQues,
      type: this.selectedValue
    }
    this.dataService.addQuestion(questionData,expId).subscribe((response)=>{
      this.experiment[0]['questions'].push(response.data);
      this.questions.push(response.data);
      this.messageService.add({ severity: 'success', summary: response.message });
    },(error) => {
      // const responseError = this.dataService.handleError(error);
      this.messageService.add({ severity: 'error', summary: error });
    });
    this.newQues = '';
    if (this.selectedValue == '0' || this.selectedValue == '1'){
      this.newQues = '';
    }else if(this.selectedValue == '2'){
      this.questions.push(this.options);
      this.options = [];
    }
  }

  createQuestionForOption(expId){
  }

  createOption(id,j){
    // id is id of question which option we want to add.
    //  j is index of question in which option is getting added.
    const optionData = {
      option_name : this.newOption
    }
    this.dataService.addOption(id,optionData).subscribe((response)=>{
      console.log(response);
      this.experiment[0].questions[j].options.push(response.data);
      this.messageService.add({ severity: 'success', summary: response.message });
    },(error) => {
      // const responseError = this.dataService.handleError(error);
      this.messageService.add({ severity: 'error', summary: error });
    });
    this.options.push(this.newOption);
    this.newOption = '';
  }

}
