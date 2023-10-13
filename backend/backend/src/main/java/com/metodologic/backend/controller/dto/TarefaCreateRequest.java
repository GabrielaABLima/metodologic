/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.controller.dto;

import java.util.Date;
import lombok.Data;

@Data
public class TarefaCreateRequest {
    public String nome;
    public String codigo;
    public Date dataEntrega;
    public Date dataAtribuicao;
}
