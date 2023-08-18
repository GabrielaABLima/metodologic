package br.com.metodologic.backend.repositorios;

import br.com.metodologic.backend.entidades.Jornada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "jornadas", path = "jornadas" )
public interface JornadaRepository extends JpaRepository<Jornada, Long> {
    
}