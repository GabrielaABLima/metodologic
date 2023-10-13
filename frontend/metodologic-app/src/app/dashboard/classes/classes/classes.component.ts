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
export class ClassesComponent implements OnChanges{

  @ViewChild('modal') modal: any;


  displayedColumns: string[] = ['code', 'name', 'institution', 'course', 'participant', 'description'];
  classes: Turma[] = [];
  resultados: Turma[] = [];
  termoDePesquisa = '';
  userRole = sessionStorage.getItem("role");
  userId = sessionStorage.getItem("id");
  titleEmpty = this.userRole === "aluno" ? "Nenhuma turma encontrada" : "Sem turmas criadas";
  descriptionEmpty = this.userRole === "aluno" ? "Parece que você ainda não está inscrito em nenhuma turma. Clique no botão abaixo para se increver em uma nova turma!" : "Não há turmas atribuídas no momento. Crie uma nova turma para começar a ensinar.";
  buttonEmpty = this.userRole === "aluno" ? "Inscrever-se" : "Criar turma";
  title = this.userRole === "aluno" ? "Inscrever-se em nova turma" : "Criar nova turma";

  constructor(
    private classesService: ClassesService,
    private classesStudentsService: ClassesStudentsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    if(this.userId){
      if(this.userRole === 'professor'){
        this.classesService.getClassesByProfessor(+this.userId).subscribe({
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['termoDePesquisa']) {
      this.pesquisar();
    }
  }
  pesquisar() {
    if(this.termoDePesquisa === ''){
      this.resultados = this.classes;
    }
    this.resultados = this.classes.filter(objeto => {
      const lowercaseTermo = this.termoDePesquisa.toLowerCase();

      return objeto.nome.toLowerCase().includes(lowercaseTermo) ||
        (objeto.descricao && objeto.descricao.toLowerCase().includes(lowercaseTermo)) ||
        objeto.codigo.toLowerCase().includes(lowercaseTermo) ||
        objeto.instituicaoEnsino.toLowerCase().includes(lowercaseTermo);
    });
  }

  emptyClick(){
    this.modal.toggle();
  }

  handleDeleteClass(classId: string | number) {
    this.classesService.deleteClassByCode(classId + "").subscribe(
      () => {
        this.openSuccessSnackBar("Turma deletada");
      },
      (error) => {
        this.openFailureSnackBar("Erro ao deletar turma");
      }
    );
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
}

