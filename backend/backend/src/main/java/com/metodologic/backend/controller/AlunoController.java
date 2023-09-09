
package com.metodologic.backend.controller;

import com.metodologic.backend.domain.Aluno;
import com.metodologic.backend.repository.AlunoRepository;
import com.metodologic.backend.service.AlunoService;
import com.metodologic.backend.util.DateUtil;
import java.net.http.HttpRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
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
@RequestMapping("alunos")
@Log4j2
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AlunoController {
    private final AlunoRepository alunoRepository;
    private DateUtil  dateUtil;
    private final AlunoService animeService;
    @GetMapping
    public ResponseEntity<List<Aluno>> list(){
        log.info(dateUtil.formatLocalDateTimeToDataBaseStyle(LocalDateTime.now()));
        return new ResponseEntity<>(alunoRepository.findAll(), HttpStatus.OK);
    }
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<Aluno> findById(@PathVariable long id){
        log.info(dateUtil.formatLocalDateTimeToDataBaseStyle(LocalDateTime.now()));
        Optional<Aluno> alunoOptional = alunoRepository.findById(id);

        if (alunoOptional.isPresent()) {
            Aluno aluno = alunoOptional.get();
            return new ResponseEntity<>(aluno, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(path = "/add")
    public ResponseEntity<Aluno> save(@RequestBody Aluno aluno){
        return new ResponseEntity<>(alunoRepository.save(aluno), HttpStatus.CREATED);
    }
    
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        Optional<Aluno> alunoOptional = alunoRepository.findById(id);

        if (alunoOptional.isPresent()) {
            Aluno aluno = alunoOptional.get();
            alunoRepository.delete(aluno);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            // Handle the case where the resource is not found, e.g., return a 404 response.
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody Aluno aluno){
        alunoRepository.save(aluno);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
