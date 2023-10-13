/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.controller;

import com.metodologic.backend.controller.dto.TurmaCreateRequest;
import com.metodologic.backend.domain.Turma;
import com.metodologic.backend.domain.TurmasAlunos;
import com.metodologic.backend.domain.Usuario;
import com.metodologic.backend.repository.TurmaRepository;
import com.metodologic.backend.repository.TurmasAlunosRepository;
import com.metodologic.backend.repository.UsuarioRepository;
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
    
    @Autowired
    UsuarioRepository usuarioRepository;
    
    @Autowired
    TurmasAlunosRepository turmasAlunosRepository;

    @GetMapping
    public ResponseEntity<List<Turma>> list(){
        return new ResponseEntity<>(turmaRepository.findAll(), HttpStatus.OK);
    }
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<Turma> findById(@PathVariable long id){
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
        Optional<Usuario> optional = usuarioRepository.findById(request.professorId);
        if(optional.isPresent()){
            Usuario usuario = optional.get();
            Turma turma = new Turma();
            turma.setProfessor(usuario);
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
    
    
    @DeleteMapping(path = "/{cod}")
    public ResponseEntity<Void> deleteByCod(@PathVariable String cod){
        Optional<Turma> turmaOptional = turmaRepository.findByCodigo(cod);

        if (turmaOptional.isPresent()) {
            Turma turma = turmaOptional.get();
            List<TurmasAlunos> turmasAlunos = turmasAlunosRepository.findByTurmaCodigo(cod);

            for (TurmasAlunos turmaAluno : turmasAlunos) {
                turmasAlunosRepository.delete(turmaAluno);
            } 
            turmaRepository.delete(turma);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody Turma turma){
        turmaRepository.save(turma);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<Turma> findByCodigo(@PathVariable String codigo){
        Optional<Turma> turmaOptional = turmaRepository.findByCodigo(codigo);
        if (turmaOptional.isPresent()) {
            Turma turma = turmaOptional.get();
            return new ResponseEntity<>(turma, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
