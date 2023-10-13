import { ActivatedRoute, Router } from '@angular/router';
import { HomeworksService } from './../../../services/homeworks.service';
import { Component, ViewChild } from '@angular/core';
import { Tarefa } from 'src/app/dto/tarefa/tarefa.dto';


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
  tarefas: Tarefa[] = [];
  resultados: Tarefa[] = [];
  constructor(
    private homeworksService: HomeworksService,
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
        // this.classesStudentsService.getClassesByAluno(+this.userId).subscribe({
        //   next: (response) => {
        //     response.map((turma) => {
        //       this.classes.push(turma);
        //     })
        //     this.resultados = this.classes;
        //   },
        //   error: (err) => {
        //     console.log(err);
        //   }
        // })
      }
    }

  }

  emptyClick(){
    this.modal.toggle();
  }
}
