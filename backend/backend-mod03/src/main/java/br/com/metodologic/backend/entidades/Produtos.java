package br.com.metodologic.backend.entidades;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

/**
 *
 * @author viniv
 */

@Entity
@Table(name="PRODUTOS")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)

public class Produtos {
    
    @Id
    @Column( name="PRO_ID" )
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @EqualsAndHashCode.Include
    private Long id;
    
    @NotNull( message = "Nome é obrigatório" )
    @NotEmpty( message = "Nome não pode ser vazio" )
    @Column( name="PRO_NOME" )
    @Length( max = 60 )
    private String nome;
    
    @NotNull( message = "Descrição é obrigatório" )
    @NotEmpty( message = "Descrição não pode ser vazio" )
    @Column( name="PRO_DESCRICAO" )
    @Length( max = 255 )
    private String descricao;
    
    @NotNull( message = "Quantidade é obrigatória" )
    @Digits( integer = 4, fraction = 2 )
    @Column( name="PRO_QUANTIDADE" )
    private BigDecimal quantidade;
    
    @NotNull( message = "Status é obrigatório" )
    @NotEmpty( message = "Status não pode ser vazio" )
    @Column( name="PRO_STATUS" )
    @Length( max = 30 )
    private String status;
    
    @NotNull( message = "Exclusividade é obrigatória" )
    @Column( name="PRO_EXCLUSIVIDADE" )
    private boolean exclusividade; 
    
    @NotNull( message = "Excluido é obrigatória" )
    @Column( name="PRO_EXCLUIDO" )
    private boolean excluido;
    
    @NotNull( message = "Fornecedor é obrigatório" )
    @JoinColumn( name="FK_FORNECEDORES_FOR_ID" )
    @ManyToOne
    private Fornecedor fornecedor;
}
