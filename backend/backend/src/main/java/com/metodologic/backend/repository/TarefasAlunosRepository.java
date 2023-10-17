/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.repository;

import com.metodologic.backend.domain.TarefasAlunos;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TarefasAlunosRepository extends JpaRepository<TarefasAlunos, Long> {
    List<TarefasAlunos> findByTarefaId(Long tarefaId);
    List<TarefasAlunos> findByAlunoId(Long questaoId);
    Optional<TarefasAlunos> findByTarefaIdAndAlunoId(long tarefaId, long alunoId);
}
