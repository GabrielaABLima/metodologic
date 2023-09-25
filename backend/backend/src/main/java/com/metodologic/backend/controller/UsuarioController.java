/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.metodologic.backend.controller;

import com.metodologic.backend.controller.dto.UpdateUserPointsRequest;
import com.metodologic.backend.controller.dto.UpdateUserRequest;
import com.metodologic.backend.domain.Turma;
import com.metodologic.backend.domain.Usuario;
import com.metodologic.backend.repository.UsuarioRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("usuarios")
@Log4j2
@AllArgsConstructor
public class UsuarioController {
    @Autowired
    UsuarioRepository userRepository;
    
    @GetMapping("/all/{id}")
    public ResponseEntity<Usuario> getById(@PathVariable long id){
        Optional<Usuario> usuarioOptional = userRepository.findById(id);
        
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUser(@PathVariable long id, @RequestBody UpdateUserRequest request){
        Optional<Usuario> usuarioOptional = userRepository.findById(id);
        if(usuarioOptional.isPresent()){
            Usuario usuario = usuarioOptional.get();
            usuario.setCurso(request.curso);
            usuario.setDataNascimento(request.dataNascimento);
            usuario.setEmail(request.email);
            usuario.setInstituicaoEnsino(request.instituicaoEnsino);
            usuario.setNome(request.nome);
            userRepository.save(usuario);
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PutMapping("/pontos/{id}")
    public ResponseEntity<Usuario> updateUserPoints(@PathVariable long id, @RequestBody UpdateUserPointsRequest request){
        Optional<Usuario> usuarioOptional = userRepository.findById(id);
        if(usuarioOptional.isPresent()){
            Usuario usuario = usuarioOptional.get();
            usuario.setPontos(request.pontos);
            userRepository.save(usuario);
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
