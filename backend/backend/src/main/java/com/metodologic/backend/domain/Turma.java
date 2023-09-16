
package com.metodologic.backend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TURMAS")
public class Turma {
        
    @NotNull( message = "Nome é obrigatório" )
    @NotEmpty( message = "Nome não pode ser vazio" )
    @Column( name="TRM_NOME" )
    @Length( max = 60 )
    private String nome;
    
    @Id
    @NotNull( message = "Código é obrigatório" )
    @NotEmpty( message = "Código não pode ser vazio" )
    @Column( name="TRM_COD" )
    @Length( max = 60 )
    private String codigo;
    
    @Column( name="TRM_CURSO" )
    @Length( max = 100 )
    private String curso;
    
    @Column( name="TRM_INSTITUICAO_ENSINO" )
    @Length( max = 200 )
    private String instituicaoEnsino;
    
    @Column( name="TRM_DESCRICAO" )
    @Length( max = 200 )
    private String descricao;
    
    @JoinColumn( name="FK_PROFESSORES_USR_ID" )
    @ManyToOne
    private Usuario professor;
    
}
