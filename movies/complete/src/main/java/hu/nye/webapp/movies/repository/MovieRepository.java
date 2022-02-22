package hu.nye.webapp.movies.repository;

import hu.nye.webapp.movies.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Movie related database operations.
 */
public interface MovieRepository extends JpaRepository<Movie, Long> {
}
