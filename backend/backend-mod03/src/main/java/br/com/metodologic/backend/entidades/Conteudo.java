
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

@Entity
@Table(name="CONTEUDO")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Conteudo {
    
    @Id
    @Column( name="CNT_ID" )
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @EqualsAndHashCode.Include
    private Long id;
        
    @NotNull( message = "Título é obrigatório" )
    @NotEmpty( message = "Título não pode ser vazio" )
    @Column( name="CNT_TITULO" )
    @Length( max = 60 )
    private String titulo;
     
    @Column( name="CNT_PALAVRAS_CHAVES" )
    private String[] palavrasChaves;
    

    @Column( name="CNT_DEFINICAO" )
    @Length( max = 1000 )
    private String definicao;
        

    @Column( name="CNT_ETAPA_PESQUISA" )
    @Length( max = 100 )
    private String etapaPesquisa;
    
}
