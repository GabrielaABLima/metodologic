import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { UpdateUserRequestDTO } from 'src/app/dto/usuario/UpdateUserRequestDTO';
import { Usuario } from 'src/app/dto/usuario/UsuarioDTO';
import { UsersService } from 'src/app/services/users.service';
import html2canvas from 'html2canvas';



export interface PeriodicElement {
  name: string;
  description: string;
  points: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Aprendiz Metodológico', description: "Concluir os desafios iniciais do módulo 1.", points: 50 },
  { name: 'Maestro da Estruturação', description: "Construir uma base teórica de 5 metodologias", points: 75 },
  { name: 'Maestro da Escrita Científica', description: "Finalizar o modo jornada", points: 100 },
];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  editFormGroup!: FormGroup;
  editProfileClass = "tab";
  achievementsClass = "active tab";
  generatingPdf = false;
  type = 0;

  displayedColumns: string[] = ['name', 'description', 'points'];
  dataSource = ELEMENT_DATA;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  clickEdit() {
    this.editProfileClass = 'active tab';
    this.achievementsClass = 'tab';
  }
  clickAchievement() {
    this.editProfileClass = 'tab';
    this.achievementsClass = 'active tab';
  }

  ngOnInit(){
    this.iniciarFormulario();
    const id = sessionStorage.getItem("id");
    if(id){
      this.userService.getById(+id).subscribe(
        (data: Usuario) => {
          this.nome?.setValue(data.nome);
          this.email?.setValue(data.email);
          this.curso?.setValue(data.curso);
          this.instituicaoEnsino?.setValue(data.instituicaoEnsino);
          const dataNascimento = new Date(data.dataNascimento);
          const dataNascimentoFormatado = this.formatarData(dataNascimento);
          this.dataNascimento?.patchValue(dataNascimentoFormatado);
          console.log((dataNascimentoFormatado));
        },
        (error) => {
          console.error(error);
        }
      );
    }

  }

  private formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  iniciarFormulario(): void {
    this.editFormGroup = this.formBuilder.group({
      nome: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),

      dataNascimento: new FormControl('', [Validators.required]),

      curso: new FormControl('', [
        Validators.maxLength(100),
      ]),

      instituicaoEnsino: new FormControl('', [
        Validators.maxLength(100),
      ]),
    });

  }

  get nome() {
    return this.editFormGroup.get('nome');
  }
  get email() {
    return this.editFormGroup.get('email');
  }

  get dataNascimento() {
    return this.editFormGroup.get('dataNascimento');
  }
  get curso() {
    return this.editFormGroup.get('curso');
  }
  get instituicaoEnsino() {
    return this.editFormGroup.get('instituicaoEnsino');
  }

  openSuccessSnackBar(){
    this.snackBar.open("Usuário editado com sucesso!", "OK", {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: 'green-snackbar',
     });
  }

  openFailureSnackBar(){
    this.snackBar.open("Edição inválida!", "Try again!", {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['red-snackbar','login-snackbar'],
      });
  }

  private createUpdateUsuario(): UpdateUserRequestDTO {
    return new UpdateUserRequestDTO(
      this.nome!.value,
      this.email!.value,
      this.dataNascimento!.value,
      this.curso!.value,
      this.instituicaoEnsino!.value
    );
  }


  onSubmitCadastro(): void {
    const id = sessionStorage.getItem("id");
    if(id){
      this.userService.updateUser(+id, this.createUpdateUsuario()).subscribe({
        next: (response) => {
          this.openSuccessSnackBar();
        },
        error: (err) => {
          this.openFailureSnackBar();
        },
      });
    }
}

  shareLinkedin() {
    const location = 'https://acomtece.sbv.ifsp.edu.br/';
        const titulo = 'Minha conquista de Aprendiz Metodológico';
        const url = `https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(titulo)}&url=${encodeURIComponent(location)}`;
        window.open(url, 'mywin', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
    }

  gerarPDF() {
    this.type = 1;
    this.generatingPdf = true;

    const element = document.getElementById('certificado');

    if (element && this.generatingPdf) {
      html2canvas(element).then((canvas) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL('image/png');

        downloadLink.download = 'certificado.png';

        // Adiciona o link ao documento
        document.body.appendChild(downloadLink);

        // Simula um clique no link para iniciar o download
        downloadLink.click();

        // Remove o link do documento
        document.body.removeChild(downloadLink);
      });
    }

    this.generatingPdf = false;
    this.type = 0;
  }





}
