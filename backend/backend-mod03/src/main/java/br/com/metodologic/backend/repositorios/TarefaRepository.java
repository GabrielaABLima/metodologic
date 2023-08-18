package br.com.metodologic.backend.repositorios;

import br.com.metodologic.backend.entidades.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "tarefas", path = "tarefas" )
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    
}