/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.domain;

import com.metodologic.backend.enums.EQuestaoCategoria;
import com.metodologic.backend.enums.ETipoQuestao;
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
public class Questao {
    @Id
    @Column( name="QST_ID" )
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @EqualsAndHashCode.Include
    private Long id;
        
    @Column( name="QST_NIVEL" )
    private int nivel;
    
    @Column( name="QST_PONTOS" )
    private int pontos;
    
    @Column( name="QST_TIPO" )
    private ETipoQuestao tipo;

    @Column( name="QST_CATEGORIA" )
    private EQuestaoCategoria categoria;
    
    @JoinColumn( name="FK_CONTEUDO_CNT_ID" )
    @ManyToOne
    private Conteudo conteudo;
}
