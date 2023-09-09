/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.controller;

import com.metodologic.backend.controller.dto.TurmasAlunosCreateRequest;
import com.metodologic.backend.domain.Aluno;
import com.metodologic.backend.domain.Turma;
import com.metodologic.backend.domain.TurmasAlunos;
import com.metodologic.backend.repository.AlunoRepository;
import com.metodologic.backend.repository.TurmaRepository;
import com.metodologic.backend.repository.TurmasAlunosRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
@RequestMapping("turmas_alunos")
@Log4j2
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class TurmasAlunosController {
    private final TurmaRepository turmaRepository;
    private final TurmasAlunosRepository turmasAlunosRepository;
    private final AlunoRepository alunoRepository;

    @GetMapping
    public ResponseEntity<List<TurmasAlunos>> list(){
        return new ResponseEntity<>(turmasAlunosRepository.findAll(), HttpStatus.OK);
    }
    
    @GetMapping(path = "alunosByTurma/{id}")
    public ResponseEntity<List<Aluno>> findAlunosByTurma(@PathVariable long id) {
        List<TurmasAlunos> turmasAlunos = turmasAlunosRepository.findByTurmaId(id);
        List<Aluno> alunos = new ArrayList<>();
        for (TurmasAlunos turmaAluno : turmasAlunos) {
            Aluno aluno = turmaAluno.getAluno();
            
            alunos.add(aluno);
        }

        if (!alunos.isEmpty()) {
            return new ResponseEntity<>(alunos, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(path = "turmasByAluno/{id}")
    public ResponseEntity<List<Turma>> findTurmasByAluno(@PathVariable long id) {
        List<TurmasAlunos> turmasAlunos = turmasAlunosRepository.findByAlunoId(id);
        List<Turma> turmas = new ArrayList<>();
        for (TurmasAlunos turmaAluno : turmasAlunos) {
            Turma turma = turmaAluno.getTurma();
            
            turmas.add(turma);
        }

        if (!turmas.isEmpty()) {
            return new ResponseEntity<>(turmas, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(path = "/add")
    public ResponseEntity<TurmasAlunos> save(@RequestBody TurmasAlunosCreateRequest turmasAlunosCreateRequest){
        Optional<Aluno> optionalAluno = alunoRepository.findById(turmasAlunosCreateRequest.alunoId);
        Optional<Turma> optionalTurma = turmaRepository.findById(turmasAlunosCreateRequest.turmaId);
        if(optionalAluno.isPresent() && optionalTurma.isPresent()){
            Aluno aluno = optionalAluno.get();
            Turma turma = optionalTurma.get();
            TurmasAlunos newTurmasAlunos = new TurmasAlunos();
            newTurmasAlunos.setAluno(aluno);
            newTurmasAlunos.setTurma(turma);
            return new ResponseEntity<>(turmasAlunosRepository.save(newTurmasAlunos), HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    
    @DeleteMapping(path = "removerAlunoTurma/{alunoId}/{turmaId}")
    public ResponseEntity<Void> delete(@PathVariable long alunoId, @PathVariable long turmaId){
        Optional<TurmasAlunos> turmasAlunosOptional = turmasAlunosRepository.findOneTurmasAlunos(alunoId, turmaId);

        if (turmasAlunosOptional.isPresent()) {
            TurmasAlunos turmaAluno = turmasAlunosOptional.get();
            turmasAlunosRepository.delete(turmaAluno);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

   
}
