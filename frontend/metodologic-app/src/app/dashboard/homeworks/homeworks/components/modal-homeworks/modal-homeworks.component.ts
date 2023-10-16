import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionsHomeworksService } from './../../../../../services/questions_homeworks.service';
import { ClassesService } from 'src/app/services/classes.service';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarefa, TarefaCreate } from 'src/app/dto/tarefa/tarefa.dto';
import { HomeworksService } from 'src/app/services/homeworks.service';
import { Turma } from 'src/app/dto/turma/turma.dto';
import { Questao } from 'src/app/dto/questao/questao.dto';

@Component({
  selector: 'app-modal-homeworks',
  templateUrl: './modal-homeworks.component.html',
  styleUrls: ['./modal-homeworks.component.css']
})
export class ModalHomeworksComponent {
  createHomeworkFormGroup!: FormGroup;
  userRole = sessionStorage.getItem("role");
  userId = sessionStorage.getItem("id");
  classSelected = "";
  loadingTurmas: boolean = false;
  classes: Turma[] = [];
  formCreateClass = "active tab";
  selectAddQuestions = "tab";
  @Input() tarefaId?: string;
  homeworkToEdit!: Tarefa;
  questionsFromHomework: Questao[] = [];
  questionToEdit!: Tarefa;



  constructor(
    private homeworksService: HomeworksService,
    private classesService: ClassesService,
    private questionsHomeworksService: QuestionsHomeworksService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tarefaId'] && !changes['tarefaId'].firstChange) {
      const novoValor = changes['tarefaId'].currentValue;

      if(this.tarefaId){
        this.questionsHomeworksService.getQuestionsByHomework(+this.tarefaId).subscribe({
          next: (response) => {
            console.log(response);
            response.map((question) => {
              this.questionsFromHomework.push(question);
            })
          },
          error: (err) => {
            console.log(err);
          }
        })
        this.homeworksService.getHomeworkById(+this.tarefaId).subscribe({
          next: (response) => {
            this.questionToEdit = response;
            const dataEntrega = new Date(this.questionToEdit?.dataEntrega);
            const dataEntregaFormatado = this.formatarData(dataEntrega);
            this.createHomeworkFormGroup.patchValue({
              nome: this.questionToEdit?.nome,
              dataEntrega: dataEntregaFormatado,
              classSelectedForm: this.questionToEdit?.turma.id,
            });
          }
        })

      }
    }
  }



  ngOnInit(): void {
    if(this.userId){
      this.classesService.getClassesByProfessor(+this.userId).subscribe({
        next: (data)=>{
          this.classes = data;
        }
      })
    }

    if(this.tarefaId){
      this.questionsHomeworksService.getQuestionsByHomework(+this.tarefaId).subscribe({
        next: (response) => {
          console.log(response);
          response.map((question) => {
            this.questionsFromHomework.push(question);
          })
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    this.createHomeworkFormGroup = this.formBuilder.group({

      nome: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),

      dataEntrega: new FormControl('', [Validators.required]),

      classSelectedForm: new FormControl("", [
        Validators.required,
      ]),

    });


  }

  get nome() {
    return this.createHomeworkFormGroup.get('nome');
  }
  get dataEntrega() {
    return this.createHomeworkFormGroup.get('dataEntrega');
  }

  get classSelectedForm() {
    return this.createHomeworkFormGroup.get('classSelectedForm');
  }


  clickCreateHomework() {
    this.formCreateClass = 'active tab';
    this.selectAddQuestions = 'tab';
  }
  clickAddQuestions() {
    this.formCreateClass = 'tab';
    this.selectAddQuestions = 'active tab';
  }

  private createTarefa(): TarefaCreate | undefined {
    if(this.userId){
      const nome = this.nome!.value;
      const dataEntrega = this.dataEntrega!.value;
      const dataAtribuicao = new Date();
      return new TarefaCreate(
        nome,
        dataEntrega,
        dataAtribuicao,
        this.classSelectedForm!.value,
      );
    }else{
      return undefined;
    }
  }


  onSubmitCadastro(): void {
    const tarefa = this.createTarefa();
    if(tarefa){
      this.homeworksService.save(tarefa).subscribe({
        next: (response) => {
          console.log(response);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  // handleSubscribe(){
  //     if(this.userId && this.searchedClass.codigo){
  //         this.classesStudentsService.add({alunoId: +this.userId, turmaCod: this.searchedClass.codigo}).subscribe({
  //           next: (response) => {
  //             window.location.reload();
  //           },
  //           error: (err) => {
  //             console.log(err);
  //           }
  //         })
  //     }
  // }

  handleAddQuestion(event: any){
    if(this.tarefaId){
      this.questionsHomeworksService.add({tarefaId: +this.tarefaId, questaoId: event}).subscribe({
        next: (response) => {
          console.log(response);
          this.questionsFromHomework.push(response);
        },
        error: (err) => {
          // this.openFailureSnackBar();
        },
      });
    }
  }

  handleDeleteQuestion(event: any){
    if(this.tarefaId){
      this.questionsHomeworksService.deleteQuestionHomework(+this.tarefaId, event).subscribe({
        next: (response) => {
          this.questionsFromHomework = this.questionsFromHomework.filter((question) => question.id !== response.id);
          this.openSuccessSnackBar("Questão removida com sucesso!");
        },
        error: (err) => {
          this.openFailureSnackBar("Não foi possível remover a questão.");
        },
      });
    }
  }

  openSuccessSnackBar(message: string){
    this.snackBar.open(message, "OK", {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: 'green-snackbar',
    });
  }

  openFailureSnackBar(message: string){
    this.snackBar.open(message, "OK", {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['red-snackbar','login-snackbar'],
      });
  }

  private formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }
}


