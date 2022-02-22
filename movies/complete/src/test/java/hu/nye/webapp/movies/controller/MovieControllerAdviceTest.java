package hu.nye.webapp.movies.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import hu.nye.webapp.movies.exception.InvalidMovieRequestException;
import hu.nye.webapp.movies.exception.MovieNotFoundException;
import hu.nye.webapp.movies.response.BadRequestError;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

/**
 * Unit tests for {@link MovieControllerAdvice}.
 */
public class MovieControllerAdviceTest {

    private static final String EXCEPTION_MESSAGE = "exceptionMessage";

    private static final String ERROR_MESSAGE_1 = "errorMessage1";
    private static final String ERROR_MESSAGE_2 = "errorMessage2";
    private static final List<String> ERROR_MESSAGE_LIST = List.of(ERROR_MESSAGE_1, ERROR_MESSAGE_2);
    private static final InvalidMovieRequestException INVALID_MOVIE_REQUEST_EXCEPTION =
        new InvalidMovieRequestException(EXCEPTION_MESSAGE, ERROR_MESSAGE_LIST);

    private static final MovieNotFoundException MOVIE_NOT_FOUND_EXCEPTION =
        new MovieNotFoundException(EXCEPTION_MESSAGE);

    private MovieControllerAdvice underTest;

    @BeforeEach
    public void setUp() {
        underTest = new MovieControllerAdvice();
    }

    @Test
    public void testInvalidRequestHandlerShouldReturnBadRequestErrorWithErrorMessagesFromException() {
        // given in setup

        // when
        ResponseEntity<BadRequestError> result = underTest.invalidRequestHandler(INVALID_MOVIE_REQUEST_EXCEPTION);

        // then
        ResponseEntity<BadRequestError> expected = ResponseEntity.badRequest()
            .body(new BadRequestError(ERROR_MESSAGE_LIST));

        assertEquals(expected, result);
    }

    @Test
    public void testMovieNotFoundHandlerShouldReturnEmptyResponseWithNotFoundStatusCode() {
        // given in setup

        // when
        ResponseEntity<Void> result = underTest.movieNotFoundHandler(MOVIE_NOT_FOUND_EXCEPTION);

        // then
        ResponseEntity<Void> expected = ResponseEntity.notFound().build();

        assertEquals(expected, result);
    }

}
