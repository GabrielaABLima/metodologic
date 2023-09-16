package com.metodologic.backend.domain;

import com.metodologic.backend.enums.EUserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "USUARIOS",
    uniqueConstraints = @UniqueConstraint(columnNames = "USR_EMAIL"))
public class Usuario implements UserDetails{
    
    @Id
    @Column( name="USR_ID" )
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    @EqualsAndHashCode.Include
    private Long id;
    
    @NotNull( message = "E-mail é obrigatório" )
    @NotEmpty( message = "E-mail não pode ser vazio" )
    @Column( name="USR_EMAIL")
    private String email;
    
    @NotNull( message = "Senha é obrigatório" )
    @NotEmpty( message = "Senha não pode ser vazio" )
    @Column( name="USR_SENHA" )
    private String senha;
    
    @Column( name="USR_ROLE" )
    private EUserRole role;
    
    @NotNull( message = "Nome é obrigatório" )
    @NotEmpty( message = "Nome não pode ser vazio" )
    @Column( name="USR_NOME" )
    @Length( max = 60 )
    private String nome;
    
    @Column( name="USR_DATA_NASCIMENTO" )
    private Date dataNascimento;
    
    @Column( name="USR_CURSO" )
    @Length( max = 100 )
    private String curso;
    
    @Column( name="USR_INSTITUICAO_ENSINO" )
    @Length( max = 200 )
    private String instituicaoEnsino;
     
    @Column( name="USR_PONTOS" )
    private int pontos;
    
    @Column( name="USR_NIVEL" )
    private int nivel;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == EUserRole.PROFESSOR){
            return List.of(new SimpleGrantedAuthority("ROLE_PROFESSOR"));
        }else{
            return List.of(new SimpleGrantedAuthority("ROLE_ALUNO"));
        }
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; 
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true; 
    }
}
