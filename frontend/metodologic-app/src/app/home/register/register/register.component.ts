import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/dto/aluno/aluno.dto';
import { Professor } from 'src/app/dto/professor/professor.dto';
import { UsuarioRequestDTO } from 'src/app/dto/usuario/UserRequestDTO';
import { AuthService } from 'src/app/services/auth.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerFormGroup!: FormGroup;
  imagemPromocional!: File | null;
  pathImagemPromocional!: string;

  constructor(
    // private imageUploadService : ImageUploadService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private teachersService: TeachersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }


  showSnackbar(message: string, durationInSeconds: number = 3): void {
    this.snackBar.open(message, 'x', {
      duration: durationInSeconds * 1000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });

  }
  openSuccessSnackBar(){
    this.snackBar.open("Usuário registrado!", "OK", {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: 'green-snackbar',
     });
  }

  openFailureSnackBar(){
    this.snackBar.open("Registro inválido!", "Try again!", {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['red-snackbar','login-snackbar'],
      });
  }


  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
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
        Validators.maxLength(100),
      ]),

      instituicaoEnsino: new FormControl('', [
        Validators.maxLength(100),
      ]),

      tipoPerfil: new FormControl('', [Validators.required]),


    });

  }

  get nome() {
    return this.registerFormGroup.get('nome');
  }
  get email() {
    return this.registerFormGroup.get('email');
  }
  get senha() {
    return this.registerFormGroup.get('senha');
  }
  get dataNascimento() {
    return this.registerFormGroup.get('dataNascimento');
  }
  get curso() {
    return this.registerFormGroup.get('curso');
  }
  get instituicaoEnsino() {
    return this.registerFormGroup.get('instituicaoEnsino');
  }

  get tipoPerfil() {
    return this.registerFormGroup.get('tipoPerfil');
  }

  private createUsuario(): UsuarioRequestDTO {
    return new UsuarioRequestDTO(
      this.nome!.value,
      this.email!.value,
      this.senha!.value,
      this.dataNascimento!.value,
      this.curso!.value,
      this.instituicaoEnsino!.value,
      this.tipoPerfil!.value
    );
  }

  onImageSelected(image: File | null): void {
    if (image) {
      this.imagemPromocional = image;
    } else {
      this.imagemPromocional = null;
      console.log('Nenhuma imagem selecionada.');
    }
  }

  onSubmitCadastro(): void {
      this.authService.register(this.createUsuario()).subscribe({
        next: (response) => {
          this.openSuccessSnackBar();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.openFailureSnackBar();
        },
      });
  }

  // cadastrarEvento(){
  //   let evento: Evento = this.criarEvento();

  //   this.eventoService.salvar(evento).subscribe({
  //     next: (response) => {
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}

