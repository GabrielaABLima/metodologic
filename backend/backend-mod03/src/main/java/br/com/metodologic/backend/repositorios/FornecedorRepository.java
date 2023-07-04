package br.com.metodologic.backend.repositorios;

import br.com.metodologic.backend.entidades.Fornecedor;
import br.com.metodologic.backend.entidades.Interfaces.FornecedorCount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "fornecedores", path = "fornecedores" )
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {
    
    @Query("SELECT COUNT(f) as ativosCount, (SELECT COUNT(f2) FROM Fornecedor f2 WHERE f2.ativo = false) as inativosCount FROM Fornecedor f WHERE f.ativo = true")
    FornecedorCount getActiveAndDisabledCount();
    Page<Fornecedor> findById( @Param( "id" ) Long id, Pageable pageable );
    Page<Fornecedor> findByNomeContaining( @Param( "nome" ) String nome, Pageable pageable );
    
}

