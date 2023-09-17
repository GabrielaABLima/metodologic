package com.metodologic.backend.controller;

import com.metodologic.backend.controller.dto.QuestaoRequestDTO;
import com.metodologic.backend.controller.dto.RegisterDTO;
import com.metodologic.backend.domain.Conteudo;
import com.metodologic.backend.domain.Questao;
import com.metodologic.backend.domain.Usuario;
import com.metodologic.backend.repository.ConteudoRepository;
import com.metodologic.backend.repository.QuestaoRepository;
import com.metodologic.backend.repository.UsuarioRepository;
import jakarta.validation.Valid;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
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
}
