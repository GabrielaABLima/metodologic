import { Component } from '@angular/core';

export interface PeriodicElement {
  color: string;
  name: string;
  course: string;
  institution: string;
  deliveryDate: string;
  postDate: string;
  grade: number;
  maxGrade: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // {color: "#FCFA14", name: "Atividade - Produção de Introdução", institution: "IFSP", course: "Bacharelado em Ciência da Computação", deliveryDate: "20/04/2024", postDate: "19/06/2023", grade: 7, maxGrade: 10},
  // {color: "#FED812", name: 'Produção de Textos Científicos', institution: "IFSP", course: "Engenharia de Controle e Automação", deliveryDate: "30/08/2023", postDate: "25/08/2023", grade: 3, maxGrade: 5},
  // {color: "#FFBE0D", name: 'Metodologias de Pesquisa', institution: "Unifeob", course: "Workshop de Produção de textos", deliveryDate: "21/08/2023", postDate: "01/08/2023", grade: 9, maxGrade: 10},
  // {color: "#FD9D0C", name: 'Técnicas de Escritas Científicas', institution: "UNIFAE", course: "Palestra - textos acadêmicos", deliveryDate: "25/09/2023", postDate: "12/06/2023", grade: 2, maxGrade: 2 },

];

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.css']
})
export class HomeworksComponent {
  userRole = sessionStorage.getItem("role");
  titleEmpty = this.userRole === "aluno" ? "Nenhuma tarefa atribuída" : "Sem tarefas criadas";
  descriptionEmpty = this.userRole === "aluno" ? "Parece que você ainda não tem nenhuma tarefa atribuída de nenhuma turma que faz parte." : "Não há tarefas criadas para nenhuma turma no momento. Crie uma nova tarefa para começar a ensinar.";
  displayedColumns: string[] = ['name', 'institution', 'course', 'deliveryDate', 'postDate', 'grade', 'maxGrade'];
  dataSource = ELEMENT_DATA;

}
