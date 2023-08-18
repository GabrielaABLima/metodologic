package br.com.metodologic.backend.repositorios;

import br.com.metodologic.backend.entidades.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "professores", path = "professores" )
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    
}