import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'metodologic-app';
  userName!: string | null ;
  userEmail!: string | null ;
  userProfilePicture!: string | null ;
  isLogged = true;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UsersService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit(){
    this.checkUserLogged();
  }

  checkUserLogged(){
    const userId = sessionStorage.getItem("id");
    if(userId){
      this.userService.getById(+userId).subscribe({
        next: (response) => {
          this.userEmail = response.email;
          this.userName = response.nome.split(' ')[0];
          const nome = response.nome.split(' ');
          console.log(nome);
          if(nome.length >= 2){
            this.userProfilePicture = nome[0][0] + nome[nome.length - 1][0];
          }else{
            this.userProfilePicture = nome[0][0];
          }
          this.isLogged = true;

        },
        error: (err) => {
          console.log(err);
          this.userEmail = "";
          this.userName = "";
          this.userProfilePicture = "";
          this.isLogged = false;
          this.router.navigate(['/login']);


        }
      })
    }else{
      this.userEmail = "";
      this.userName = "";
      this.userProfilePicture = "";
      this.isLogged = false;

    }

    if(this.isLogged){
      setTimeout(() => {
        this.checkUserLogged();
      }, 6000000);
    }else{
      setTimeout(() => {
        this.checkUserLogged();
      }, 20000);
    }
  }


  openSuccessSnackBar(){
    this.snackBar.open("Logout realizado!", "OK", {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: 'green-snackbar',
     });
  }

  logout(){
    this.userEmail = "";
    this.userName = "";
    this.userProfilePicture = "";
    this.isLogged = false;
    this.authService.logout();
    this.router.navigate(['/login']);
    this.openSuccessSnackBar();
  }
}
