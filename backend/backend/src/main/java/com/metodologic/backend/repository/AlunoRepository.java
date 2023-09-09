package com.metodologic.backend.repository;

import com.metodologic.backend.domain.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    
}
