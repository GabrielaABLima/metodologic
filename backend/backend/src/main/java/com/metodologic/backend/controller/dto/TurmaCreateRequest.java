/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.controller.dto;

import lombok.Data;

@Data
public class TurmaCreateRequest {
    public String nome;
    public String codigo;
    public String curso;
    public String instituicaoEnsino;
    public String descricao;
    public Long professorId;
    public Long[] alunosId;
}
