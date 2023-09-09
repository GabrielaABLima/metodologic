import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/dto/aluno/aluno.dto';

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
  imagemPromocional!: File | null;
  pathImagemPromocional!: string;


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
    // private imageUploadService : ImageUploadService,
    //private studentsService: StudentsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.createClassFormGroup = this.formBuilder.group({
      nome: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),

      senha: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),

      confirmarSenha: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),

      dataNascimento: new FormControl('', [Validators.required]),

      curso: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),

      instituicaoEnsino: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),

      tipoPerfil: new FormControl('', [Validators.required]),


    });

  }

  get nome() {
    return this.createClassFormGroup.get('nome');
  }
  get email() {
    return this.createClassFormGroup.get('email');
  }
  get senha() {
    return this.createClassFormGroup.get('senha');
  }
  get dataNascimento() {
    return this.createClassFormGroup.get('dataNascimento');
  }
  get curso() {
    return this.createClassFormGroup.get('curso');
  }
  get instituicaoEnsino() {
    return this.createClassFormGroup.get('instituicaoEnsino');
  }

  get tipoPerfil() {
    return this.createClassFormGroup.get('tipoPerfil');
  }
  // private createAluno(): Aluno {
  //   return new Aluno(
  //     this.nome!.value,
  //     this.email!.value,
  //     this.senha!.value,
  //     this.dataNascimento!.value,
  //     this.curso!.value,
  //     this.instituicaoEnsino!.value,
  //     0,
  //     0
  //   );
  // }

  onImageSelected(image: File | null): void {
    if (image) {
      this.imagemPromocional = image;
    } else {
      this.imagemPromocional = null;
      console.log('Nenhuma imagem selecionada.');
    }
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

  }

  acaoPrimaria(){

  }
}
