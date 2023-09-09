import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/dto/aluno/aluno.dto';
import { Professor } from 'src/app/dto/professor/professor.dto';
import { Turma } from 'src/app/dto/turma/turma.dto';
import { ClassesService } from 'src/app/services/classes.service';

export default interface PeriodicElement {
  code: string;
  name: string;
  course: string;
  institution: string;
  participant: number;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {code: "ECC6", name: 'Escrita científica', institution: "IFSP", course: "Bacharelado em Ciência da Computação", participant: 25, description: "Disciplina que tem como foco o ensino da escrita necessária para produção de textos científicos"},
  {code: "PDTC7", name: 'Produção de Textos Científicos', institution: "IFSP", course: "Engenharia de Controle e Automação", participant: 33, description: "Disciplina que tem como foco o ensino da escrita necessária para produção de textos científicos"},
  {code: "MTDPC", name: 'Metodologias de Pesquisa', institution: "Unifeob", course: "Workshop de Produção de textos", participant: 21, description: "Disciplina que tem como foco o ensino da escrita necessária para produção de textos científicos"},
  {code: "TDEC", name: 'Técnicas de Escritas Científicas', institution: "UNIFAE", course: "Palestra - textos acadêmicos", participant: 25, description: "Disciplina que tem como foco o ensino da escrita necessária para produção de textos científicos"},

];

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {
  displayedColumns: string[] = ['code', 'name', 'institution', 'course', 'participant', 'description'];
  dataSource = ELEMENT_DATA;

  createClassFormGroup!: FormGroup;


  aluno = new Aluno(
        "Gabi",
        "gabi@gmail.com",
        "senha",
        new Date(2020, 10, 25),
        "BCC",
        "IFSP",
        0,
        0
      );
  alunos: Aluno[]= [this.aluno];

  constructor(
    //private studentsService: StudentsService,
    private classesService: ClassesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.createClassFormGroup = this.formBuilder.group({
      codigo: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),

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

  }

  get codigo() {
    return this.createClassFormGroup.get('codigo');
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
  private createTurma(): Turma {
    return new Turma(
      this.nome!.value,
      this.codigo!.value,
      this.curso!.value,
      this.instituicaoEnsino!.value,
      this.descricao!.value,
      1,
      [1],
    );
  }


  selectStudents = "tab";
  formCreateClass = "active tab";


  clickCriarClasse() {
    this.formCreateClass = 'active tab';
    this.selectStudents = 'tab';
  }
  clickStudents() {
    this.formCreateClass = 'tab';
    this.selectStudents = 'active tab';
  }

  onSubmitCadastro(): void {
    this.classesService.save(this.createTurma()).subscribe({
      next: (response) => {
        console.log(response);
        // this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  acaoPrimaria(){

  }
}
