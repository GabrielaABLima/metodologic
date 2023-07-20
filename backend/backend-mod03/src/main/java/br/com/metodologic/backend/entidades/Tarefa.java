/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.metodologic.backend.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name="TAREFAS")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Tarefa {
    
    @Id
    @Column( name="TRF_ID" )
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @EqualsAndHashCode.Include
    private Long id;
    
    @Column( name="TRF_DATA_POSTAGEM" )
    @Length( max = 100 )
    private Date dataPostagem;
    
    @NotNull( message = "Data de entrega é obrigatório" )
    @NotEmpty( message = "Data de entrega não pode ser vazio" )
    @Column( name="TRF_DATA_ENTREGA" )
    private Date dataEntrega;
    
    @Column( name="FK_TURMAs_TRM_ID" )
    private Turma turma;
    
    @Column( name="FK_PROFESSORES_PRF_ID" )
    private Professor professor;
        
}
