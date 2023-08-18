package br.com.metodologic.backend.repositorios;

import br.com.metodologic.backend.entidades.Questao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "questoes", path = "questoes" )
public interface QuestaoRepository extends JpaRepository<Questao, Long> {
    
}