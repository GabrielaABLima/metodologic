
package br.com.metodologic.backend.controllers;

import br.com.metodologic.backend.entidades.Interfaces.FornecedorCount;
import br.com.metodologic.backend.repositorios.FornecedorRepository;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.function.EntityResponse;

/**
 *
 * @author mateus
 */

@RestController
@RequestMapping("api/fornecedores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FornecedorController {
    
    private final FornecedorRepository FornecedorRepository;
    
    @GetMapping("metricas")
    public ResponseEntity< Map<String, Long>> getActiveCount(){
        FornecedorCount count = FornecedorRepository.getActiveAndDisabledCount();
        long ativos = count.getAtivosCount();
        long desativados = count.getInativosCount();

        Map<String, Long> metricas = new HashMap<>();
        metricas.put("activeCount", ativos);
        metricas.put("disabledCount", desativados);
        
        return new ResponseEntity( metricas, HttpStatus.OK);
    }
    
 
}
