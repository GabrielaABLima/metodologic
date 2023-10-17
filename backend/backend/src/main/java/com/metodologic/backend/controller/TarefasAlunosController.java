package com.metodologic.backend.controller;

import com.metodologic.backend.controller.dto.TarefasAlunosCreateRequest;
import com.metodologic.backend.domain.Usuario;
import com.metodologic.backend.domain.Tarefa;
import com.metodologic.backend.domain.TarefasAlunos;
import com.metodologic.backend.repository.UsuarioRepository;
import com.metodologic.backend.repository.TarefaRepository;
import com.metodologic.backend.repository.TarefasAlunosRepository;
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
@RequestMapping("tarefas_alunos")
@Log4j2
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class TarefasAlunosController {

    private final TarefaRepository tarefaRepository;
    private final UsuarioRepository usuarioRepository;
    private final TarefasAlunosRepository tarefasAlunosRepository;

    @GetMapping
    public ResponseEntity<List<TarefasAlunos>> list(){
        return new ResponseEntity<>(tarefasAlunosRepository.findAll(), HttpStatus.OK);
    }
   

    @GetMapping(path = "/alunos/{tarefaId}")
    public ResponseEntity<List<Usuario>> findAlunosByTarefa(@PathVariable long tarefaId) {
        List<TarefasAlunos> tarefasAlunos = tarefasAlunosRepository.findByTarefaId(tarefaId);
        List<Usuario> alunos = new ArrayList<>();
        for (TarefasAlunos tarefasAlunosToAdd : tarefasAlunos) {
            Usuario aluno = tarefasAlunosToAdd.getAluno();
            
            alunos.add(aluno);
        }

        if (!alunos.isEmpty()) {
            return new ResponseEntity<>(alunos, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(path = "/add")
    public ResponseEntity<TarefasAlunos> save(@RequestBody TarefasAlunosCreateRequest tarefasAlunosCreateRequest){
        Optional<Usuario> optionalAluno = usuarioRepository.findById(tarefasAlunosCreateRequest.alunoId);
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(tarefasAlunosCreateRequest.tarefaId);
        if(optionalAluno.isPresent() && optionalTarefa.isPresent()){
            Usuario aluno = optionalAluno.get();
            Tarefa tarefa = optionalTarefa.get();
            TarefasAlunos newTarefasAlunos = new TarefasAlunos();
            newTarefasAlunos.setAluno(aluno);
            newTarefasAlunos.setTarefa(tarefa);
            newTarefasAlunos.setNota(tarefasAlunosCreateRequest.nota);
            tarefasAlunosRepository.save(newTarefasAlunos);
            return new ResponseEntity<>(newTarefasAlunos, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    
    @DeleteMapping(path = "/{tarefaId}/{alunoId}")
    public ResponseEntity<TarefasAlunos> delete(@PathVariable long tarefaId, @PathVariable long alunoId){
        Optional<TarefasAlunos> alunoTarefaOptional = tarefasAlunosRepository.findByTarefaIdAndAlunoId(tarefaId, alunoId);

        if (alunoTarefaOptional.isPresent()) {
            TarefasAlunos alunoTarefa = alunoTarefaOptional.get();
            tarefasAlunosRepository.delete(alunoTarefa);
            return new ResponseEntity<>(alunoTarefa, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping(path = "/{tarefaId}")
    public ResponseEntity<Void> deleteByTarefaId(@PathVariable long tarefaId){
        List<TarefasAlunos> tarefasAlunos = tarefasAlunosRepository.findByTarefaId(tarefaId);

        for (TarefasAlunos alunoTarefa : tarefasAlunos) {
            tarefasAlunosRepository.delete(alunoTarefa);
        } 
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

   
}
