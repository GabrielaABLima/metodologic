import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/dto/aluno/aluno.dto';
import { Turma } from 'src/app/dto/turma/turma.dto';
import { ClassesService } from 'src/app/services/classes.service';
import { ClassesStudentsService } from 'src/app/services/classes_students.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-modal-classes',
  templateUrl: './modal-classes.component.html',
  styleUrls: ['./modal-classes.component.css']
})
export class ModalClassesComponent implements OnChanges {
  createClassFormGroup!: FormGroup;
  searchStudentFormGroup!: FormGroup;
  studentsSearchResult: Aluno[] = [];
  studentsToAdd: Aluno[] = [];
  studentsFromClass: Aluno[] = [];
  userRole = sessionStorage.getItem("role");
  userId = sessionStorage.getItem("id");
  codigo = "";
  searchedClass!: Turma;
  @Input() classId?: string;


  constructor(
    private classesStudentsService: ClassesStudentsService,
    private classesService: ClassesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['classId'] && !changes['classId'].firstChange) {
      const novoValor = changes['classId'].currentValue;

      console.log('Novo valor de seuInput:', novoValor);
      if(this.classId){
        this.classesStudentsService.getAlunosByTurma(this.classId).subscribe({
          next: (response) => {
            console.log(response);
            response.map((student) => {
              this.studentsFromClass.push(student);
            })
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    }
  }


  ngOnInit(): void {
    this.createClassFormGroup = this.formBuilder.group({

      nome: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),

      curso: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),

      instituicaoEnsino: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),

      descricao: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),


    });

    this.searchStudentFormGroup = this.formBuilder.group({
      busca: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

  }

  get nome() {
    return this.createClassFormGroup.get('nome');
  }
  get descricao() {
    return this.createClassFormGroup.get('descricao');
  }
  get curso() {
    return this.createClassFormGroup.get('curso');
  }
  get instituicaoEnsino() {
    return this.createClassFormGroup.get('instituicaoEnsino');
  }

  get busca() {
    return this.searchStudentFormGroup.get('busca');
  }


  private createTurma(): Turma | undefined {
    if(this.userId){
      const nome = this.nome!.value;
      const curso = this.curso!.value;
      const instituicao = this.instituicaoEnsino!.value;
      const dataAtual = new Date();
      const anoAtual = dataAtual.getFullYear().toString();
      var ultimosDoisDigitos = anoAtual.slice(-2);
      this.codigo = (nome.slice(0, 2) + curso.slice(0, 2) + instituicao.slice(0,2) + ultimosDoisDigitos).toLocaleUpperCase();
      return new Turma(
        this.nome!.value,
        this.codigo,
        this.curso!.value,
        this.instituicaoEnsino!.value,
        this.descricao!.value,
        +this.userId,
      );
    }else{
      return undefined;
    }
  }


  selectStudents = "tab";
  formCreateClass = this.userRole === 'aluno' ? "tab" : "active tab";
  selectAddStudents = this.userRole === 'aluno' ? "active tab" : "tab";


  clickCriarClasse() {
    this.formCreateClass = 'active tab';
    this.selectStudents = 'tab';
    this.selectAddStudents = 'tab';
  }
  clickAddStudents() {
    this.formCreateClass = 'tab';
    this.selectStudents = 'tab';
    this.selectAddStudents = 'active tab';
  }
  clickStudents() {
    this.formCreateClass = 'tab';
    this.selectStudents = 'active tab';
    this.selectAddStudents = 'tab';
  }

  onSubmitCadastro(): void {
    const turma = this.createTurma();
    if(turma){
      this.classesService.save(turma).subscribe({
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

  onSubmitSearch(): void {
    this.classesService.getClassByCode(this.busca?.value).subscribe({
      next: (response) => {
        this.searchedClass = response;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  handleSubscribe(){
      if(this.userId && this.searchedClass.codigo){
          this.classesStudentsService.add({alunoId: +this.userId, turmaCod: this.searchedClass.codigo}).subscribe({
            next: (response) => {
              console.log(response);
            },
            error: (err) => {
              console.log(err);
            }
          })
      }
  }




  handleAction(id: number) {
    const studentSelected = this.studentsSearchResult.find((student) => student.id === id);
    if(studentSelected) {
      this.studentsToAdd.push(studentSelected);
      this.studentsSearchResult = this.studentsSearchResult.filter((student) => student.id !== id);
    }
  }

  handleRemove(id: number) {
    this.studentsToAdd = this.studentsToAdd.filter((student) => student.id !== id);
  }

  removeStudent(studentId?: number){
    if(studentId && this.classId){
      this.classesStudentsService.removerAlunoTurma(studentId, this.classId);
      //this.studentsFromClass = this.studentsFromClass.filter((student) => student.id !== studentId);
    }
  }
}
