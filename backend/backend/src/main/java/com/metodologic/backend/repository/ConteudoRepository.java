/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.metodologic.backend.repository;

import com.metodologic.backend.domain.Conteudo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ConteudoRepository extends JpaRepository<Conteudo, Long>{
    @Query(value = "SELECT * FROM conteudos WHERE cnt_id <> :id ORDER BY RAND() LIMIT 4", nativeQuery = true)
    List<Conteudo> getRandomConteudoExcludingId(@Param("id") Long id);
    
    @Query(value = "SELECT * FROM conteudos ORDER BY RAND() LIMIT 6", nativeQuery = true)
    List<Conteudo> getRandomConteudo();

}
