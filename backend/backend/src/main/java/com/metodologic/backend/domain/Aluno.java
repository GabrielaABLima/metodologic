package com.metodologic.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.Date;
import org.hibernate.validator.constraints.Length;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ALUNOS")
public class Aluno {
        
    @Id
    @Column( name="ALN_ID" )
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @EqualsAndHashCode.Include
    private Long id;
        
    @NotNull( message = "Nome é obrigatório" )
    @NotEmpty( message = "Nome não pode ser vazio" )
    @Column( name="USR_NOME" )
    @Length( max = 60 )
    private String nome;
    
    @NotNull( message = "E-mail é obrigatório" )
    @NotEmpty( message = "E-mail não pode ser vazio" )
    @Column( name="USR_EMAIL" )
    @Length( max = 100 )
    private String email;
    
    @NotNull( message = "Senha é obrigatório" )
    @NotEmpty( message = "Senha não pode ser vazio" )
    @Column( name="USR_SENHA" )
    @Length( max = 30 )
    private String senha;
    
    @Column( name="USR_DATA_NASCIMENTO" )
    private Date dataNascimento;
    
    @Column( name="USR_CURSO" )
    @Length( max = 100 )
    private String curso;
    
    @Column( name="USR_INSTITUICAO_ENSINO" )
    @Length( max = 200 )
    private String instituicaoEnsino;
     
    @Column( name="USR_PONTOS" )
    private int pontos;
    
    @Column( name="USR_NIVEL" )
    private int nivel;
}
