/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.enums;

public enum ETipoQuestao {
    ASSOCIACAO("ASSOCIACAO"),
    LACUNAS("LACUNAS"),
    ABERTA("ABERTA"),
    OPTATIVA("OPTATIVA");

    private String tipo;
    
    ETipoQuestao(String tipo) {
        this.tipo = tipo;
    }
    
    public String getTipo(){
        return this.tipo;
    }
}
