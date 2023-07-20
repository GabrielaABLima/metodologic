/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package br.com.metodologic.backend.repositorios;

import br.com.metodologic.backend.entidades.Conteudo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource( collectionResourceRel = "fornecedores", path = "fornecedores" )
public interface ConteudoRepository extends JpaRepository<Conteudo, Long> {
    
}
