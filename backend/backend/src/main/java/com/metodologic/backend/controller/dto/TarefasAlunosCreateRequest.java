/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.controller.dto;

import lombok.Data;

@Data
public class TarefasAlunosCreateRequest {
    public Long tarefaId;
    public Long alunoId;
    public int nota;
}
