/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package br.com.metodologic.backend.repositorios;

import br.com.metodologic.backend.entidades.Interfaces.ProdutoCount;
import br.com.metodologic.backend.entidades.Produtos;
import br.com.metodologic.backend.entidades.projections.FornecedorProduto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 *
 * @author viniv
 */

@RepositoryRestResource( excerptProjection = FornecedorProduto.class ,collectionResourceRel = "produtos", path = "produtos" )
public interface ProdutosRepository extends JpaRepository<Produtos, Long>  {
    
    @Query("SELECT COUNT(p) as exclusivosCount, (SELECT COUNT(p2) FROM Produtos p2 WHERE p2.excluido = true) as desativadosCount FROM Produtos p WHERE p.exclusividade = true")
    ProdutoCount getExclusiveAndDeactivatedCount();
    Page<Produtos> findById( @Param( "id" ) Long id, Pageable pageable );
    Page<Produtos> findByNomeContaining( @Param( "nome" ) String nome, Pageable pageable );
    
}
