package com.metodologic.backend.controller;

import com.metodologic.backend.controller.dto.QuestaoRequestDTO;
import com.metodologic.backend.controller.dto.RegisterDTO;
import com.metodologic.backend.domain.Conteudo;
import com.metodologic.backend.domain.Questao;
import com.metodologic.backend.domain.Tarefa;
import com.metodologic.backend.domain.Usuario;
import com.metodologic.backend.repository.ConteudoRepository;
import com.metodologic.backend.repository.QuestaoRepository;
import com.metodologic.backend.repository.UsuarioRepository;
import jakarta.validation.Valid;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("questoes")
@Log4j2
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class QuestaoController {
    
    @Autowired
    QuestaoRepository questaoRepository;
    
    @Autowired
    ConteudoRepository conteudoRepository;
    
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody QuestaoRequestDTO[] data){
        for (QuestaoRequestDTO questaoDTO : data) {
            Questao questao = new Questao();
            if(questaoDTO.conteudoId != null){
                Optional<Conteudo> conteudo = conteudoRepository.findById(questaoDTO.conteudoId);
                if(conteudo.isPresent()){
                   questao.setConteudo(conteudo.get());
                }
            }

            questao.setCategoria(questaoDTO.categoria);
            questao.setNivel(questaoDTO.nivel);
            questao.setPontos(questaoDTO.pontos);
            questao.setTipo(questaoDTO.tipo);

            this.questaoRepository.save(questao);
        }
        
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/module/{nivel}")
    public ResponseEntity<List<Questao>> getByModule(@PathVariable int nivel){
        List<Questao> questoesSelecionadas = new ArrayList<>();
        List<Questao> questoesNivelAtual = questaoRepository.findByNivelOrderByRandom(nivel);
        int questoesNivelAtualSize = Math.min(5, questoesNivelAtual.size());
        questoesSelecionadas.addAll(questoesNivelAtual.subList(0, questoesNivelAtualSize));
        for (int i = 1; i <= nivel; i++) {
            List<Questao> questoesNivelAnterior = questaoRepository.findByNivelOrderByRandom(nivel - i);
            int questoesNivelAnteriorSize = Math.min(3, questoesNivelAnterior.size());
            questoesSelecionadas.addAll(questoesNivelAnterior.subList(0, questoesNivelAnteriorSize));
        }
        Collections.shuffle(questoesSelecionadas);
        return new ResponseEntity<>(questoesSelecionadas, HttpStatus.OK);
    }
    
    @GetMapping("")
    public ResponseEntity<List<Questao>> getAll(){
        List<Questao> questoes = questaoRepository.findAll();
        
        return new ResponseEntity<>(questoes, HttpStatus.OK);
    }
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<Questao> findById(@PathVariable long id){
        Optional<Questao> questaoOptional = questaoRepository.findById(id);

        if (questaoOptional.isPresent()) {
            Questao questao = questaoOptional.get();
            return new ResponseEntity<>(questao, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
