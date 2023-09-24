package com.metodologic.backend.enums;

public enum EQuestaoCategoria {
    TECNICA("TECNICA"),
    INSTRUMENTOS("INSTRUMENTO"),
    EXEMPLOS("EXEMPLO"),
    DEFINICAO("DEFINICAO"),
    PALAVRA_CHAVES("PALAVRA_CHAVE");
    
    private final String categoria;

    EQuestaoCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getCategoria() {
        return categoria;
    }
    
}
