package hu.nye.webapp.movies.service;

import java.util.List;
import java.util.Optional;

import hu.nye.webapp.movies.dto.MovieDTO;
import hu.nye.webapp.movies.exception.MovieNotFoundException;

/**
 * Service to handle movies.
 */
public interface MovieService {

    /**
     * Finds all movies.
     *
     * @return a list of movies
     */
    List<MovieDTO> findAll();

    /**
     * Finds a movie by its ID.
     *
     * @param id the ID of the movie
     * @return a movie wrapped in {@link Optional} if it exists, empty {@link Optional} otherwise
     */
    Optional<MovieDTO> findById(Long id);

    /**
     * Creates a new movie.
     *
     * @param movieDTO the new movie to be created
     * @return the created and saved movie
     */
    MovieDTO create(MovieDTO movieDTO);

    /**
     * Updates an existing movie.
     *
     * @param movieDTO the new state of the movie to be updated
     * @return the updated movie
     * @throws MovieNotFoundException when to movie to be updated doest not exist
     */
    MovieDTO update(MovieDTO movieDTO);

    /**
     * Deletes a movie by its ID.
     *
     * @param id the ID of the movie to be deleted
     * @throws MovieNotFoundException when to movie to be deleted doest not exist
     */
    void delete(Long id);

}
