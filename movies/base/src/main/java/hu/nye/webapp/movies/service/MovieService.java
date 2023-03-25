package hu.nye.webapp.movies.service;

import java.util.List;
import java.util.Optional;

import hu.nye.webapp.movies.dto.MovieDTO;

public interface MovieService {

    List<MovieDTO> findAll();

    Optional<MovieDTO> findById(Long id);

    MovieDTO save(MovieDTO movieDTO);

    MovieDTO update(MovieDTO movieDTO);

    void delete(Long id);

}
