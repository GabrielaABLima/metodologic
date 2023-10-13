package com.metodologic.backend.controller;

import com.metodologic.backend.controller.dto.TurmasAlunosCreateRequest;
import com.metodologic.backend.domain.Turma;
import com.metodologic.backend.domain.TurmasAlunos;
import com.metodologic.backend.domain.Usuario;
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
@RequestMapping("turmas_alunos")
@Log4j2
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class TurmasAlunosController {
    
    @Autowired
    UsuarioRepository usuarioRepository;
    private final TurmaRepository turmaRepository;
    private final TurmasAlunosRepository turmasAlunosRepository;

    @GetMapping
    public ResponseEntity<List<TurmasAlunos>> list(){
        return new ResponseEntity<>(turmasAlunosRepository.findAll(), HttpStatus.OK);
    }
    
    @GetMapping(path = "/alunosByTurma/{turmaCod}")
    public ResponseEntity<List<Usuario>> findAlunosByTurma(@PathVariable String turmaCod) {
        List<TurmasAlunos> turmasAlunos = turmasAlunosRepository.findByTurmaCodigo(turmaCod);
        List<Usuario> alunos = new ArrayList<>();
        for (TurmasAlunos turmaAluno : turmasAlunos) {
            Usuario aluno = turmaAluno.getAluno();
            
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
        Optional<Usuario> optionalAluno = usuarioRepository.findById(turmasAlunosCreateRequest.alunoId);
        Optional<Turma> optionalTurma = turmaRepository.findByCodigo(turmasAlunosCreateRequest.turmaCod);
        if(optionalAluno.isPresent() && optionalTurma.isPresent()){
            Usuario aluno = optionalAluno.get();
            Turma turma = optionalTurma.get();
            TurmasAlunos newTurmasAlunos = new TurmasAlunos();
            newTurmasAlunos.setAluno(aluno);
            newTurmasAlunos.setTurma(turma);
            return new ResponseEntity<>(turmasAlunosRepository.save(newTurmasAlunos), HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    
    @DeleteMapping(path = "/removerAlunoTurma/{alunoId}/{turmaId}")
    public ResponseEntity<Void> delete(@PathVariable long alunoId, @PathVariable String turmaId){
        Optional<TurmasAlunos> turmasAlunosOptional = turmasAlunosRepository.findByAlunoIdAndTurmaCodigo(alunoId, turmaId);

        if (turmasAlunosOptional.isPresent()) {
            TurmasAlunos turmaAluno = turmasAlunosOptional.get();
            turmasAlunosRepository.delete(turmaAluno);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping(path = "/{turmaCod}")
    public ResponseEntity<Void> deleteByTurmaCod(@PathVariable String turmaCod){
        List<TurmasAlunos> turmasAlunos = turmasAlunosRepository.findByTurmaCodigo(turmaCod);

        for (TurmasAlunos turmaAluno : turmasAlunos) {
            turmasAlunosRepository.delete(turmaAluno);
        } 
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

   
}
