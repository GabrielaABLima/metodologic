import { StudentsHomeworksService } from 'src/app/services/students_homeworks.service';
import { Component, Input, SimpleChanges } from '@angular/core';
import { AlunoTarefa, AlunoTarefaResponse } from 'src/app/dto/tarefa/tarefa.dto';

@Component({
  selector: 'app-modal-grades-homework',
  templateUrl: './modal-grades-homework.component.html',
  styleUrls: ['./modal-grades-homework.component.css']
})
export class ModalGradesHomeworkComponent {
  @Input() tarefaId?: string;
  alunosTarefa: AlunoTarefaResponse[] = [];

  constructor(
    private studentsHomeworksService: StudentsHomeworksService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tarefaId'] && !changes['tarefaId'].firstChange) {
      const novoValor = changes['tarefaId'].currentValue;

      if(this.tarefaId){
        if(this.tarefaId){
          this.studentsHomeworksService.getStudentsByHomework(+this.tarefaId).subscribe({
            next: (response) => {
              console.log(response);
                this.alunosTarefa = response;

            },
            error: (err) => {
              console.log(err);
            }
          })
        }
      }
    }
  }
  ngOnInit(): void{
    if(this.tarefaId){
      this.studentsHomeworksService.getStudentsByHomework(+this.tarefaId).subscribe({
        next: (response) => {
          response.map((alunoTarefa) => {
            this.alunosTarefa.push(alunoTarefa);
          })
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
