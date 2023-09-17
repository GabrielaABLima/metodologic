/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.controller;

import com.metodologic.backend.controller.dto.AuthenticationDTO;
import com.metodologic.backend.controller.dto.LoginResponseDTO;
import com.metodologic.backend.controller.dto.RegisterDTO;
import com.metodologic.backend.domain.Usuario;
import com.metodologic.backend.infra.security.TokenService;
import com.metodologic.backend.repository.UsuarioRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("auth")
@Log4j2
@AllArgsConstructor
public class AuthenticationController {
    
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    UsuarioRepository userRepository;
    
    @Autowired
    TokenService tokenService;
    
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email, data.senha);
        var auth = authenticationManager.authenticate(usernamePassword);
        
        var token = tokenService.generateToken((Usuario) auth.getPrincipal());
        String role = ((Usuario) auth.getPrincipal()).getRole().getRole();
        return new ResponseEntity<>(new LoginResponseDTO(token, role), HttpStatus.OK);
    }
    
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if(this.userRepository.findByEmail(data.email) != null) return ResponseEntity.badRequest().build();
        
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha);
        Usuario user = new Usuario();
        user.setEmail(data.email);
        user.setSenha(encryptedPassword);
        user.setRole(data.role);
        user.setCurso(data.curso);
        user.setDataNascimento(data.dataNascimento);
        user.setInstituicaoEnsino(data.instituicaoEnsino);
        user.setNome(data.nome);
        user.setNivel(0);
        user.setPontos(0);
        
        this.userRepository.save(user);
        
        return ResponseEntity.ok().build();
    }
}
