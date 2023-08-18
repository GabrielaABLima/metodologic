
package br.com.metodologic.backend.controllers;
import br.com.metodologic.backend.repositorios.JornadaRepository;
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

@RestController
@RequestMapping("api/jornadas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class JornadaController {
    
    private final JornadaRepository JornadaRepository;
    
    
 
}
