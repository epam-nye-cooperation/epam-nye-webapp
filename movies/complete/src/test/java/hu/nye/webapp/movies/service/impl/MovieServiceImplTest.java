package hu.nye.webapp.movies.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import hu.nye.webapp.movies.dto.MovieDTO;
import hu.nye.webapp.movies.entity.Movie;
import hu.nye.webapp.movies.exception.MovieNotFoundException;
import hu.nye.webapp.movies.repository.MovieRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

/**
 * Unit tests for {@link MovieServiceImpl}.
 */
@ExtendWith(MockitoExtension.class)
public class MovieServiceImplTest {

    private static final Long MOVIE_ID = 1L;

    private static final Movie MOVIE = new Movie();
    private static final MovieDTO MOVIE_DTO = new MovieDTO();

    @Mock
    private MovieRepository movieRepository;
    @Mock
    private ModelMapper modelMapper;

    private MovieServiceImpl underTest;

    @BeforeEach
    public void setUp() {
        underTest = new MovieServiceImpl(movieRepository, modelMapper);
    }

    @Test
    public void testFindAllShouldReturnAllMovies() {
        // given
        given(movieRepository.findAll()).willReturn(Collections.singletonList(MOVIE));
        given(modelMapper.map(MOVIE, MovieDTO.class)).willReturn(MOVIE_DTO);

        // when
        List<MovieDTO> result = underTest.findAll();

        // then
        List<MovieDTO> expected = Collections.singletonList(MOVIE_DTO);

        assertEquals(expected, result);
    }

    @Test
    public void testFindByIdShouldReturnMovieInOptionalWhenItExists() {
        // given
        given(movieRepository.findById(MOVIE_ID)).willReturn(Optional.of(MOVIE));
        given(modelMapper.map(MOVIE, MovieDTO.class)).willReturn(MOVIE_DTO);

        // when
        Optional<MovieDTO> result = underTest.findById(MOVIE_ID);

        // then
        Optional<MovieDTO> expected = Optional.of(MOVIE_DTO);

        assertEquals(expected, result);
    }

    @Test
    public void testFindByIdShouldReturnEmptyOptionalWhenMovieNotFound() {
        // given
        given(movieRepository.findById(MOVIE_ID)).willReturn(Optional.empty());

        // when
        Optional<MovieDTO> result = underTest.findById(MOVIE_ID);

        // then
        Optional<MovieDTO> expected = Optional.empty();

        assertEquals(expected, result);
    }

    @Test
    public void testUpdateShouldUpdateAndReturnMovieWhenItExists() {
        // given
        MovieDTO movieDTOToUpdate = MovieDTO.builder()
            .withId(MOVIE_ID)
            .build();
        Movie storedMovie = new Movie();
        Optional<Movie> storedMovieOptional = Optional.of(storedMovie);
        Movie movieToUpdate = new Movie();
        Movie updatedMovie = new Movie();
        MovieDTO updatedMovieDTO = new MovieDTO();

        given(movieRepository.findById(MOVIE_ID)).willReturn(storedMovieOptional);
        given(modelMapper.map(movieDTOToUpdate, Movie.class)).willReturn(movieToUpdate);
        given(movieRepository.save(movieToUpdate)).willReturn(updatedMovie);
        given(modelMapper.map(updatedMovie, MovieDTO.class)).willReturn(updatedMovieDTO);

        // when
        MovieDTO result = underTest.update(movieDTOToUpdate);

        // then
        assertEquals(updatedMovieDTO, result);
    }

    @Test
    public void testUpdateShouldThrowExceptionWhenMovieNotFound() {
        // given
        MovieDTO movieDTOToUpdate = MovieDTO.builder()
            .withId(MOVIE_ID)
            .build();

        given(movieRepository.findById(MOVIE_ID)).willReturn(Optional.empty());

        // when - then
        assertThrows(MovieNotFoundException.class, () -> {
            underTest.update(movieDTOToUpdate);
        });
    }

    @Test
    public void testDeleteShouldDeleteRequestedMovie() {
        // given
        Movie movieToDelete = new Movie();
        movieToDelete.setId(MOVIE_ID);
        Optional<Movie> movieToDeleteOptional = Optional.of(movieToDelete);

        given(movieRepository.findById(MOVIE_ID)).willReturn(movieToDeleteOptional);

        // when
        underTest.delete(MOVIE_ID);

        // then
        verify(movieRepository).delete(movieToDelete);
    }

    @Test
    public void testDeleteShouldThrowExceptionWhenMovieNotFound() {
        // given
        given(movieRepository.findById(MOVIE_ID)).willReturn(Optional.empty());

        // when - then
        assertThrows(MovieNotFoundException.class, () -> {
            underTest.delete(MOVIE_ID);
        });
    }

}
