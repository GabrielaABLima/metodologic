/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.repository;

import com.metodologic.backend.domain.TarefasQuestoes;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TarefasQuestoesRepository extends JpaRepository<TarefasQuestoes, Long> {
    List<TarefasQuestoes> findByTarefaId(Long tarefaId);
    List<TarefasQuestoes> findByQuestaoId(Long questaoId);
    Optional<TarefasQuestoes> findByTarefaIdAndQuestaoId(long tarefaId, long questaoId);
}
