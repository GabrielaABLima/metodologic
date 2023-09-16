/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.enums;

public enum EUserRole {
    PROFESSOR("professor"),
    ALUNO("aluno");

    private String role;
    
    EUserRole(String role) {
        this.role = role;
    }
    
    public String getRole(){
        return this.role;
    }
    
    
}
