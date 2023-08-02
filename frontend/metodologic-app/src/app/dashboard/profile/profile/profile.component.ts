import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  description: string;
  points: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Conclusão do Nível Iniciante', description: "Concluir o nível inicial de desafios.", points: 50 },
  { name: 'Mestre das Palavras', description: "Construir um vocabulário de 100 palavras.", points: 75 },
  { name: 'Explorador Curioso', description: "Realizar 10 pesquisas no banco de dados do jogo.", points: 30 },
  { name: 'Completista', description: "Concluir todas as missões e desafios do jogo.", points: 200 },
  { name: 'Editor Exímio', description: "Criar um livro com mais de 500 palavras.", points: 100 },
  { name: 'Arqueólogo Aventureiro', description: "Descobrir 5 artefatos históricos no jogo.", points: 60 },
  { name: 'Desafiante Supremo', description: "Alcançar a maior pontuação em um desafio semanal.", points: 120 },

];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  editProfileClass = "tab";
  achievementsClass = "active tab";

  displayedColumns: string[] = ['name', 'description', 'points'];
  dataSource = ELEMENT_DATA;

  clickEdit() {
    this.editProfileClass = 'active tab';
    this.achievementsClass = 'tab';
  }
  clickAchievement() {
    this.editProfileClass = 'tab';
    this.achievementsClass = 'active tab';
  }


}
