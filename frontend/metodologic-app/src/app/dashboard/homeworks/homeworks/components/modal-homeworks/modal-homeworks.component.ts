import { ClassesService } from 'src/app/services/classes.service';
import { Component, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TarefaCreate } from 'src/app/dto/tarefa/tarefa.dto';
import { HomeworksService } from 'src/app/services/homeworks.service';
import { Turma } from 'src/app/dto/turma/turma.dto';

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



  constructor(
    private homeworksService: HomeworksService,
    private classesService: ClassesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }



  ngOnInit(): void {
    if(this.userId){
      this.classesService.getClassesByProfessor(+this.userId).subscribe({
        next: (data)=>{
          this.classes = data;
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

}

