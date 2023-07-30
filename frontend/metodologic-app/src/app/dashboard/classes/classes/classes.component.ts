import { Component } from '@angular/core';

export interface PeriodicElement {
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

}
