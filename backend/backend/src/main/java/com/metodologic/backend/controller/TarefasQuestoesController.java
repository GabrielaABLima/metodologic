package com.metodologic.backend.controller;

import com.metodologic.backend.controller.dto.TarefasQuestoesCreateRequest;
import com.metodologic.backend.domain.Questao;
import com.metodologic.backend.domain.Tarefa;
import com.metodologic.backend.domain.TarefasQuestoes;
import com.metodologic.backend.repository.QuestaoRepository;
import com.metodologic.backend.repository.TarefaRepository;
import com.metodologic.backend.repository.TarefasQuestoesRepository;
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
@RequestMapping("tarefas_questoes")
@Log4j2
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class TarefasQuestoesController {

    private final TarefaRepository tarefaRepository;
    private final QuestaoRepository questaoRepository;
    private final TarefasQuestoesRepository tarefasQuestoesRepository;

    @GetMapping
    public ResponseEntity<List<TarefasQuestoes>> list(){
        return new ResponseEntity<>(tarefasQuestoesRepository.findAll(), HttpStatus.OK);
    }
   

    @GetMapping(path = "/{tarefaId}")
    public ResponseEntity<List<Questao>> findQuestoesByTarefa(@PathVariable long tarefaId) {
        List<TarefasQuestoes> tarefasQuestoes = tarefasQuestoesRepository.findByTarefaId(tarefaId);
        List<Questao> questoes = new ArrayList<>();
        for (TarefasQuestoes tarefasQuestoesToAdd : tarefasQuestoes) {
            Questao questao = tarefasQuestoesToAdd.getQuestao();
            
            questoes.add(questao);
        }

        if (!questoes.isEmpty()) {
            return new ResponseEntity<>(questoes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(path = "/add")
    public ResponseEntity<Questao> save(@RequestBody TarefasQuestoesCreateRequest tarefasQuestoesCreateRequest){
        Optional<Questao> optionalQuestao = questaoRepository.findById(tarefasQuestoesCreateRequest.questaoId);
        Optional<Tarefa> optionalTarefa = tarefaRepository.findById(tarefasQuestoesCreateRequest.tarefaId);
        if(optionalQuestao.isPresent() && optionalTarefa.isPresent()){
            Questao questao = optionalQuestao.get();
            Tarefa tarefa = optionalTarefa.get();
            TarefasQuestoes newTarefasQuestoes = new TarefasQuestoes();
            newTarefasQuestoes.setQuestao(questao);
            newTarefasQuestoes.setTarefa(tarefa);
            tarefasQuestoesRepository.save(newTarefasQuestoes);
            return new ResponseEntity<>(questao, HttpStatus.CREATED);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    
    @DeleteMapping(path = "/{tarefaId}/{questaoId}")
    public ResponseEntity<Questao> delete(@PathVariable long tarefaId, @PathVariable long questaoId){
        Optional<TarefasQuestoes> questaoTarefaOptional = tarefasQuestoesRepository.findByTarefaIdAndQuestaoId(tarefaId, questaoId);

        if (questaoTarefaOptional.isPresent()) {
            TarefasQuestoes questaoTarefa = questaoTarefaOptional.get();
            Questao questao = questaoTarefa.getQuestao();
            tarefasQuestoesRepository.delete(questaoTarefa);
            return new ResponseEntity<>(questao, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping(path = "/{tarefaId}")
    public ResponseEntity<Void> deleteByTarefaId(@PathVariable long tarefaId){
        List<TarefasQuestoes> tarefasQuestoes = tarefasQuestoesRepository.findByTarefaId(tarefaId);

        for (TarefasQuestoes questaoTarefa : tarefasQuestoes) {
            tarefasQuestoesRepository.delete(questaoTarefa);
        } 
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

   
}
