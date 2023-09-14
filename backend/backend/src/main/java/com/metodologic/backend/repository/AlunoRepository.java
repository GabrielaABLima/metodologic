package com.metodologic.backend.repository;

import com.metodologic.backend.domain.Aluno;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    @Query("SELECT a FROM Aluno a WHERE LOWER(a.nome) LIKE LOWER(CONCAT('%', :busca, '%')) OR LOWER(a.email) LIKE LOWER(CONCAT('%', :busca, '%'))")
    List<Aluno> findByNameOrEmailAlunos(@Param("busca") String busca);
}
