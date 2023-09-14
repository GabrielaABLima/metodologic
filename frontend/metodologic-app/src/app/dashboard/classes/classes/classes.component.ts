import { ClassesStudentsService } from './../../../services/classes_students.service';
import { Component, ElementRef, SimpleChanges, ViewChild, OnChanges } from '@angular/core';
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
}

const ELEMENT_DATA: PeriodicElement[] = [
  {code: "ECC6", name: 'Escrita científica', institution: "IFSP", course: "Bacharelado em Ciência da Computação", participant: 25, description: "Disciplina que tem como foco o ensino da escrita necessária para produção de textos científicos"},
  {code: "PDTC7", name: 'Produção de Textos Científicos', institution: "IFSP", course: "Engenharia de Controle e Automação", participant: 33, description: "Disciplina que tem como foco o ensino da escrita necessária para produção de textos científicos",},
  {code: "MTDPC", name: 'Metodologias de Pesquisa', institution: "Unifeob", course: "Workshop de Produção de textos", participant: 21, description: "Disciplina que tem como foco o ensino da escrita necessária para produção de textos científicos"},
  {code: "TDEC", name: 'Técnicas de Escritas Científicas', institution: "UNIFAE", course: "Palestra - textos acadêmicos", participant: 25, description: "Disciplina que tem como foco o ensino da escrita necessária para produção de textos científicos"},

];

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnChanges{
  displayedColumns: string[] = ['code', 'name', 'institution', 'course', 'participant', 'description'];
  dataSource = ELEMENT_DATA;
  classes: Turma[] = [];
  resultados: Turma[] = [];
  termoDePesquisa = '';
  professor = new Professor(
    "Gabi",
    "gabi@gmail.com",
    "senha",
    new Date(2020, 10, 25),
    "BCC",
    "IFSP",
    0,
    0,
    1
  );
  constructor(
    private classesService: ClassesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    if(this.professor.id){
      this.classesService.getClassesByProfessor(this.professor.id).subscribe({
        next: (response) => {
          response.map((turma) => {
            this.classes.push(turma);
          })
          this.resultados = this.classes;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['termoDePesquisa']) {
      this.pesquisar();
    }
  }
  pesquisar() {
    if(this.termoDePesquisa === ''){
      this.resultados = this.classes;
    }
    this.resultados = this.classes.filter(objeto => {
      const lowercaseTermo = this.termoDePesquisa.toLowerCase();

      return objeto.nome.toLowerCase().includes(lowercaseTermo) ||
        (objeto.descricao && objeto.descricao.toLowerCase().includes(lowercaseTermo)) ||
        objeto.codigo.toLowerCase().includes(lowercaseTermo) ||
        objeto.instituicaoEnsino.toLowerCase().includes(lowercaseTermo);
    });
  }


}

