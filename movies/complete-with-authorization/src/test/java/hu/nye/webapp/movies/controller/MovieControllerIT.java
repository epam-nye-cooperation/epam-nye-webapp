package hu.nye.webapp.movies.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.nye.webapp.movies.dto.MovieDTO;
import hu.nye.webapp.movies.entity.Movie;
import hu.nye.webapp.movies.repository.MovieRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the movies REST endpoints.
 */
@SpringBootTest
@AutoConfigureMockMvc
public class MovieControllerIT {

    private static final String TITLE = "title";
    private static final String POSTER_PATH = "posterPath";
    private static final String OVERVIEW = "overview";
    private static final Integer RUNTIME = 100;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetMovieByIdShouldReturnTheStoredMovieSuccessfully() throws Exception {
        // given
        insertDefaultMovieToDatabase();

        // when - then
        mockMvc.perform(get("/movies/1"))
            .andDo(print())
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value(TITLE))
            .andExpect(jsonPath("$.posterPath").value(POSTER_PATH))
            .andExpect(jsonPath("$.overview").value(OVERVIEW))
            .andExpect(jsonPath("$.runtime").value(RUNTIME));
    }

    @Test
    public void testCreateNewMovieShouldReturnBadRequestWhenRequestIsInvalid() throws Exception {
        // given
        MovieDTO invalidMovie = new MovieDTO();

        // when - then
        mockMvc.perform(
                post("/movies")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(invalidMovie))
            ).andDo(print())
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.messages").exists())
            .andExpect(jsonPath("$.messages").isArray())
            .andExpect(jsonPath("$.messages").isNotEmpty());
    }

    private void insertDefaultMovieToDatabase() {
        Movie movie = new Movie();
        movie.setTitle(TITLE);
        movie.setPosterPath(POSTER_PATH);
        movie.setOverview(OVERVIEW);
        movie.setRuntime(RUNTIME);

        movieRepository.save(movie);
    }

}
