package com.metodologic.backend.controller;

import com.metodologic.backend.domain.Conteudo;
import com.metodologic.backend.domain.Questao;
import com.metodologic.backend.repository.ConteudoRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("conteudos")
@Log4j2
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ConteudoController {
    
    @Autowired
    ConteudoRepository conteudoRepository;
    
    @GetMapping("/except/{id}")
    public ResponseEntity<List<Conteudo>> getByModule(@PathVariable long id){
        List<Conteudo> conteudos = conteudoRepository.getRandomConteudoExcludingId(id);
        
        return new ResponseEntity<>(conteudos, HttpStatus.OK);
    }
}
