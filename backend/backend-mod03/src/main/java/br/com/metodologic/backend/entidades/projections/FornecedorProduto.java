/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.metodologic.backend.entidades.projections;

import br.com.metodologic.backend.entidades.Fornecedor;
import br.com.metodologic.backend.entidades.Produtos;
import org.springframework.data.rest.core.config.Projection;

/**
 *
 * @author viniv
 */

@Projection (name = "fornecedorProduto", types = { Produtos.class } )
public interface FornecedorProduto {
    
    Long getId();
    String getNome();
    String getDescricao();
    Integer getQuantidade();
    String getStatus();
    Boolean getExclusividade();
    Boolean getExcluido();
    Fornecedor getFornecedor();
    
}
