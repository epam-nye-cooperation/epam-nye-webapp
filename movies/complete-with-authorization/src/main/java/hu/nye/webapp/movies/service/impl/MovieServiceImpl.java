package hu.nye.webapp.movies.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import hu.nye.webapp.movies.dto.MovieDTO;
import hu.nye.webapp.movies.entity.Movie;
import hu.nye.webapp.movies.exception.MovieNotFoundException;
import hu.nye.webapp.movies.repository.MovieRepository;
import hu.nye.webapp.movies.service.MovieService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

/**
 * Default implementation of {@link MovieService}.
 */
@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final ModelMapper modelMapper;

    public MovieServiceImpl(MovieRepository movieRepository, ModelMapper modelMapper) {
        this.movieRepository = movieRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<MovieDTO> findAll() {
        return movieRepository.findAll()
            .stream()
            .map(movie -> modelMapper.map(movie, MovieDTO.class))
            .collect(Collectors.toList());
    }

    @Override
    public Optional<MovieDTO> findById(Long id) {
        return movieRepository.findById(id)
            .map(m -> modelMapper.map(m, MovieDTO.class));
    }

    @Override
    public MovieDTO create(MovieDTO movieDTO) {
        movieDTO.setId(null);

        Movie movieToSave = modelMapper.map(movieDTO, Movie.class);
        Movie savedMovie = movieRepository.save(movieToSave);

        return modelMapper.map(savedMovie, MovieDTO.class);
    }

    @Override
    public MovieDTO update(MovieDTO movieDTO) {
        Long id = movieDTO.getId();
        Optional<Movie> movieToUpdate = movieRepository.findById(id);

        if (movieToUpdate.isEmpty()) {
            throw new MovieNotFoundException("Movie not found with id=" + id);
        }

        Movie movieToPersist = modelMapper.map(movieDTO, Movie.class);
        Movie savedMovie = movieRepository.save(movieToPersist);

        return modelMapper.map(savedMovie, MovieDTO.class);
    }

    @Override
    public void delete(Long id) {
        Optional<Movie> movieToDelete = movieRepository.findById(id);

        if (movieToDelete.isPresent()) {
            movieRepository.delete(movieToDelete.get());
        } else {
            throw new MovieNotFoundException("Movie not found with id=" + id);
        }
    }

}
