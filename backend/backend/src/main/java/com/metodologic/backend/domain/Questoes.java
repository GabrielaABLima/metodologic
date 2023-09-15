/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.domain;

import com.metodologic.backend.enums.EQuestaoTema;
import com.metodologic.backend.enums.ETipoQuestao;
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
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "QUESTOES")
public class Questoes {
    @Id
    @Column( name="QST_ID" )
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @EqualsAndHashCode.Include
    private Long id;
        
    @NotNull( message = "Nível é obrigatório" )
    @NotEmpty( message = "Nível não pode ser vazio" )
    @Column( name="QST_NIVEL" )
    private int nivel;
    
    @NotNull( message = "Pontos é obrigatório" )
    @NotEmpty( message = "Pontos não pode ser vazio" )
    @Column( name="QST_PONTOS" )
    private int pontos;
    
    @NotNull( message = "Tipo é obrigatório" )
    @NotEmpty( message = "Tipo não pode ser vazio" )
    @Column( name="QST_TIPO" )
    private ETipoQuestao tipo;
    
    @NotNull( message = "Tema é obrigatório" )
    @NotEmpty( message = "Tema não pode ser vazio" )
    @Column( name="QST_TEMA" )
    private EQuestaoTema tema;
}
