import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentsHomeworksService } from 'src/app/services/students_homeworks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeworksService } from './../../../services/homeworks.service';
import { Component, ViewChild } from '@angular/core';
import { Tarefa, TarefaByAluno } from 'src/app/dto/tarefa/tarefa.dto';
import { Questao } from 'src/app/dto/questao/questao.dto';
import { ClassesService } from 'src/app/services/classes.service';
import { QuestionService } from 'src/app/services/question.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.css']
})
export class HomeworksComponent {

  @ViewChild('modal') modal: any;

  userRole = sessionStorage.getItem("role");
  userId = sessionStorage.getItem("id");
  titleEmpty = this.userRole === "aluno" ? "Nenhuma tarefa atribuída" : "Sem tarefas criadas";
  descriptionEmpty = this.userRole === "aluno" ? "Parece que você ainda não tem nenhuma tarefa atribuída de nenhuma turma que faz parte." : "Não há tarefas criadas para nenhuma turma no momento. Crie uma nova tarefa para começar a ensinar.";
  displayedColumns: string[] = ['name', 'institution', 'course', 'deliveryDate', 'postDate', 'grade', 'maxGrade'];
  colors = ["#FCFA14", "#FED812", "#FFBE0D", "#FD9D0C"];
  questions: Questao[] = [];
  tarefas: Tarefa[] = [];
  tarefasAluno: TarefaByAluno[] = [];
  resultados: Tarefa[] = [];
  loadingAluno: boolean = true;
  dataAtual: Date = new Date();
  constructor(
    private homeworksService: HomeworksService,
    private studentsHomeworksService: StudentsHomeworksService,
    private questionService: QuestionService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }



  ngOnInit(): void {
    if(this.userId){
      if(this.userRole === 'professor'){
        this.homeworksService.getHomeworksByProfessor(+this.userId).subscribe({
          next: (response) => {
            response.map((tarefa) => {
              this.tarefas.push(tarefa);
            })
            this.resultados = this.tarefas;
          },
          error: (err) => {
            console.log(err);
          }
        })

      }else{
        const homeworksObservable = this.homeworksService.getHomeworksByStudent(+this.userId);
        const studentsHomeworksObservable = this.studentsHomeworksService.getHomeworksByStudent(+this.userId);
        forkJoin([homeworksObservable, studentsHomeworksObservable]).subscribe({
          next: ([homeworksResponse, studentsHomeworksResponse]) => {

            this.tarefasAluno = homeworksResponse.map((tarefa) => {
              return new TarefaByAluno(tarefa, "-", false);
            });

            studentsHomeworksResponse.map((tarefa) => {
              this.tarefasAluno.forEach((tarefaAluno) => {
                if (tarefaAluno.tarefa.id == tarefa.tarefa.id) {
                  tarefaAluno.nota = tarefa.nota + "%";
                  tarefaAluno.done = true;
                }
              });
            });

            this.loadingAluno = false;
          },
          error: (err) => {
            console.log(err);
            this.loadingAluno = false;
          }
        });

      }
    }

  }
  openHomework(id: number){
    this.router.navigate(['/question/homework/' + id]);
  }

  emptyClick(){
    this.modal.toggle();
  }

  handleDeleteHomework(id: number | string){
    this.homeworksService.delete(id + "").subscribe(
      () => {
        window.location.reload();
      },
      (error) => {
        this.openFailureSnackBar("Erro ao deletar turma");
      }
    );

  }

  openFailureSnackBar(message: string){
    this.snackBar.open(message, "OK", {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['red-snackbar','login-snackbar'],
      });
  }
}
