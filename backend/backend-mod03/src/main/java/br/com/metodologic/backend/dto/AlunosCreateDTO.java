/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.com.metodologic.backend.dto;
import java.sql.Date;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Gabi
 */
@Data
@NoArgsConstructor
public class AlunosCreateDTO {
    private String nome;
    private String email;
    private String senha;
    private Date dataNascimento;
    private String instituicaoEnsino;
    private String curso;
}
