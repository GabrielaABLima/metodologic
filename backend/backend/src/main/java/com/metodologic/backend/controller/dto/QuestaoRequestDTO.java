/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.controller.dto;

import com.metodologic.backend.enums.EQuestaoCategoria;
import com.metodologic.backend.enums.ETipoQuestao;

public class QuestaoRequestDTO{
    public int nivel; 
    public int pontos;
    public EQuestaoCategoria categoria; 
    public ETipoQuestao tipo;
    public Long conteudoId;
    
}
