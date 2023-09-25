/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.controller.dto;

import com.metodologic.backend.enums.EUserRole;
import java.util.Date;


public class UpdateUserRequest {
    public String email;
    public String nome;
    public Date dataNascimento;
    public String curso;
    public String instituicaoEnsino;
}
