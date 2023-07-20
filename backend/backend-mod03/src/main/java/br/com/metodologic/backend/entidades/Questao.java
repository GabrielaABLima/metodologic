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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name="QUESTOES")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Questao {
    
    @Id
    @Column( name="QST_ID" )
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @EqualsAndHashCode.Include
    private Long id;
    
    @NotNull( message = "Tipo é obrigatório" )
    @NotEmpty( message = "Tipo não pode ser vazio" )
    @Column( name="QST_TIPO" )
    @Length( max = 100 )
    private String tipo;
    
    @NotNull( message = "Tema é obrigatório" )
    @NotEmpty( message = "Tema não pode ser vazio" )
    @Column( name="QST_TEMA" )
    @Length( max = 100 )
    private String tema;
     
    @Column( name="QST_PONTOS" )
    private int pontos;
    
    @Column( name="QST_NIVEL" )
    private int nivel;
    

    @Column( name="FK_JORNADA_JRN_ID" )
    private Jornada jornada;
        
}
