package com.metodologic.backend.enums;

public enum EQuestaoCategoria {
    TECNICA("TECNICA"),
    INSTRUMENTOS("INSTRUMENTO"),
    APLICACAO("APLICACAO"),
    DEFINICAO("DEFINICAO"),
    PALAVRA_CHAVE("PALAVRA_CHAVE"),
    LACUNA("LACUNA");
    
    private final String categoria;

    EQuestaoCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getCategoria() {
        return categoria;
    }
    
}
