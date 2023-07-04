package br.com.metodologic.backend.repositorios;

import br.com.metodologic.backend.entidades.Interfaces.PatrocinadorCount;
import br.com.metodologic.backend.entidades.Patrocinador;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "patrocinadores", path = "patrocinadores" )
public interface PatrocinadorRepository extends JpaRepository<Patrocinador, Long> {
    
    @Query("SELECT COUNT(p) as pfCount, (SELECT COUNT(p2) FROM Patrocinador p2 WHERE p2.pessoa_fisica = false) as pjCount FROM Patrocinador p WHERE p.pessoa_fisica = true")
    PatrocinadorCount getPFandPJCount();
  
    Page<Patrocinador> findById( @Param( "id" ) Long id, Pageable pageable );
    Page<Patrocinador> findByNomeContaining( @Param( "nome" ) String nome, Pageable pageable );
    Page<Patrocinador> findByEmailContaining( @Param( "email" ) String email, Pageable pageable );
    
}
