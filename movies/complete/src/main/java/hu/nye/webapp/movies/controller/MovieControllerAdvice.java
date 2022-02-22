package hu.nye.webapp.movies.controller;

import hu.nye.webapp.movies.exception.InvalidMovieRequestException;
import hu.nye.webapp.movies.exception.MovieNotFoundException;
import hu.nye.webapp.movies.response.BadRequestError;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Controller advice for the movie related REST endpoints.
 */
@RestControllerAdvice(assignableTypes = MovieController.class)
public class MovieControllerAdvice {

    @ExceptionHandler(value = InvalidMovieRequestException.class)
    public ResponseEntity<BadRequestError> invalidRequestHandler(InvalidMovieRequestException invalidMovieRequestException) {
        BadRequestError badRequestError = new BadRequestError(invalidMovieRequestException.getErrors());

        return ResponseEntity.badRequest()
            .body(badRequestError);
    }

    @ExceptionHandler(value = MovieNotFoundException.class)
    public ResponseEntity<Void> movieNotFoundHandler(MovieNotFoundException invalidMovieRequestException) {
        return ResponseEntity.notFound().build();
    }

}
