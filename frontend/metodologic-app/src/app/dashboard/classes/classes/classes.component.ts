import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  participant: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Escrita científica - IFSP', participant: 25, symbol: 'H'},
  {name: 'Metodologias de pesquisa - UNESP', participant: 12, symbol: 'He'},
  {name: 'Produção de Textos Científicos - UNIFAE', participant: 23, symbol: 'Li'},
  {name: 'PROFEPT - IFSP', participant: 18, symbol: 'Be'},
  {name: 'Escrita Científica - Unifeob', participant: 37, symbol: 'B'},

];

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {
  displayedColumns: string[] = ['name', 'participant', 'symbol'];
  dataSource = ELEMENT_DATA;

}
