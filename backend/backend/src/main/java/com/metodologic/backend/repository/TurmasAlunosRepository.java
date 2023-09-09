/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.metodologic.backend.repository;

import com.metodologic.backend.domain.TurmasAlunos;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TurmasAlunosRepository extends JpaRepository<TurmasAlunos, Long> {
    List<TurmasAlunos> findByAlunoId(Long alunoId);
    List<TurmasAlunos> findByTurmaId(Long turmaId);
    
    @Query("SELECT ta FROM TurmasAlunos ta WHERE ta.aluno.id = :alunoId AND ta.turma.id = :turmaId")
    Optional<TurmasAlunos> findOneTurmasAlunos(@Param("alunoId") long alunoId, @Param("turmaId") long turmaId);

}
