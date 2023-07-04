package br.com.metodologic.backend.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

/**
 *
 * @author bruno
 */

@Entity
@Table(name="PATROCINADORES")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)

public class Patrocinador {
    
    @Id
    @Column( name="PTS_ID" )
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @EqualsAndHashCode.Include
    private Long id;
    
    @NotNull( message = "Nome é obrigatório" )
    @NotEmpty( message = "Nome não pode ser vazio" )
    @Column( name="PTS_NOME" )
    @Length( max = 60 )
    private String nome;
    
    @NotNull( message = "Email é obrigatório" )
    @NotEmpty( message = "Email não pode ser vazio" )
    @Column( name="PTS_EMAIL" )
    @Length( max = 255 )
    private String email;
    
    @NotNull( message = "Data de cadastro é obrigatória" )
    @Column( name="PTS_DATA_CADASTRO" )
    private LocalDate data;
    
    @NotNull( message = "Pessoa Física é obrigatória" )
    @Column( name="PTS_PESSOA_FISICA" )
    private boolean pessoa_fisica; 
    
    @NotNull( message = "CPF/CNPJ é obrigatório" )
    @Column( name="PTS_CPF_CNPJ" )
    @Length( max = 18 )
    private String cpf_cnpj;
    
    @NotNull( message = "A URL do site é obrigatório" )
    @Column( name="PTS_SITE_URL" )
    @Length( max = 255 )
    private String url_site;
    
    @NotNull( message = "O telefone é obrigatório" )
    @Column( name="PTS_TELEFONE" )
    @Length( max = 18 )
    private String telefone;
    
}
