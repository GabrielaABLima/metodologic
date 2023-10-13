/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.controller;

import com.metodologic.backend.controller.dto.TarefaCreateRequest;
import com.metodologic.backend.controller.dto.TurmaCreateRequest;
import com.metodologic.backend.domain.Tarefa;
import com.metodologic.backend.domain.Turma;
import com.metodologic.backend.domain.TurmasAlunos;
import com.metodologic.backend.domain.Usuario;
import com.metodologic.backend.repository.TarefaRepository;
import com.metodologic.backend.repository.TurmaRepository;
import com.metodologic.backend.repository.TurmasAlunosRepository;
import com.metodologic.backend.repository.UsuarioRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tarefas")
@Log4j2
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class TarefaController {
    
    @Autowired
    TarefaRepository tarefaRepository;
    
    @Autowired
    TurmaRepository turmaRepository;
    
    @Autowired
    TurmasAlunosRepository turmasAlunosRepository;
    
    @GetMapping(path = "/alunos/{alunoId}")
    public ResponseEntity<List<Tarefa>> findByAluno(@PathVariable long alunoId){
        List<TurmasAlunos> turmasAlunos = turmasAlunosRepository.findByAlunoId(alunoId);
        List<String> turmasCod = new ArrayList<>();
        for (TurmasAlunos turmaAluno : turmasAlunos) {
            Turma turma = turmaAluno.getTurma();
            
            turmasCod.add(turma.getCodigo());
        }

        if (!turmasCod.isEmpty()) {
            List<Tarefa> tarefas = tarefaRepository.findByTurmaCodigoIn(turmasCod);
            return new ResponseEntity<>(tarefas, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping(path = "/professor/{professorId}")
    public ResponseEntity<List<Tarefa>> findByProfessor(@PathVariable long professorId){
        List<Turma> turmas = turmaRepository.findByProfessorId(professorId);
        List<String> turmasCod = new ArrayList<>();
        for (Turma turma : turmas) {
            turmasCod.add(turma.getCodigo());
        }

        if (!turmasCod.isEmpty()) {
            List<Tarefa> tarefas = tarefaRepository.findByTurmaCodigoIn(turmasCod);
            return new ResponseEntity<>(tarefas, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(path = "/add")
    public ResponseEntity<Tarefa> save(@RequestBody TarefaCreateRequest request){
        Optional<Turma> optional = turmaRepository.findByCodigo(request.codigo);
        if(optional.isPresent()){
            Turma turma = optional.get();
            Tarefa tarefa = new Tarefa();
            tarefa.setDataAtribuicao(request.dataAtribuicao);
            tarefa.setDataEntrega(request.dataEntrega);
            tarefa.setNome(request.nome);
            tarefa.setTurma(turma);
            return new ResponseEntity<>(tarefaRepository.save(tarefa), HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        Optional<Tarefa> tarefaOptional = tarefaRepository.findById(id);

        if (tarefaOptional.isPresent()) {
            Tarefa tarefa = tarefaOptional.get();
            tarefaRepository.delete(tarefa);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
