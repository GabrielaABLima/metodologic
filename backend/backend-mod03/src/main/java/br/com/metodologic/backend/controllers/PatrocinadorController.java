package br.com.metodologic.backend.controllers;

import br.com.metodologic.backend.entidades.Interfaces.PatrocinadorCount;
import br.com.metodologic.backend.repositorios.PatrocinadorRepository;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author bruno
 */

@RestController
@RequestMapping("api/patrocinadores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PatrocinadorController {
    
    private final PatrocinadorRepository PatrocinadorRepository;
    
    @GetMapping("metricas")
    public ResponseEntity< Map<String, Long>> getActiveCount(){
        PatrocinadorCount count = PatrocinadorRepository.getPFandPJCount();
        long pessoaFisica = count.getPfCount();
        long pessoaJuridica = count.getPjCount();

        Map<String, Long> metricas = new HashMap<>();
        metricas.put("pessoaFisica", pessoaFisica);
        metricas.put("pessoaJuridica", pessoaJuridica);
        
        return new ResponseEntity( metricas, HttpStatus.OK);
    }
    
 
}
