package br.com.metodologic.backend.repositorios;

import br.com.metodologic.backend.entidades.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "turmas", path = "turmas" )
public interface TurmaRepository extends JpaRepository<Turma, Long> {
    
}