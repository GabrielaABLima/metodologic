/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TAREFAS")
public class Tarefa {
    @Id
    @Column( name="TRF_ID" )
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @EqualsAndHashCode.Include
    private Long id;
        
    @NotNull( message = "Nome é obrigatório" )
    @NotEmpty( message = "Nome não pode ser vazio" )
    @Column( name="TRF_NOME" )
    @Length( max = 60 )
    private String nome;
    
    @Column( name="TRF_DATA_ENTREGA" )
    @NotNull( message = "Data de entrega é obrigatório" )
    @NotEmpty( message = "Data de entrega não pode ser vazio" )
    private Date dataEntrega;
    
    @Column( name="TRF_DATA_ATRIBUICAO" )
    private Date dataAtribuicao;
    
    @ManyToOne
    @JoinColumn(name = "FK_TURMAS_TRM_COD")
    @NotNull( message = "Turma é obrigatório" )
    @NotEmpty( message = "Turma não pode ser vazio" )
    private Turma turma;
    
    
}
