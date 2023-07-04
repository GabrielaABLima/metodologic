
package br.com.metodologic.backend.entidades;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

/**
 *
 * @author mateus
 */
@Entity
@Table(name="FORNECEDORES")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Fornecedor {
    
        
    @Id
    @Column( name="FOR_ID" )
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @EqualsAndHashCode.Include
    private Long id;
        
    @NotNull( message = "Nome é obrigatório" )
    @NotEmpty( message = "Nome não pode ser vazio" )
    @Column( name="FOR_NOME" )
    @Length( max = 60 )
    private String nome;
     
    @Column( name="FOR_DESCRICAO" )
    @Length( max = 255 )
    private String descricao;
    
    @NotNull( message = "Contato é obrigatório" )
    @NotEmpty( message = "Contato não pode ser vazio" )
    @Column( name="FOR_CONTATO" )
    @Length( max = 100 )
    private String contato;
        
    @NotNull( message = "Endereço é obrigatório" )
    @NotEmpty( message = "Endereço não pode ser vazio" )
    @Column( name="FOR_ENDERECO" )
    @Length( max = 100 )
    private String endereco;
    
    @Basic
    @Column(name = "FOR_ATIVO", nullable = false, columnDefinition = "TINYINT DEFAULT 1")
    private Boolean ativo;
}
