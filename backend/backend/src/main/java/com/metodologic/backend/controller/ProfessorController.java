/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.controller;

import com.metodologic.backend.domain.Aluno;
import com.metodologic.backend.domain.Professor;
import com.metodologic.backend.repository.AlunoRepository;
import com.metodologic.backend.repository.ProfessorRepository;
import com.metodologic.backend.service.AlunoService;
import com.metodologic.backend.util.DateUtil;
import java.time.LocalDateTime;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("professores")
@Log4j2
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ProfessorController {
    private final ProfessorRepository professorRepository;
    private DateUtil  dateUtil;

    @GetMapping
    public ResponseEntity<List<Professor>> list(){
        log.info(dateUtil.formatLocalDateTimeToDataBaseStyle(LocalDateTime.now()));
        return new ResponseEntity<>(professorRepository.findAll(), HttpStatus.OK);
    }
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<Professor> findById(@PathVariable long id){
        log.info(dateUtil.formatLocalDateTimeToDataBaseStyle(LocalDateTime.now()));
        Optional<Professor> professorOptional = professorRepository.findById(id);

        if (professorOptional.isPresent()) {
            Professor professor = professorOptional.get();
            return new ResponseEntity<>(professor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(path = "/add")
    public ResponseEntity<Professor> save(@RequestBody Professor professor){
        return new ResponseEntity<>(professorRepository.save(professor), HttpStatus.CREATED);
    }
    
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        Optional<Professor> professorOptional = professorRepository.findById(id);

        if (professorOptional.isPresent()) {
            Professor professor = professorOptional.get();
            professorRepository.delete(professor);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            // Handle the case where the resource is not found, e.g., return a 404 response.
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody Professor professor){
        professorRepository.save(professor);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
