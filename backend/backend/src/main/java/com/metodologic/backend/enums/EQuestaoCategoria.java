package com.metodologic.backend.enums;

public enum EQuestaoCategoria {
    TECNICA("TECNICA"),
    INSTRUMENTOS("INSTRUMENTOS"),
    EXEMPLOS("EXEMPLOS"),
    DEFINICAO("DEFINICAO"),
    PALAVRA_CHAVES("PALAVRA_CHAVES");
    
    private final String categoria;

    EQuestaoCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getCategoria() {
        return categoria;
    }
    
}
