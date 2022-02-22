package hu.nye.webapp.movies.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import hu.nye.webapp.movies.dto.MovieDTO;
import hu.nye.webapp.movies.exception.InvalidMovieRequestException;
import hu.nye.webapp.movies.service.MovieService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

/**
 * Unit tests for {@link MovieController}.
 */
@ExtendWith(MockitoExtension.class)
public class MovieControllerTest {

    private static final Long MOVIE_ID = 1L;
    private static final MovieDTO MOVIE_DTO = new MovieDTO();
    private static final MovieDTO REQUEST = new MovieDTO();
    private static final MovieDTO CREATED_MOVIE = new MovieDTO();
    private static final MovieDTO UPDATED_MOVIE = new MovieDTO();

    private static final String OBJECT_NAME = "objectName";
    private static final String FIELD = "field";
    private static final String DEFAULT_MESSAGE = "defaultMessage";
    private static final FieldError FIELD_ERROR = new FieldError(OBJECT_NAME, FIELD, DEFAULT_MESSAGE);
    private static final List<FieldError> FIELD_ERROR_LIST = List.of(FIELD_ERROR);

    private static final String ERROR_MESSAGE = FIELD + " - " + DEFAULT_MESSAGE;

    @Mock
    private MovieService movieService;

    @Mock
    private BindingResult bindingResult;

    private MovieController underTest;

    @BeforeEach
    public void setUp() {
        underTest = new MovieController(movieService);
    }

    @Test
    public void testFindAllShouldReturnListOfMovies() {
        // given
        List<MovieDTO> movieDTOList = Collections.singletonList(MOVIE_DTO);

        given(movieService.findAll()).willReturn(movieDTOList);

        // when
        ResponseEntity<List<MovieDTO>> result = underTest.findAll();

        // then
        ResponseEntity<List<MovieDTO>> expected = ResponseEntity.ok().body(movieDTOList);

        assertEquals(expected, result);
    }

    @Test
    public void testFindByIdShouldReturnMovieWhenItExists() {
        // given
        Optional<MovieDTO> movieDTOOptional = Optional.of(MOVIE_DTO);

        given(movieService.findById(MOVIE_ID)).willReturn(movieDTOOptional);

        // when
        ResponseEntity<MovieDTO> result = underTest.findById(MOVIE_ID);

        // then
        ResponseEntity<MovieDTO> expected = ResponseEntity.ok(MOVIE_DTO);

        assertEquals(expected, result);
    }

    @Test
    public void testFindByIdShouldReturnNotFoundWhenMovieDoesNotExist() {
        // given
        given(movieService.findById(MOVIE_ID)).willReturn(Optional.empty());

        // when
        ResponseEntity<MovieDTO> result = underTest.findById(MOVIE_ID);

        // then
        ResponseEntity<MovieDTO> expected = ResponseEntity.notFound().build();

        assertEquals(expected, result);
    }

    @Test
    public void testCreateShouldCreateAndReturnNewMovieWhenRequestIsValid() {
        // given
        given(movieService.create(REQUEST)).willReturn(CREATED_MOVIE);

        // when
        ResponseEntity<MovieDTO> result = underTest.create(REQUEST, bindingResult);

        // then
        ResponseEntity<MovieDTO> expected = ResponseEntity.status(HttpStatus.CREATED)
            .body(CREATED_MOVIE);

        assertEquals(expected, result);
    }

    @Test
    public void testCreateShouldThrowExceptionWhenRequestIsInvalid() {
        // given
        given(bindingResult.hasErrors()).willReturn(true);
        given(bindingResult.getFieldErrors()).willReturn(FIELD_ERROR_LIST);

        // when
        InvalidMovieRequestException thrownException = null;

        try {
            underTest.create(REQUEST, bindingResult);
        } catch (InvalidMovieRequestException e) {
            thrownException = e;
        }

        // then
        assertNotNull(thrownException);
        assertEquals(Collections.singletonList(ERROR_MESSAGE), thrownException.getErrors());
    }

    @Test
    public void testUpdateShouldUpdateAndReturnUpdatedMovieWhenRequestIsValid() {
        // given
        given(movieService.update(REQUEST)).willReturn(UPDATED_MOVIE);

        // when
        ResponseEntity<MovieDTO> result = underTest.update(REQUEST, bindingResult);

        // then
        ResponseEntity<MovieDTO> expected = ResponseEntity.ok(UPDATED_MOVIE);

        assertEquals(expected, result);
    }

    @Test
    public void testUpdateShouldThrowExceptionWhenRequestIsInvalid() {
        given(bindingResult.hasErrors()).willReturn(true);
        given(bindingResult.getFieldErrors()).willReturn(FIELD_ERROR_LIST);

        // when
        InvalidMovieRequestException thrownException = null;

        try {
            underTest.update(REQUEST, bindingResult);
        } catch (InvalidMovieRequestException e) {
            thrownException = e;
        }

        // then
        assertNotNull(thrownException);
        assertEquals(Collections.singletonList(ERROR_MESSAGE), thrownException.getErrors());
    }

    @Test
    public void testDeleteShouldDeleteTheRequestedMovie() {
        // given in setup

        // when
        ResponseEntity<Void> result = underTest.delete(MOVIE_ID);

        // then
        ResponseEntity<Void> expected = ResponseEntity.noContent().build();

        verify(movieService).delete(MOVIE_ID);
        assertEquals(expected, result);
    }

}
