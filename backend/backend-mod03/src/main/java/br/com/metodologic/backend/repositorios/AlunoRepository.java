package br.com.metodologic.backend.repositorios;

import br.com.metodologic.backend.entidades.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "alunos", path = "alunos" )
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    
}
