import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Conteudo, ConteudoReference } from 'src/app/dto/conteudo/conteudo.dto';
import { Questao } from 'src/app/dto/questao/questao.dto';
import { QuestaoCategoria } from 'src/app/dto/questao/question.enum';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-add-card',
  templateUrl: './question-add-card.component.html',
  styleUrls: ['./question-add-card.component.css']
})
export class QuestionAddCardComponent {

  filterQuestionFormGroup!: FormGroup;
  userRole = sessionStorage.getItem("role");
  userId = sessionStorage.getItem("id");
  loadingTurmas: boolean = false;
  questions: Questao[] = [];
  contents: ConteudoReference[] = [];
  categories: string[] = [];
  types: string[] = [];
  selectedMetodology = "";
  selectedCategoryAllowed: boolean = false;
  selectedTypeAllowed: boolean = false;
  allowAddQuestion: boolean = false;
  @Output() addQuestion: EventEmitter<number> = new EventEmitter<number>();



  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private snackBar: MatSnackBar,
  ) {
  }



  ngOnInit(): void {
    if(this.userId){
      this.questionService.getAll().subscribe({
              next: (questions) => {
                this.questions = questions;

                for (const question of questions) {
                  if (question.conteudo !== null) {
                    if(question.conteudo?.metodo !== undefined && question.conteudo?.id !== undefined){
                      const content = new ConteudoReference(question.conteudo?.metodo, question.conteudo?.id);
                      if(!this.contents.find((contentAdded) => contentAdded.metodo == content.metodo)){
                        this.contents.push(content);
                      }
                    }

                  }
                }
              },
              error: (err) => {
                console.log(err);
              }
            })
    }
    this.filterQuestionFormGroup = this.formBuilder.group({

      metodologySelectedForm: new FormControl("", [
        Validators.required,
      ]),

      categorySelectedForm: new FormControl("", [
        Validators.required,
      ]),

      questionTypeSelectedForm: new FormControl("", [
        Validators.required,
      ]),

    });


  }

  get metodologySelectedForm() {
    return this.filterQuestionFormGroup.get('metodologySelectedForm');
  }
  get categorySelectedForm() {
    return this.filterQuestionFormGroup.get('categorySelectedForm');
  }

  get questionTypeSelectedForm() {
    return this.filterQuestionFormGroup.get('questionTypeSelectedForm');
  }

  selectMetodology(event: any){
    const metodoSelected = this.contents.find((content) => content.id === event.value)?.metodo;
    this.selectedCategoryAllowed = true;
    this.categories = this.questions
    .filter((question) => question.conteudo?.metodo === metodoSelected)
    .map((question) => question.categoria.toString());
  }

  selectCategory(event: any){
    const categorySelected = event.value;
    this.selectedTypeAllowed = true;
    this.types = this.questions
    .filter((question) => (question.conteudo?.id === this.metodologySelectedForm?.value && question.categoria === this.categorySelectedForm?.value))
    .map((question) => question.tipo.toString());
  }

  selectType(event: any){
    this.allowAddQuestion = true;
  }

  onAddQuestion(){
    const questionToAdd = this.questions.find((question) => (question.conteudo?.id === this.metodologySelectedForm?.value && question.categoria === this.categorySelectedForm?.value && question.tipo === this.questionTypeSelectedForm?.value))
    if(questionToAdd){
      this.addQuestion.emit(questionToAdd?.id);
    }else{
      this.openFailureSnackBar();
    }

  }

  openFailureSnackBar(){
    this.snackBar.open("Categoria ou tipo inválido!", "Ok", {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['red-snackbar','login-snackbar'],
      });
  }
}
