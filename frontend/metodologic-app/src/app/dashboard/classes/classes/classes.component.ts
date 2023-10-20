import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassesStudentsService } from 'src/app/services/classes_students.service';
import { Component, ElementRef, SimpleChanges, ViewChild, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/dto/aluno/aluno.dto';
import { Professor } from 'src/app/dto/professor/professor.dto';
import { Turma } from 'src/app/dto/turma/turma.dto';
import { ModalComponent } from 'src/app/modal/modal.component';
import { ClassesService } from 'src/app/services/classes.service';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent{

  @ViewChild('modal') modal: any;


  displayedColumns: string[] = ['code', 'name', 'institution', 'course', 'participant', 'description'];
  searchInput = "";
  classes: Turma[] = [];
  resultados: Turma[] = [];
  userRole = sessionStorage.getItem("role");
  userId = sessionStorage.getItem("id");
  titleEmpty = this.userRole === "aluno" ? "Nenhuma turma encontrada" : "Sem turmas criadas";
  descriptionEmpty = this.userRole === "aluno" ? "Parece que você ainda não está inscrito em nenhuma turma. Clique no botão abaixo para se increver em uma nova turma!" : "Não há turmas atribuídas no momento. Crie uma nova turma para começar a ensinar.";
  buttonEmpty = this.userRole === "aluno" ? "Inscrever-se" : "Criar turma";
  title = this.userRole === "aluno" ? "Inscrever-se em nova turma" : "Criar nova turma";
  deleteTitle = this.userRole === "aluno" ? "Desinscrever-se da turma" : "Deletar turma";
  descriptionDelete = this.userRole === "aluno" ?
  "Tem certeza de que deseja desinscrever-se desta turma? As novas tarefas não serão apresentadas a você." :
  "Tem certeza de que deseja excluir esta turma? A exclusão removerá todos os alunos inscritos, todas tarefas e suas respectivas questões cadastradas.";

  constructor(
    private classesService: ClassesService,
    private classesStudentsService: ClassesStudentsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.searchInput = "";
    if(this.userId){
      if(this.userRole === 'professor'){
        this.classesService.getClassesByProfessor(+this.userId).subscribe({
          next: (response) => {
            this.classes = response;
            this.resultados = this.classes;
          },
          error: (err) => {
            console.log(err);
          }
        })
      }else{
        this.classesStudentsService.getClassesByAluno(+this.userId).subscribe({
          next: (response) => {
            response.map((turma) => {
              this.classes.push(turma);
            })
            this.resultados = this.classes;
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    }

  }

  emptyClick(){
    this.modal.toggle();
  }

  handleDeleteClass(classId: string | number) {
    if(this.userRole === 'professor'){
      this.classesService.deleteClassByCode(classId + "").subscribe(
        () => {
          this.openSuccessSnackBar("Turma deletada");
        },
        (error) => {
          this.openFailureSnackBar("Erro ao deletar turma");
        }
      );
    }else{
      if(this.userId){
        this.classesStudentsService.removerAlunoTurma(+this.userId, classId + "").subscribe(
          () => {
            this.openSuccessSnackBar("Aluno removido");
          },
          (error) => {
            this.openFailureSnackBar("Erro ao remover aluno");
          }
        );
      }
    }
    window.location.reload();
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

  handleSearch(event: any) {
      this.resultados = this.classes.filter((classe) => {
        return Object.values(classe).some((valor) => {
          return (valor + "").toLowerCase().includes(this.searchInput.toLowerCase());
        });
      });

  }
}

