/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.repository;

import com.metodologic.backend.domain.Tarefa;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TarefaRepository extends JpaRepository<Tarefa, Long>{
    List<Tarefa> findByTurmaCodigoIn(List<String> turmaCodigos);
    List<Tarefa> findByTurmaCodigo(String turmaCodigo);
}
