package br.com.metodologic.backend.controllers;

import br.com.metodologic.backend.entidades.Interfaces.ProdutoCount;
import br.com.metodologic.backend.repositorios.ProdutosRepository;
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
@RequestMapping("api/produtos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProdutoController {
    
    private final ProdutosRepository ProdutoRepository;
    
    @GetMapping("metricas")
    public ResponseEntity< Map<String, Long>> getActiveCount(){
        ProdutoCount count = ProdutoRepository.getExclusiveAndDeactivatedCount();
        long desativados = count.getDesativadosCount();
        long exclusivos = count.getExclusivosCount();

        Map<String, Long> metricas = new HashMap<>();
        metricas.put("desativados", desativados);
        metricas.put("exclusivos", exclusivos);
        
        return new ResponseEntity( metricas, HttpStatus.OK);
    }
    
}
