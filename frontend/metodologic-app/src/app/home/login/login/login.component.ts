import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequestDTO } from 'src/app/dto/usuario/LoginRequestDTO';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  registerFormGroup!: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  openSuccessSnackBar(message: string){
    this.snackBar.open(message, "OK", {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: 'green-snackbar',
     });
  }

  openFailureSnackBar(){
    this.snackBar.open("Login inválido!", "Try again!", {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['red-snackbar','login-snackbar'],
      });
  }


  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),

      senha: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
    });

  }


  get email() {
    return this.registerFormGroup.get('email');
  }
  get senha() {
    return this.registerFormGroup.get('senha');
  }


  private createCredentials(): LoginRequestDTO {
    return new LoginRequestDTO(
      this.email!.value,
      this.senha!.value,
    );
  }
  onSubmitLogin(): void {
    this.authService.login(this.createCredentials()).subscribe({
      next: (response) => {
        if(response.role === "aluno") this.openSuccessSnackBar("Aluno logado com sucesso!");
        if(response.role === "professor") this.openSuccessSnackBar("Professor logado com sucesso");
        this.router.navigate(['/journey']);
      },
      error: (err) => {
        this.openFailureSnackBar();
      },
    });
}
}
