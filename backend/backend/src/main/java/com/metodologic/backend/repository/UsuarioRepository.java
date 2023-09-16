/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.metodologic.backend.repository;

import com.metodologic.backend.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.core.userdetails.UserDetails;

@RepositoryRestResource
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    UserDetails findByEmail(String email);
}
