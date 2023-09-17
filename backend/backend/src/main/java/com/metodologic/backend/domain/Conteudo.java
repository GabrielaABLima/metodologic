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
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CONTEUDOS")
public class Conteudo {
    @Id
    @Column( name="CNT_ID" )
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @EqualsAndHashCode.Include
    private Long id;
        
    @NotNull( message = "Método é obrigatório" )
    @NotEmpty( message = "Método não pode ser vazio" )
    @Column( name="CNT_METODO", unique = true )
    private String metodo;
    
    @NotNull( message = "Técnicas é obrigatório" )
    @NotEmpty( message = "Técnicas não pode ser vazio" )
    @Column( name="CNT_TECNICAS" )
    private String tecnicas;
    
    @NotNull( message = "Instrumentos é obrigatório" )
    @NotEmpty( message = "Instrumentos não pode ser vazio" )
    @Column( name="CNT_INSTRUMENTOS" )
    private String instrumentos;
    
    @NotNull( message = "Exemplos é obrigatório" )
    @NotEmpty( message = "Exemplos não pode ser vazio" )
    @Column( name="CNT_EXEMPLOS" )
    private String exemplos;
    
    @NotNull( message = "Definição é obrigatório" )
    @NotEmpty( message = "Definição não pode ser vazio" )
    @Column( name="CNT_DEFINICAO" )
    private String definicao;
    
    @NotNull( message = "Palavras-chaves é obrigatório" )
    @NotEmpty( message = "Palavras-chaves não pode ser vazio" )
    @Column( name="CNT_PALAVRAS_CHAVES" )
    private String palavrasChaves;
}
