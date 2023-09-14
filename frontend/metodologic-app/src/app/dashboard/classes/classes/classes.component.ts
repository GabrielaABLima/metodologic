import { ClassesStudentsService } from './../../../services/classes_students.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/dto/aluno/aluno.dto';
import { Professor } from 'src/app/dto/professor/professor.dto';
import { Turma } from 'src/app/dto/turma/turma.dto';
import { ModalComponent } from 'src/app/modal/modal.component';
import { ClassesService } from 'src/app/services/classes.service';
import { StudentsService } from 'src/app/services/students.service';


export default interface PeriodicElement {
  code: string;
  name: string;
  course: string;
  institution: string;
  participant: number;
  description: string;
  id: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {code: "ECC6", name: 'Escrita científica', institution: "IFSP", course: "Bacharelado em Ciência da Computação", participant: 25, description: "Disciplina que tem como foco o ensino da escrita necessária para produção de textos científicos", id: 1},
  {code: "PDTC7", name: 'Produção de Textos Científicos', institution: "IFSP", course: "Engenharia de Controle e Automação", participant: 33, description: "Disciplina que tem como foco o ensino da escrita necessária para produção de textos científicos", id: 2},
  {code: "MTDPC", name: 'Metodologias de Pesquisa', institution: "Unifeob", course: "Workshop de Produção de textos", participant: 21, description: "Disciplina que tem como foco o ensino da escrita necessária para produção de textos científicos", id: 3},
  {code: "TDEC", name: 'Técnicas de Escritas Científicas', institution: "UNIFAE", course: "Palestra - textos acadêmicos", participant: 25, description: "Disciplina que tem como foco o ensino da escrita necessária para produção de textos científicos", id: 4},

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

