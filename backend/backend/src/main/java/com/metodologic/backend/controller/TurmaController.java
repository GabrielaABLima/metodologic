/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.controller;

import com.metodologic.backend.controller.dto.TurmaCreateRequest;
import com.metodologic.backend.domain.Aluno;
import com.metodologic.backend.domain.Professor;
import com.metodologic.backend.domain.Turma;
import com.metodologic.backend.repository.AlunoRepository;
import com.metodologic.backend.repository.ProfessorRepository;
import com.metodologic.backend.repository.TurmaRepository;
import com.metodologic.backend.util.DateUtil;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("turmas")
@Log4j2
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class TurmaController {
    private final TurmaRepository turmaRepository;
    private final AlunoRepository alunoRepository;
    private final ProfessorRepository professorRepository;
    private DateUtil  dateUtil;

    @GetMapping
    public ResponseEntity<List<Turma>> list(){
        log.info(dateUtil.formatLocalDateTimeToDataBaseStyle(LocalDateTime.now()));
        return new ResponseEntity<>(turmaRepository.findAll(), HttpStatus.OK);
    }
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<Turma> findById(@PathVariable long id){
        log.info(dateUtil.formatLocalDateTimeToDataBaseStyle(LocalDateTime.now()));
        Optional<Turma> turmaOptional = turmaRepository.findById(id);

        if (turmaOptional.isPresent()) {
            Turma turma = turmaOptional.get();
            return new ResponseEntity<>(turma, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping(path = "/professor/{professorId}")
    public ResponseEntity<List<Turma>> findByProfessor(@PathVariable long professorId){
        List<Turma> turmas = turmaRepository.findByProfessorId(professorId);

        return new ResponseEntity<>(turmas, HttpStatus.OK);
    }
    
    @PostMapping(path = "/add")
    public ResponseEntity<Turma> save(@RequestBody TurmaCreateRequest request){
        Optional<Professor> optional = professorRepository.findById(request.professorId);
        if(optional.isPresent()){
            Professor professor = optional.get();
            Turma turma = new Turma();
            turma.setProfessor(professor);
            turma.setCodigo(request.codigo);
            turma.setNome(request.nome);
            turma.setCurso(request.curso);
            turma.setInstituicaoEnsino(request.instituicaoEnsino);
            turma.setDescricao(request.descricao);
            return new ResponseEntity<>(turmaRepository.save(turma), HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        Optional<Turma> turmaOptional = turmaRepository.findById(id);

        if (turmaOptional.isPresent()) {
            Turma turma = turmaOptional.get();
            turmaRepository.delete(turma);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            // Handle the case where the resource is not found, e.g., return a 404 response.
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody Turma turma){
        turmaRepository.save(turma);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
