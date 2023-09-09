
package br.com.metodologic.backend.controllers;
import br.com.metodologic.backend.entidades.Aluno;
import br.com.metodologic.backend.repositorios.AlunoRepository;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.function.EntityResponse;

@RestController
@RequestMapping("api/alunos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AlunoController {
    
    private final AlunoRepository AlunoRepository;
    
    @PostMapping("/add")
        public Aluno save(@RequestBody Aluno aluno){
        
       
       Aluno newAluno = new Aluno();
       
       
       newAluno.setEmail(aluno.getEmail());
       newAluno.setSenha(aluno.getSenha());
       newAluno.setNome(aluno.getNome());
       newAluno.setPontos(0);
       newAluno.setNivel(0);
       
       return AlunoRepository.save(newAluno);
    }
      
 
}
