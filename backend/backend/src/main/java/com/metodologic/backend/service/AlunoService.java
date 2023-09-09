package com.metodologic.backend.service;

import com.metodologic.backend.domain.Aluno;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AlunoService {
    
    private static List<Aluno> animes;
    //static {
    //    animes = new ArrayList<>(List.of(new Aluno(1L, "tste"), new Aluno(2L, "anime2"), new Aluno(3L, "anime3")));
    //}
    public List<Aluno> listAll(){
        return animes;
    }
    
    public Aluno findById(long id){
        return animes.stream()
                .filter(anime -> anime.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Anime not found"));
    }
    
    public Aluno save(Aluno anime){
        anime.setId(ThreadLocalRandom.current().nextLong(3, 10000));
        animes.add(anime);
        return anime;
        
    }
    
    public void delete(long id){
        animes.remove(findById(id));
    }
    
    public void replace(Aluno anime){
        delete(anime.getId());
        animes.add(anime);
    }
}
