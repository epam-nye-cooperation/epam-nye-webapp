package hu.nye.webapp.movies.controller;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import hu.nye.webapp.movies.dto.MovieDTO;
import hu.nye.webapp.movies.exception.InvalidMovieRequestException;
import hu.nye.webapp.movies.service.MovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for movies.
 */
@RestController
@RequestMapping(path = "/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<MovieDTO>> findAll() {
        List<MovieDTO> movies = movieService.findAll();

        return ResponseEntity.ok().body(movies);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<MovieDTO> findById(@PathVariable Long id) {
        Optional<MovieDTO> movie = movieService.findById(id);

        return movie.map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<MovieDTO> create(@Valid @RequestBody MovieDTO movieDTO, BindingResult bindingResult) {
        checkForRequestErrors(bindingResult);

        MovieDTO savedMovie = movieService.create(movieDTO);

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(savedMovie);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<MovieDTO> update(@Valid @RequestBody MovieDTO movieDTO, BindingResult bindingResult) {
        checkForRequestErrors(bindingResult);

        MovieDTO updatedMovie = movieService.update(movieDTO);

        return ResponseEntity.ok()
            .body(updatedMovie);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        movieService.delete(id);

        return ResponseEntity.noContent().build();
    }

    private void checkForRequestErrors(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> messages = bindingResult.getFieldErrors()
                .stream()
                .map(this::fieldErrorToMessage)
                .collect(Collectors.toList());

            throw new InvalidMovieRequestException("Invalid movie request", messages);
        }
    }

    private String fieldErrorToMessage(FieldError fieldError) {
        return fieldError.getField() + " - " + fieldError.getDefaultMessage();
    }

}
